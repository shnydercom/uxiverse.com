"use client"
import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import { AncestorSiblingChildrenTreeview } from "./AncestorSiblingChildrenTreeview";
import { StringifiedLineage } from "@uxiverse.com/jsonld-tools";
import ontologyConfig from "../../../ontology.config";

interface MultiTreeviewTilesProps {
    lineages: { lineage: StringifiedLineage, term: string }[]
}

const mainPageLinkFormatterFn = (input: string) => {
    if (!input.startsWith(ontologyConfig.baseIRI)) {
        return input
    }
    let replacerPath = ontologyConfig.baseNextJsPath;
    if (replacerPath.startsWith("/")) {
        replacerPath = replacerPath.slice(1) + "/";
    }
    return input.replace(ontologyConfig.baseIRI, replacerPath)
}

const MultiTreeviewTiles: FunctionComponent<MultiTreeviewTilesProps> = ({ lineages }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "8px" }}>
            {
                lineages.map(({ lineage, term }) =>
                    <AncestorSiblingChildrenTreeview
                        key={term}
                        lineage={lineage} stopAtTerm={term}
                        linkFormatterFn={mainPageLinkFormatterFn}
                        isSelectedActiveLink />)
            }
        </Box>
    );
}

export default MultiTreeviewTiles;