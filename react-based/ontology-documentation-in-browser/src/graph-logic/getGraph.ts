import { RtLdGraph, createGraph } from "@uxiverse.com/jsonld-tools";
import * as ontologyConfig from "../../ontology.config.js";
import * as JSONLD from "jsonld";

export async function getOntologyGraph() {
    const fullOntology = await fetch(ontologyConfig.jsonldIRI).then((res) => res.json());
    if (ontologyConfig.jsonldIRI.includes("flattened")) {
        //early return when resource is explicitly pre-formatted
        return createGraph(fullOntology);
    }
    const flattenedGraph = await JSONLD.flatten(fullOntology);
    return createGraph(flattenedGraph);
}

export const isRtLdGraph = (input: unknown): input is RtLdGraph => {
    if (!input || typeof input !== "object") {
        return false;
    }
    const fieldNames = ["identifiableNodes", "edges", "collections"];
    return fieldNames.every((field) => { return Object.keys(input).includes(field) })
}