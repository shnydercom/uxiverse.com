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
    values: RtLdValue[]
}

export interface RtLdIdentifiableNode {
    "@id": String;
    "@t"?: RtLdType
    fields: RtLdEdge[]
}

export interface RtLdEdge {
    type: RtLdType
    in: RtLdIdentifiableNode;
    out: RtLdIdentifiableNode | RtLdValue
}

export type RtLdSingleValueType = String | boolean | Object

export interface RtLdValue {
    "@v": RtLdSingleValueType
    "@l"?: "en" | string;
    edge?: RtLdEdge
}