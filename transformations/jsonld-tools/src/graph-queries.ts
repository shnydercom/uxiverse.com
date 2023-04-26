import { RtLdEdge, RtLdGraph, RtLdIdentifiableNode } from "./graphInterfaces"
import { isRtLdIdentifiableNode } from "./typeguards"

// these functions should only consume and produce types on graphInterfaces

export const getDirectAncestorEdges = (identifiableNodes: RtLdIdentifiableNode[], ancestorIri: string, ignoreType: boolean): RtLdEdge[] => {
    return identifiableNodes.map((iNode) => iNode.fields)
        .reduce((arr1, arr2) => [...arr1, ...arr2])
        .filter((val) => {
            if (!isRtLdIdentifiableNode(val.in)) {
                return false
            }
            return (val.type.iri === ancestorIri)
                && (identifiableNodes.some((iNode => {
                    const edgeMatch = iNode["@id"] === val.in["@id"];
                    if (ignoreType && edgeMatch) {
                        const typeMatch = iNode["@t"]?.iri === val.out["@id"];
                        if (typeMatch) {
                            return false;
                        }
                    }
                    return edgeMatch;
                })
                ))
        })
}

export const getChildrenEdges = (identifiableNode: RtLdIdentifiableNode, ancestorIri: string): RtLdEdge[] => {
    return identifiableNode.fields.filter((val) => {
        if (!isRtLdIdentifiableNode(val.out) || !isRtLdIdentifiableNode(val.in)) {
            return false;
        }
        return (val.type.iri === ancestorIri && val.out["@id"] === identifiableNode["@id"])
    })
}

export const findIdentifiableNode = (graph: RtLdGraph, searchIri: string): RtLdIdentifiableNode | undefined => {
    return graph.identifiableNodes.find(
        (node) => { return node["@id"] === searchIri }
    )
}

export const compareEdgeTypeIriAnd = (typeIri: string) => {
    return (val: RtLdEdge) => {
        return val.type.iri === typeIri;
    }
}

export const compareEdgeNodeIriAnd = (edgeID: string, includeIncomingEdges: boolean = false) => {
    return (val: RtLdEdge) => {
        if (includeIncomingEdges) {
            if (!isRtLdIdentifiableNode(val.in)) {
                return false;
            }
            return val.in["@id"] === edgeID;
        }
        if (!isRtLdIdentifiableNode(val.out)) {
            return false;
        }
        return val.out["@id"] === edgeID;
    }
}