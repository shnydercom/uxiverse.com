import { RtLdGraph } from "./graphInterfaces"

export interface StringifiedHierarchy {
    [s: string]: StringifiedHierarchy
}

export interface CategorizedEdges {
    [s: string]: string[]
}

/**
 * gets all ancestors, siblings and direct children as an object of IRIs
 */
export const getAncestorsSiblingsAndDirectChildren = (graph: RtLdGraph, startIRI: string): StringifiedHierarchy => {
    const result: StringifiedHierarchy = {}
    return result;
}

/**
 * gets edges of all ancestors that are not the ancestors themselves as an object of string-arrays
 */
export const getEdgesOfAncestorsOnly = (graph: RtLdGraph, startIRI): CategorizedEdges => {
    const result: CategorizedEdges = {}
    return result;
}