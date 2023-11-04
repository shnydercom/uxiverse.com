import { Link as MUILink, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { StringifiedLineage } from "@uxiverse.com/jsonld-tools";
import { FunctionComponent } from "react";
import * as ontologyConfig from "../../../ontology.config.js";


interface SingleAncestorProps {
    lineage: StringifiedLineage;
    stopAtTerm: string;
}

export const SingleAncestorStructure: FunctionComponent<SingleAncestorProps> = ({ lineage, stopAtTerm }) => {
    const baseLength = ontologyConfig.baseIRI.length;
    return (<Box sx={{
        display: "flex",
        flexDirection: "column"
    }}>
        {
            lineage.iris.map((iri, idx) => {
                let userLink: string = iri;
                if (iri.startsWith(ontologyConfig.baseIRI)) {
                    userLink = iri.slice(baseLength);
                }
                const rKey = `irilink-${idx}`;
                if (iri === stopAtTerm) {
                    return <Typography key={rKey}>
                        {userLink}
                    </Typography>
                }
                return <MUILink key={rKey} href={userLink}>
                    {userLink}
                </MUILink>
            })

        }
    </Box>);
}