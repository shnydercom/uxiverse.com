import { getDirectAncestorEdges, getChildrenEdges } from "./graph-queries";
import { RtLdGraph, RtLdIdentifiableNode } from "./graphInterfaces"
import { isRtLdIdentifiableNode } from "./typeguards";

export interface StringifiedLineage {
    iris: string[];
    descendants: StringifiedLineage[];
}

export interface CategorizedEdges {
    [s: string]: string[]
}

const createLineageTemplate = (): StringifiedLineage => {
    const hierarchyTemplate: StringifiedLineage = { iris: [], descendants: [] };
    return JSON.parse(JSON.stringify(hierarchyTemplate))
}

export const getAncestors = (identifiableNodes: RtLdIdentifiableNode[], ancestorIri: string, inputHierarchy: StringifiedLineage, ignoreType: boolean): StringifiedLineage => {
    const ancestorEdges = getDirectAncestorEdges(identifiableNodes, ancestorIri, ignoreType)
    if (!ancestorEdges || ancestorEdges.length === 0) {
        //recursion end condition
        return inputHierarchy;
    }
    const higherHierarchy = createLineageTemplate();
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
    higherHierarchy.descendants.push(inputHierarchy);
    return getAncestors(
        newAncestors
        , ancestorIri
        , higherHierarchy, ignoreType);
}

export const getChildren = (identifiableNode: RtLdIdentifiableNode,
    ancestorIri: string): StringifiedLineage[] => {
    return getChildrenEdges(identifiableNode, ancestorIri).map((val) => {
        return { ...createLineageTemplate(), iris: [val.in["@id"]] }
    })
}

export const findIRIinLineage = (strLineage: StringifiedLineage, iri: string): StringifiedLineage | null => {
    if (strLineage.iris.includes(iri)) {
        return strLineage;
    }
    if (!strLineage.descendants?.length) {
        return null;
    }
    for (let index = 0; index < strLineage.descendants.length; index++) {
        const element = strLineage.descendants[index];
        const recursionResult = findIRIinLineage(element, iri);
        if (recursionResult) {
            return recursionResult;
        }
    }
    return null;
}

export const findParentIRIinLineage = (strLineage: StringifiedLineage, iri: string): StringifiedLineage | null => {
    if (!strLineage.descendants?.length) {
        return null;
    }
    for (let index = 0; index < strLineage.descendants.length; index++) {
        const element = strLineage.descendants[index];
        if (element.iris.includes(iri)) {
            return strLineage;
        }
        const recursionResult = findParentIRIinLineage(element, iri);
        if (recursionResult) {
            return recursionResult;
        }
    }
    return null;
}

export const getSiblings = (
    identifiableNode: RtLdIdentifiableNode,
    ancestorIri: string,
    ignoreType: boolean
): StringifiedLineage[] => {
    const result: StringifiedLineage[] = [];
    const ancestorEdges = getDirectAncestorEdges([identifiableNode], ancestorIri, ignoreType);
    ancestorEdges.forEach((ancEdge) => {
        if (!isRtLdIdentifiableNode(ancEdge.out)) {
            return;
        }
        const fieldIRIs: StringifiedLineage[] = ancEdge.out.fields
            .filter((edgeVal) => {
                if (!isRtLdIdentifiableNode(edgeVal.out) || !isRtLdIdentifiableNode(edgeVal.in)) {
                    return false;
                }
                if ((edgeVal.out["@id"] !== ancEdge.out["@id"]) || (edgeVal.type.iri !== ancestorIri)) {
                    return false;
                }
                if ((edgeVal.in["@id"] === ancEdge.in["@id"])) {
                    return false; //removes "itself" from the list of siblings
                }
                return true;
            }).map((edgeVal) => {
                return { iris: [edgeVal.in["@id"]], descendants: [] }
            })
        result.push(...fieldIRIs)
    })
    return result;
}

/**
 * gets all ancestors, siblings and direct children as an object of IRIs
 */
export const getAncestorsSiblingsAndChildren = (graph: RtLdGraph, startIRI: string, ancestorIri: string, ignoreType: boolean): StringifiedLineage | null => {
    let result: StringifiedLineage = createLineageTemplate();
    const matchedNode = graph.identifiableNodes.find(
        (node, idx) => { return node["@id"] === startIRI }
    )
    if (!matchedNode) return null;
    result.iris = [startIRI]
    if (matchedNode["@t"] && !ignoreType) {
        result.iris.push(matchedNode["@t"].iri)
    }
    result = getAncestors([matchedNode], ancestorIri, result, ignoreType);
    const matchingStrHierarchy = findIRIinLineage(result, matchedNode["@id"]);
    if (!matchingStrHierarchy) {
        throw new Error("built hierarchy didn't contain match for startIRI");
    }
    matchingStrHierarchy.descendants.push(...getChildren(matchedNode, ancestorIri));
    const matchingParent = findParentIRIinLineage(result, matchedNode["@id"])
    if (matchingParent) {
        matchingParent.descendants.push(...getSiblings(matchedNode, ancestorIri, ignoreType));
    }
    return result;
}

/**
 * gets edges of all ancestors that are not the ancestors themselves as an object of string-arrays
 */
export const getEdgesOfAncestorsOnly = (graph: RtLdGraph, startIRI): CategorizedEdges => {
    const result: CategorizedEdges = {}
    return result;
}