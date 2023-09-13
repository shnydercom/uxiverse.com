import { BoxProps, Box } from "@mui/material";
import ontologyConfig from "../../../ontology.config";

export const baseLength = ontologyConfig.baseIRI.length;

export const VerticalLinkWrapper = (props: BoxProps) => {
    const sx = {
        display: "flex",
        flexDirection: "column"
    }
    return <Box {...props} sx={sx} />
}