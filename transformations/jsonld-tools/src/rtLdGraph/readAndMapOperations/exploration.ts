
import { CategorizedEdges, EdgeOfAncestorsInputArgs, QueryFieldsTwoDeepOptions, StringifiedLineage, findParentIRIinLineage, getAncestorsSiblingsAndChildren, getEdgesOfStartIriAndAncestors, queryFieldsTwoDeep } from "../createOperations";
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
    return getEdgesOfStartIriAndAncestors(options)
}

/**
 * summarizes which types this property can exist on
 * @param graph 
 * @param startIRI should be a rdf-property-IRI
 * @returns 
 */
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
    return getEdgesOfStartIriAndAncestors(options)
}

/**
 * summarizes which type(s) this property can take
 * @param graph 
 * @param startIRI should be a rdf-property-IRI
 * @returns a dictionary of ancestors with arrays of their prop/field names
 */
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
    return getEdgesOfStartIriAndAncestors(options)
}
/**
 * summarizes the properties on which Instances of start-IRI may appear as a value of, and the types that have said property
 * @param graph 
 * @param startIRI 
 * @returns 
 */
export const getCategorizedEdgesForInstanceMayAppearAsValueForProp = (graph: RtLdGraph, startIRI: string): CategorizedEdges | null => {
    // the properties [...] can be a "startIRI"-Class, and these props exist on [types]
    const options: QueryFieldsTwoDeepOptions = {
        graph,
        startIRI,
        query: [
            { isIn: true, edgeTypeIRI: RANGE_INCLUDES },
            { isIn: false, edgeTypeIRI: DOMAIN_INCLUDES }
        ]
    }
    return queryFieldsTwoDeep(options)
}


export function isIRIaProperty(graph: RtLdGraph, iri: string): boolean {
    const foundIdentifiableNode = graph.identifiableNodes
        .find(node => {
            return (node['@id'] ?? '') === `${iri}`
        })
    return foundIdentifiableNode?.["@t"]?.iri === RDF_PROPERTY
}