import { i18nEN } from "@/i18n";
import { Box, Typography } from "@mui/material";
import { createGraph, findIdentifiableNode } from "@uxiverse.com/jsonld-tools";
import * as ontologyConfig from "../../../ontology.config.js";
import { notFound } from "next/navigation.js";

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

const getNodeForTerm = async (term: string) => {
    const graph = await getOntologyGraph();
    const searchIri = `${ontologyConfig.baseIRI}${term}`
    const nodeForTerm = findIdentifiableNode(graph, searchIri);
    if (!nodeForTerm) {
        notFound()
    }
    return nodeForTerm
}

export default async function Page({ params }: { params: { definedTerm: string } }) {
    const nodeForTerm = await getNodeForTerm(params.definedTerm);
    return <Box>
        <Typography variant="h4" >
            {params.definedTerm}
            {(nodeForTerm?.["@t"]?.iri) ?? "" + "unknown"}
        </Typography>
        <Typography variant="caption" fontStyle={"italic"} >
            {i18nEN.ONTOLOGY_TYPE_SUBTITLE}
        </Typography>
    </Box>
}