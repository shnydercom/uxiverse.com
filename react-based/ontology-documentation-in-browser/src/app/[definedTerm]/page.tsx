import { i18nEN } from "@/i18n";
import { Box, Typography } from "@mui/material";

export default function Page({ params }: { params: { definedTerm: string } }) {
    return <Box>
        <Typography variant="h4" >
            {params.definedTerm}
        </Typography>
        <Typography variant="caption" fontStyle={"italic"} >
            {i18nEN.ONTOLOGY_TYPE_SUBTITLE}
        </Typography>
    </Box>
}