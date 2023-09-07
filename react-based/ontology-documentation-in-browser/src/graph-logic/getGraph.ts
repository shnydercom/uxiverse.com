import { RtLdGraph, createGraph } from "@uxiverse.com/jsonld-tools";
import * as ontologyConfig from "../../ontology.config.js";

export async function getOntologyGraph() {
    const fullOntology = await fetch(ontologyConfig.jsonldIRI).then((res) => res.json());
    return createGraph(fullOntology);
}

export const isRtLdGraph = (input: unknown): input is RtLdGraph => {
    if (!input || typeof input !== "object") {
        return false;
    }
    const fieldNames = ["identifiableNodes", "edges", "collections"];
    return fieldNames.every((field) => { return Object.keys(input).includes(field) })
}