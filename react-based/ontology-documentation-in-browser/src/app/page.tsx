import { i18nEN } from "@/i18n";
import { Paper, Typography } from "@mui/material";
import ontologyConfig, {
  ontologyDescription,
  ontologyName,
} from "../../ontology.config";
import { findIdentifiableNode, getLineage } from "@uxiverse.com/jsonld-tools";
import { getOntologyGraph } from "@/graph-logic";
import { notFound } from "next/navigation";
import MultiTreeviewTiles from "@/components/ancestorDisplay/MultiTreeviewTiles";
import Script from "next/script";
import structuredData from "@uxiverse.com/ontology/ontology/uxiverse.com.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${ontologyName} ontology`,
  description: ontologyDescription,
};

const getMainTreeViewLineages = async () => {
  const graph = await getOntologyGraph();
  return ontologyConfig.introTerms.map((term) => {
    const searchIri = `${ontologyConfig.baseIRI}${term}`;
    const nodeForTerm = findIdentifiableNode(graph, searchIri);
    if (!nodeForTerm) {
      notFound();
    }
    const lineage = getLineage(graph, nodeForTerm["@id"], false, {
      moveTreeHighlightToEnd: false,
      sortTreeViewSiblings: false,
    });
    if (!lineage) {
      notFound();
    }
    return { lineage, term };
  });
};

export default async function OntologyMainPage() {
  const lineages = await getMainTreeViewLineages();
  return (
    <>
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <div>
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "16px",
            }}
          >
            <Typography variant="h4">{i18nEN.ONTOLOGY_MAIN_HEADING}</Typography>
            <Typography>{i18nEN.ONTOLOGY_MAIN_INTRO}</Typography>
            <Typography variant="h4">
              {i18nEN.ONTOLOGY_MAIN_A_SELECTION_OF_TERMS}
            </Typography>
            <MultiTreeviewTiles lineages={lineages} />
          </Paper>
        </div>
      </main>
    </>
  );
}
