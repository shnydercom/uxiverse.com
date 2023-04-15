import { CategorizedEdges, RtLdGraph, StringifiedLineage, getAncestorsSiblingsAndChildren } from "@uxiverse.com/jsonld-tools";
import { RDFS_SUBPROP_OF, RDFS_SUBCLASS_OF } from "./ontology-globals";

export interface ExplorationResult {
    lineage: StringifiedLineage;
    edges: CategorizedEdges;
}

export const getLineage = (graph: RtLdGraph, startIri: string, propLineage: boolean,) => {
    const ancestorIri: string = propLineage ? RDFS_SUBPROP_OF : RDFS_SUBCLASS_OF;
    return getAncestorsSiblingsAndChildren(graph, startIri, ancestorIri, true);
}