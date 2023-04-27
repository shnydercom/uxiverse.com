import { CategorizedEdges, EdgeOfAncestorsInputArgs, RtLdGraph, StringifiedLineage, findParentIRIinLineage, getAncestorsSiblingsAndChildren, getEdgesOfAncestorsOnly } from "@uxiverse.com/jsonld-tools";
import { RDFS_SUBPROP_OF, RDFS_SUBCLASS_OF, DOMAIN_INCLUDES, RANGE_INCLUDES } from "./ontology-globals";
import { moveElementToEnd } from "./IRIUtils";
import { featureFlags } from "../featureFlags";
import { sortTreeViewSiblings } from "../sort";

export interface ExplorationResult {
    lineageHighlightIRI: string;
    lineage: StringifiedLineage;
    catEdges: CategorizedEdges | null;
    /**
     * if two sections of categorized edges should be separated, this property can be filled
     */
    otherCatEdges: CategorizedEdges | null;
}

export const getLineage = (graph: RtLdGraph, startIri: string, propLineage: boolean,): StringifiedLineage | null => {
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

export const getCategorizedEdgesForClasses = (graph: RtLdGraph, startIRI: string) => {
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


export const getCategorizedEdgesForPropertyCanExistOnType = (graph: RtLdGraph, startIRI: string) => {
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


export const getCategorizedEdgesForPropertyCanBeOfType = (graph: RtLdGraph, startIRI: string) => {
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