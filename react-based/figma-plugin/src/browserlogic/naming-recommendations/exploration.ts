import { CategorizedEdges, RtLdGraph, StringifiedLineage, getAncestorsSiblingsAndChildren, getEdgesOfAncestorsOnly } from "@uxiverse.com/jsonld-tools";
import { RDFS_SUBPROP_OF, RDFS_SUBCLASS_OF, DOMAIN_INCLUDES, RANGE_INCLUDES } from "./ontology-globals";

export interface ExplorationResult {
    lineageHighlightIRI: string;
    lineage: StringifiedLineage;
    catEdges: CategorizedEdges;
}

export const getLineage = (graph: RtLdGraph, startIri: string, propLineage: boolean,) => {
    const ancestorIri: string = propLineage ? RDFS_SUBPROP_OF : RDFS_SUBCLASS_OF;
    return getAncestorsSiblingsAndChildren(graph, startIri, ancestorIri, true);
}

export const getCategorizedEdges = (graph: RtLdGraph, startIri: string, propLineage: boolean,) => {
    const ancestorIri: string = propLineage ? RDFS_SUBPROP_OF : RDFS_SUBCLASS_OF;
    const typeIri: string = propLineage ? RANGE_INCLUDES : DOMAIN_INCLUDES;
    return getEdgesOfAncestorsOnly(graph, startIri, typeIri, ancestorIri)
}