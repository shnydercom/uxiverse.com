import { CategorizedEdges, RtLdGraph, StringifiedLineage, findParentIRIinLineage, getAncestorsSiblingsAndChildren, getEdgesOfAncestorsOnly } from "@uxiverse.com/jsonld-tools";
import { RDFS_SUBPROP_OF, RDFS_SUBCLASS_OF, DOMAIN_INCLUDES, RANGE_INCLUDES } from "./ontology-globals";
import { moveElementToEnd } from "./IRIUtils";
import { featureFlags } from "../featureFlags";
import { sortTreeViewSiblings } from "../sort";

export interface ExplorationResult {
    lineageHighlightIRI: string;
    lineage: StringifiedLineage;
    catEdges: CategorizedEdges;
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

export const getCategorizedEdges = (graph: RtLdGraph, startIri: string, propLineage: boolean,) => {
    const ancestorIri: string = propLineage ? RDFS_SUBPROP_OF : RDFS_SUBCLASS_OF;
    const typeIri: string = propLineage ? RANGE_INCLUDES : DOMAIN_INCLUDES;
    return getEdgesOfAncestorsOnly(graph, startIri, typeIri, ancestorIri)
}