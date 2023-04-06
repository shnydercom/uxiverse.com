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
    inputGraphArray.map((nodeObj) => {
        match(nodeObj)
            .with({ "@id": P.string, "@type": P.union(P.string, [P.string]) }, (typesAndId) => {
                const newNode: RtLdIdentifiableNode = { "@id": typesAndId["@id"] }
                const types = Array.isArray(typesAndId["@type"]) ? typesAndId["@type"] : [typesAndId["@type"]];
                types.forEach((typeIRI) => {
                    let existingType = resultGraph.collections.types
                        .find((eType) => eType.iri === typeIRI);
                    if (!existingType) {
                        existingType = { iri: typeIRI }
                        resultGraph.collections.types.push(existingType)
                    }
                    newNode["@t"] = existingType;
                })
                resultGraph.identifiableNodes.push(newNode)
            })
            .with({ "@id": P.string }, (onlyId) => {
                resultGraph.identifiableNodes.push({ "@id": onlyId["@id"] })
            })
            .otherwise((otherValue) => {
                console.log('unhandled input:')
                console.dir(otherValue)
            });
    })
    return resultGraph
}