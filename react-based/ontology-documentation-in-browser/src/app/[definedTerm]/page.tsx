import { i18nEN } from "@/i18n";
import { Paper, Typography } from "@mui/material";
import { RDF_PROPERTY, RDF_CLASS, RtLdGraph, RtLdIdentifiableNode, createGraph, findIdentifiableNode, getLineage, getSingleUxiDefinition } from "@uxiverse.com/jsonld-tools";
import * as ontologyConfig from "../../../ontology.config.js";
import { notFound } from "next/navigation.js";
import { AncestorBreadcrumbs } from "@/components/ancestorDisplay";
import { match } from "ts-pattern"
import { DescriptionFullDisplay } from "@/components/descriptionDisplay";

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
    const termForThisPage = nodeForTerm["@id"];
    const descriptionText = getSingleUxiDefinition(
        termForThisPage,
        ontologyGraph
    )
    return <Paper sx={{ display: "flex", flexDirection: "column", gap: "10px", padding: "16px" }}>
        <Typography variant="h4" >
            {params.definedTerm}
        </Typography>
        <Typography variant="caption" fontStyle={"italic"} >
            {match(nodeForTerm?.["@t"]?.iri)
                .when(
                    typeIri => typeIri === RDF_CLASS,
                    () => {
                        return i18nEN.ONTOLOGY_CLASS_SUBTITLE
                    }
                )
                .when(
                    typeIri => typeIri === RDF_PROPERTY,
                    () => {
                        return i18nEN.ONTOLOGY_PROPERTY_SUBTITLE
                    }
                )
                .when(
                    typeIri => typeIri === undefined,
                    () => {
                        return i18nEN.ONTOLOGY_TYPE_UNDEFINED
                    }
                )
                .otherwise((value) => {
                    return `${i18nEN.ONTOLOGY_OTHER_TYPE}${value}`
                })
            }
        </Typography>
        <AncestorBreadcrumbs lineage={lineage} stopAtTerm={termForThisPage} ariaLabel={i18nEN.ARIA_LABEL_BREADCRUMB} />
        {descriptionText && <DescriptionFullDisplay descriptionText={descriptionText} termToDisplay={termForThisPage} />}
        <code style={{ whiteSpace: "break-spaces" }}>
            {JSON.stringify(lineage, undefined, 2)}
        </code>
    </Paper>
}