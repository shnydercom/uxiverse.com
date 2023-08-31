import { i18nEN } from "@/i18n";
import { Box, Typography } from "@mui/material";
import { RDF_PROPERTY, RtLdGraph, RtLdIdentifiableNode, createGraph, findIdentifiableNode, getLineage } from "@uxiverse.com/jsonld-tools";
import * as ontologyConfig from "../../../ontology.config.js";
import { notFound } from "next/navigation.js";
import { RecursiveAncestor } from "@/components/ancestorDisplay";

export const dynamicParams = false;

async function getOntologyGraph() {
    const fullOntology = await fetch(ontologyConfig.jsonldIRI).then((res) => res.json());
    return createGraph(fullOntology);
}

/**this reroutes to not-found page for terms which are not matched statically */
export async function generateStaticParams() {
    const graph = await getOntologyGraph();
    /**
     * only terms that start with the baseIRI will be documented
     */
    const baseIriLength = ontologyConfig.baseIRI.length;
    return graph.identifiableNodes
        .filter((val) => val["@id"].startsWith(ontologyConfig.baseIRI))
        .map((identifiableNode) => ({
            definedTerm: identifiableNode["@id"].slice(baseIriLength)
        }))
}

const getNodeForTerm = (term: string, graph: RtLdGraph): RtLdIdentifiableNode => {
    const searchIri = `${ontologyConfig.baseIRI}${term}`
    const nodeForTerm = findIdentifiableNode(graph, searchIri);
    if (!nodeForTerm) {
        notFound()
    }
    return nodeForTerm
}

const getStringifiedLineage = (nodeForTerm: RtLdIdentifiableNode, graph: RtLdGraph) => {
    const isProp = nodeForTerm["@t"]?.iri === RDF_PROPERTY;
    const lineage = getLineage(graph, nodeForTerm["@id"], isProp, { moveTreeHighlightToEnd: false, sortTreeViewSiblings: false })
    if (!lineage) {
        notFound()
    }
    return lineage;
}

export default async function Page({ params }: { params: { definedTerm: string } }) {
    const ontologyGraph = await getOntologyGraph();
    const nodeForTerm = getNodeForTerm(params.definedTerm, ontologyGraph);
    const lineage = getStringifiedLineage(nodeForTerm, ontologyGraph);
    const stopAtTerm = nodeForTerm["@id"];
    return <Box>
        <Typography variant="h4" >
            {params.definedTerm}
            {(nodeForTerm?.["@t"]?.iri) ?? "" + "unknown"}
        </Typography>
        <Typography variant="caption" fontStyle={"italic"} >
            {i18nEN.ONTOLOGY_TYPE_SUBTITLE}
        </Typography>
        <RecursiveAncestor lineage={lineage} stopAtTerm={stopAtTerm} />
        <code style={{ whiteSpace: "break-spaces" }}>
            {JSON.stringify(lineage, undefined, 2)}
        </code>
    </Box>
}