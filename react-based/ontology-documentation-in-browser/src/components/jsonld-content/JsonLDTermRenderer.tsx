"use client"
import { FunctionComponent } from "react";
import { JsonLDRenderer } from "./JsonLDRenderer";
import { RtLdIdentifiableNode, findIdentifiableNode } from "@uxiverse.com/jsonld-tools";
import { wrapPromise } from "@/client-utils";
import { getOntologyGraph, isRtLdGraph } from "@/graph-logic";

interface JsonLDTermRendererProps {
    term: string;
}

const graphResource = wrapPromise(getOntologyGraph());

const identifiableNodeToJsonLDResourceAtIRI = (node: RtLdIdentifiableNode) => {
    const result: Record<string, any> = {
        "@id": node["@id"],
        "@type": node["@t"]?.iri,
    };
    return result;
}

export const JsonLDTermRenderer: FunctionComponent<JsonLDTermRendererProps> = ({ term }) => {
    console.log("bla")
    const graph = graphResource.read();
    //TODO: handle with suspense
    if (!isRtLdGraph(graph)) return null;
    const nodeForTerm = findIdentifiableNode(graph, term);
    if (!nodeForTerm) return null;
    console.log(nodeForTerm)
    const renderedJsonLD = identifiableNodeToJsonLDResourceAtIRI(nodeForTerm);
    return (<JsonLDRenderer isDebug={true} content={JSON.stringify(renderedJsonLD, undefined, 2)} />);
}