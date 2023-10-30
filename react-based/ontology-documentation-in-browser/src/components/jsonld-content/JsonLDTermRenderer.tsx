"use client"
import { FunctionComponent } from "react";
import { JsonLDRenderer } from "./JsonLDRenderer";
import { RtLdIdentifiableNode, findIdentifiableNode, isRtLdIdentifiableNode, isRtLdValue } from "@uxiverse.com/jsonld-tools";
import { wrapPromise } from "@/client-utils";
import { getOntologyGraph, isRtLdGraph } from "@/graph-logic";

interface JsonLDTermRendererProps {
    term: string;
}

const graphResource = wrapPromise(getOntologyGraph());

const identifiableNodeToJsonLDResourceAtIRI = (node: RtLdIdentifiableNode) => {
    const resourceID = node["@id"];
    const result: Record<string, any> = {
        "@id": resourceID,
        "@type": node["@t"]?.iri,
    };
    node.fields.filter((field) => field.in["@id"] === resourceID)
        .forEach((rtLDedge) => {
            const key = rtLDedge.type.iri;
            if (!Object.prototype.hasOwnProperty(key)) {
                result[key] = [];
            }
            const out = rtLDedge.out;
            if (isRtLdValue(out)) {
                result[key].push(out["@v"]);
            }
            if (isRtLdIdentifiableNode(out)) {
                result[key].push(out["@id"]);
            }
        })
    for (const key in result) {
        if (Object.prototype.hasOwnProperty.call(result, key)) {
            const element = result[key];
            if (Array.isArray(element) && element.length === 1) {
                result[key] = element[0];
            }
        }
    }
    return result;
}

export const JsonLDTermRenderer: FunctionComponent<JsonLDTermRendererProps> = ({ term }) => {
    const graph = graphResource.read();
    //TODO: handle with suspense
    if (!isRtLdGraph(graph)) return null;
    const nodeForTerm = findIdentifiableNode(graph, term);
    if (!nodeForTerm) return null;
    const renderedJsonLD = identifiableNodeToJsonLDResourceAtIRI(nodeForTerm);
    return (<JsonLDRenderer isDebug={false} content={JSON.stringify(renderedJsonLD, undefined, 2)} />);
}