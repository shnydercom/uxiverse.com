import { Link as MUILink } from "@mui/material";
import Box from "@mui/material/Box";
import { StringifiedLineage } from "@uxiverse.com/jsonld-tools";
import { FunctionComponent } from "react";
import * as ontologyConfig from "../../../ontology.config.js";


interface SingleAncestorProps {
    lineage: StringifiedLineage
}

export const SingleAncestor: FunctionComponent<SingleAncestorProps> = ({ lineage }) => {
    const baseLength = ontologyConfig.baseIRI.length;
    return (<Box sx={{
        display: "flex",
        flexDirection: "column"
    }}>
        {
            lineage.iris.map((iri) => {
                let userLink: string = iri;
                if (iri.startsWith(ontologyConfig.baseIRI)) {
                    userLink = iri.slice(baseLength);
                }
                return <MUILink href={userLink}>
                    {userLink}
                </MUILink>
            })

        }
    </Box>);
}