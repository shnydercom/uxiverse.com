import { getDirectAncestorEdges, getDirectChildrenEdges } from "./graph-queries";
import { RtLdEdge, RtLdGraph, RtLdIdentifiableNode } from "./graphInterfaces"
import { isRtLdIdentifiableNode } from "./typeguards";

export interface StringifiedHierarchy {
    iris: string[];
    subElements?: StringifiedHierarchy;
}

export interface CategorizedEdges {
    [s: string]: string[]
}

const createHierarchyTemplate = (): StringifiedHierarchy => {
    const hierarchyTemplate: StringifiedHierarchy = { iris: [] };
    return JSON.parse(JSON.stringify(hierarchyTemplate))
}

export const getAncestors = (identifiableNodes: RtLdIdentifiableNode[], ancestorIri: string, inputHierarchy: StringifiedHierarchy, ignoreType: boolean): StringifiedHierarchy => {
    const ancestorEdges = getDirectAncestorEdges(identifiableNodes, ancestorIri, ignoreType)
    if (!ancestorEdges || ancestorEdges.length === 0) {
        //recursion end condition
        return inputHierarchy;
    }
    const higherHierarchy = createHierarchyTemplate();
    const newAncestors = ancestorEdges
        .map((edge) => (edge.out))
        .filter(isRtLdIdentifiableNode)
    if (newAncestors.length > 1) {
        //de-duplicated string array
        higherHierarchy.iris.push(...Array.from(new Set(newAncestors.map((val) => val["@id"]))))
    }
    if (newAncestors.length === 1) {
        higherHierarchy.iris.push(newAncestors[0]["@id"])
    }
    higherHierarchy.subElements = inputHierarchy;
    return getAncestors(
        newAncestors
        , ancestorIri
        , higherHierarchy, ignoreType);
}

export const getDirectChildren = (identifiableNode: RtLdIdentifiableNode,
    ancestorIri: string): StringifiedHierarchy => {
    const result: StringifiedHierarchy = createHierarchyTemplate();
    result.iris = getDirectChildrenEdges(identifiableNode, ancestorIri).map((val) => {
        return val.in["@id"]
    })
    return result;
}

export const findIRIinHierarchy = (strHierarchy: StringifiedHierarchy, iri: string): StringifiedHierarchy | null => {
    if (strHierarchy.iris.includes(iri)) {
        return strHierarchy;
    }
    if (!strHierarchy.subElements) {
        return null;
    }
    return findIRIinHierarchy(strHierarchy.subElements, iri)
}

/**
 * gets all ancestors, siblings and direct children as an object of IRIs
 */
export const getAncestorsSiblingsAndDirectChildren = (graph: RtLdGraph, startIRI: string, ancestorIri: string, ignoreType: boolean): StringifiedHierarchy | null => {
    let result: StringifiedHierarchy = createHierarchyTemplate();
    const matchedNode = graph.identifiableNodes.find(
        (node, idx) => { return node["@id"] === startIRI }
    )
    if (!matchedNode) return null;
    result.iris = [startIRI]
    if (matchedNode["@t"] && !ignoreType) {
        result.iris.push(matchedNode["@t"].iri)
    }
    result = getAncestors([matchedNode], ancestorIri, result, ignoreType);
    const matchingStrHierarchy = findIRIinHierarchy(result, matchedNode["@id"]);
    if (!matchingStrHierarchy) {
        throw new Error("built hierarchy didn't contain match for startIRI");
    }
    matchingStrHierarchy.subElements = getDirectChildren(matchedNode, ancestorIri);
    return result;
}

/**
 * gets edges of all ancestors that are not the ancestors themselves as an object of string-arrays
 */
export const getEdgesOfAncestorsOnly = (graph: RtLdGraph, startIRI): CategorizedEdges => {
    const result: CategorizedEdges = {}
    return result;
}