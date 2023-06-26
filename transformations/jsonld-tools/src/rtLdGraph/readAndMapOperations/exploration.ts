
import { CategorizedEdges, EdgeOfAncestorsInputArgs, StringifiedLineage, findParentIRIinLineage, getAncestorsSiblingsAndChildren, getEdgesOfAncestorsOnly } from "../createOperations";
import { RtLdGraph } from "../../graphInterfaces";
import { moveElementToEnd } from "../../IRIUtils";
import { LDGraphProcessingFeatureFlags } from "../../featureFlags";
import { RDFS_SUBPROP_OF, RDFS_SUBCLASS_OF, DOMAIN_INCLUDES, RANGE_INCLUDES, RDF_PROPERTY } from "../../ontology-globals";
import { sortTreeViewSiblings } from "../../sort";

export interface ExplorationResult {
    lineageHighlightIRI: string;
    lineage: StringifiedLineage;
    catEdges: CategorizedEdges | null;
    /**
     * if two sections of categorized edges should be separated, this property can be filled
     */
    otherCatEdges: CategorizedEdges | null;
}

export const getLineage = (graph: RtLdGraph, startIri: string, propLineage: boolean, featureFlags: LDGraphProcessingFeatureFlags): StringifiedLineage | null => {
    const ancestorIri: string = propLineage ? RDFS_SUBPROP_OF : RDFS_SUBCLASS_OF;
    const result = getAncestorsSiblingsAndChildren(graph, startIri, ancestorIri, true);
    if (!result) {
        return null;
    }
    const parent = findParentIRIinLineage(result, startIri);
    const foundChildIndex = parent?.descendants.findIndex((val) => {
        return val.iris.includes(startIri);
    })
    if (featureFlags.sortTreeViewSiblings) {
        parent?.descendants.sort(sortTreeViewSiblings)
    }
    if (featureFlags.moveTreeHighlightToEnd) {
        if ((parent?.descendants?.length ?? 0 > 0) && (foundChildIndex !== undefined)) {
            moveElementToEnd(parent!.descendants
                , foundChildIndex)
        }
    }
    return result;
}

export const getCategorizedEdgesForClasses = (graph: RtLdGraph, startIRI: string): CategorizedEdges | null => {
    const ancestorIri = RDFS_SUBCLASS_OF;
    const includeEdgeTypeIRIs = [DOMAIN_INCLUDES];
    const includeIncomingEdges = false;
    const includeOutgoingEdges = true;
    const options: EdgeOfAncestorsInputArgs = {
        graph,
        startIRI,
        includeEdgeTypeIRIs,
        includeIncomingEdges,
        includeOutgoingEdges,
        ancestorEdgeIRI: ancestorIri
    }
    return getEdgesOfAncestorsOnly(options)
}


export const getCategorizedEdgesForPropertyCanExistOnType = (graph: RtLdGraph, startIRI: string): CategorizedEdges | null => {
    // property can exist on type [...]
    const ancestorIri = RDFS_SUBPROP_OF;
    const includeEdgeTypeIRIs = [DOMAIN_INCLUDES];
    const includeIncomingEdges = true;
    const includeOutgoingEdges = true;
    const options: EdgeOfAncestorsInputArgs = {
        graph,
        startIRI,
        includeEdgeTypeIRIs,
        includeIncomingEdges,
        includeOutgoingEdges,
        ancestorEdgeIRI: ancestorIri
    }
    return getEdgesOfAncestorsOnly(options)
}


export const getCategorizedEdgesForPropertyCanBeOfType = (graph: RtLdGraph, startIRI: string): CategorizedEdges | null => {
    // property can be a [...]
    const ancestorIri = RDFS_SUBPROP_OF;
    const includeEdgeTypeIRIs = [RANGE_INCLUDES];
    const includeIncomingEdges = true;
    const includeOutgoingEdges = true;
    const options = {
        graph,
        startIRI,
        includeEdgeTypeIRIs,
        includeIncomingEdges,
        includeOutgoingEdges,
        ancestorEdgeIRI: ancestorIri
    }
    return getEdgesOfAncestorsOnly(options)
}


export function isIRIaProperty(graph: RtLdGraph, iri: string): boolean {
    const foundIdentifiableNode = graph.identifiableNodes
        .find(node => {
            return (node['@id'] ?? '') === `${iri}`
        })
    return foundIdentifiableNode?.["@t"]?.iri === RDF_PROPERTY
}