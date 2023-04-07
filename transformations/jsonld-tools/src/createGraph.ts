import { JsonLdObj } from "jsonld/jsonld-spec"
import { match, P } from "ts-pattern"
import { RtLdGraph, RtLdIdentifiableNode } from "./graphInterfaces"

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
        match(inputFullNode)
            .with({ "@id": P.string, "@type": P.union(P.string, [P.string]) }, (typesAndId) => {
                const newNode: RtLdIdentifiableNode = { "@id": typesAndId["@id"] }
                const types = Array.isArray(typesAndId["@type"]) ? typesAndId["@type"] : [typesAndId["@type"]];
                types.forEach((typeIRI) => {
                    let existingType = resultGraph.collections.types
                        .find((eType) => eType.iri === typeIRI);
                    if (!existingType) {
                        existingType = { iri: typeIRI, nodes: [] }
                        resultGraph.collections.types.push(existingType)
                    }
                    newNode["@t"] = existingType;
                    existingType.nodes.push(newNode)
                })
                resultGraph.identifiableNodes.push(newNode)
            })
            .with({ "@id": P.string }, (onlyId) => {
                resultGraph.identifiableNodes.push({ "@id": onlyId["@id"] })
            })
            .otherwise((otherValue) => {
                console.log('unhandled "@id/@type" input:')
                console.dir(otherValue)
            });
        const { "@id": ldId, "@type": ldType, ...remaining } = inputFullNode;
        const inputNodeOwnKeys = Reflect.ownKeys(remaining) as string[];
        inputNodeOwnKeys.forEach((nodeKey) => {
            const inputNodeEntry = remaining[nodeKey];
            match(inputNodeEntry)
                .with([{ "@id": P.string }], (graphConnectionEntry) => {
                    console.log("g conn entry")
                })
                .with([{ "@value": P.string }], (valueEntry) => {
                    console.log("value entry")
                }).otherwise((otherValue) => {
                    console.log('unhandled ld node key input:')
                    console.dir(otherValue)
                });
        })
    })
    return resultGraph
}