import { List, ListItem, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { CategorizedEdgesProp } from "../interfaces";
import { UnorderedLinkList } from "../list";
import { i18nEN } from "@/i18n";

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
    const isEmpty = iris.length === 0;
    return (<>
        <Typography variant="subtitle2">{contentdescription}</Typography>
        {isEmpty && <Typography variant="caption">{i18nEN.COMPONENT_PROPERTY_EMPTY}</Typography>}
        {!isEmpty && <UnorderedLinkList iris={iris} />}
    </>);
}