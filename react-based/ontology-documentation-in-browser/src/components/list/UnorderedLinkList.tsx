import { List, ListItem, Link as MUILink, } from "@mui/material";
import { FunctionComponent } from "react";
import ontologyConfig from "../../../ontology.config";
import { baseLength } from "../classPropertiesRelationships/shared";

export interface UnorderedLinkListProps {
    iris: string[]
}

export const UnorderedLinkList: FunctionComponent<UnorderedLinkListProps> = ({ iris }) => {
    const userLinks = iris.map((iri) => {
        if (iri.startsWith(ontologyConfig.baseIRI)) {
            return iri.slice(baseLength);
        }
        return iri
    })
    return (<List
        sx={{
            listStyleType: 'disc',
            pl: 2,
            '& .MuiListItem-root': {
                display: 'list-item',
            },
        }}>
        {userLinks.map((userLink, idx) => <ListItem key={`ul-li-${idx}`}>
            <MUILink key={`lw-${idx}`} href={userLink}>{userLink}</MUILink>
        </ListItem>)}

    </List>);
}