import { JsonLdObj } from "jsonld/jsonld-spec"
import { match, P } from "ts-pattern"
import { RtLdEdge, RtLdGraph, RtLdIdentifiableNode, RtLdValue } from "./graphInterfaces"

export const createEmptyGraph = () => {
    const result: RtLdGraph = {
        edges: [],
        identifiableNodes: [],
        collections: {
            types: [],
            values: []
        }
    }
    return result
}

export const createGraph = (flattenedJsonLd: JsonLdObj, context?: Object) => {
    const resultGraph: RtLdGraph = createEmptyGraph()
    let inputGraphArray: JsonLdObj[] = []
    if (Array.isArray(flattenedJsonLd)) {
        inputGraphArray = flattenedJsonLd;
    }
    if (Array.isArray(flattenedJsonLd["@graph"])) {
        inputGraphArray = flattenedJsonLd["@graph"];
    }
    inputGraphArray.map((inputFullNode) => {
        let newNode: RtLdIdentifiableNode = { "@id": "", fields: [] };
        match(inputFullNode)
            .with({ "@id": P.string, "@type": P.union(P.string, P.array(P.string)) }, (typesAndId) => {
                const oldNode = resultGraph.identifiableNodes.find((existingNode) => existingNode["@id"] === typesAndId["@id"]);
                if (!oldNode) {
                    newNode = { "@id": typesAndId["@id"], fields: [] }
                    resultGraph.identifiableNodes.push(newNode)
                } else {
                    newNode = oldNode
                }
                const types = Array.isArray(typesAndId["@type"]) ? typesAndId["@type"] : [typesAndId["@type"]];
                types.forEach((typeIRI) => {
                    let existingType = resultGraph.collections.types
                        .find((eType) => eType.iri === typeIRI);
                    if (!existingType) {
                        existingType = { iri: typeIRI, nodes: [], values: [] }
                        resultGraph.collections.types.push(existingType)
                    }
                    newNode["@t"] = existingType;
                    existingType.nodes.push(newNode)
                })
            })
            .with({ "@id": P.string }, (onlyId) => {
                const oldNode = resultGraph.identifiableNodes.find((existingNode) => existingNode["@id"] === onlyId["@id"]);
                if (!oldNode) {
                    newNode = { "@id": onlyId["@id"], fields: [] }
                    resultGraph.identifiableNodes.push(newNode)
                    return
                }
                newNode = oldNode
            })
            .otherwise((otherValue) => {
                console.log('unhandled "@id/@type" input:')
                console.dir(otherValue)
            });
        if (!newNode["@id"]) {
            // unhandled case in the code above
            return;
        }
        const { "@id": ldId, "@type": ldType, ...remaining } = inputFullNode;
        const inputNodeOwnKeys = Reflect.ownKeys(remaining) as string[];
        inputNodeOwnKeys.forEach((nodeKey) => {
            // unhandled keywords:
            const isUnhandledKeyword: boolean = match(nodeKey).with(P.union("@container", "@language", "@none", "@set"), () => true).otherwise(() => false)
            if (isUnhandledKeyword) { return }
            const inputNodeEntry = remaining[nodeKey];
            match(inputNodeEntry)
                .with(P.array({ "@id": P.string }), (graphConnectionEntries) => {
                    graphConnectionEntries.forEach((gConnEntry) => {
                        let connNode = resultGraph.identifiableNodes
                            .find((existingNode) => existingNode["@id"] === gConnEntry["@id"])
                        if (!connNode) {
                            connNode = { "@id": gConnEntry["@id"], fields: [] }
                            resultGraph.identifiableNodes.push(connNode)
                        }
                        let existingType = resultGraph.collections.types
                            .find((eType) => eType.iri === nodeKey);
                        if (!existingType) {
                            existingType = { iri: nodeKey, nodes: [], values: [] }
                            resultGraph.collections.types.push(existingType)
                        }
                        const nodeOnExistingType = existingType.nodes.find((node) => node["@id"] === connNode?.["@id"])
                        if (!nodeOnExistingType) {
                            existingType.nodes.push(connNode)
                        }
                        const newEdge: RtLdEdge = {
                            in: newNode,
                            out: connNode,
                            type: existingType
                        }
                        resultGraph.edges.push(newEdge);
                        newNode.fields.push(newEdge);
                        connNode.fields.push(newEdge)
                    })
                })
                .with(P.array({ "@value": P.union(P.string, P.number, P.boolean) }), (valueEntries) => {
                    valueEntries.forEach((valueEntry) => {
                        const newValue: RtLdValue = {
                            "@v": valueEntry["@value"]
                        }
                        let existingType = resultGraph.collections.types
                            .find((eType) => eType.iri === nodeKey);
                        if (!existingType) {
                            existingType = { iri: nodeKey, nodes: [], values: [] }
                            resultGraph.collections.types.push(existingType)
                        }
                        existingType.values.push(newValue)
                        const newEdge: RtLdEdge = {
                            in: newNode,
                            out: newValue,
                            type: existingType
                        }
                        newValue.edge = newEdge;
                        newNode.fields.push(newEdge);
                        resultGraph.collections.values.push(newValue)
                    })
                })
                .with(P.array(P.string), (valueEntries) => {
                    valueEntries.forEach((valueEntry) => {
                        const newValue: RtLdValue = {
                            "@v": valueEntry
                        }
                        let existingType = resultGraph.collections.types
                            .find((eType) => eType.iri === nodeKey);
                        if (!existingType) {
                            existingType = { iri: nodeKey, nodes: [], values: [] }
                            resultGraph.collections.types.push(existingType)
                        }
                        existingType.values.push(newValue)
                        const newEdge: RtLdEdge = {
                            in: newNode,
                            out: newValue,
                            type: existingType
                        }
                        newValue.edge = newEdge;
                        newNode.fields.push(newEdge);
                        resultGraph.collections.values.push(newValue)
                    })

                })
                .otherwise((otherValue) => {
                    console.log('unhandled ld node key input:')
                    console.dir(otherValue)
                });
        })
    })
    return resultGraph
}