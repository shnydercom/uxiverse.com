import { List, ListItem, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { CategorizedEdgesProp } from "../interfaces";
import { UnorderedLinkList } from "../list";

export interface UsedOnTypesListProps {
    contentdescription: string;
    categorizedEdges: CategorizedEdgesProp;
}

export const UsedOnTypesList: FunctionComponent<UsedOnTypesListProps> = ({ contentdescription, categorizedEdges }) => {
    if (!categorizedEdges.otherCatEdges) {
        return null;
    }
    const { categories, straightLineage } = categorizedEdges.otherCatEdges
    const iris: string[] = straightLineage
        .flatMap((lineageIri) => categories[lineageIri] ?? []);
    return (<>
        <Typography variant="subtitle2">{contentdescription}</Typography>
        <UnorderedLinkList iris={iris} />
    </>);
}