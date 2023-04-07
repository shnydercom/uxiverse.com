export interface RtLdGraph {
    identifiableNodes: RtLdIdentifiableNode[];
    edges: RtLdEdge[]
    collections: RtLdCollections
}

export interface RtLdCollections {
    values: RtLdValue[];
    types: RtLdType[];
}

export interface RtLdType {
    iri: String;
    nodes: RtLdIdentifiableNode[]
}

export interface RtLdIdentifiableNode {
    "@id": String;
    "@t"?: RtLdType
}

export interface RtLdEdge {
    type: RtLdType
    in: RtLdIdentifiableNode;
    out: RtLdIdentifiableNode
}

export type RtLdSingleValueType = String | boolean | Object

export interface RtLdValue {
    "@v": RtLdSingleValueType
    "@l"?: "en" | string;
}