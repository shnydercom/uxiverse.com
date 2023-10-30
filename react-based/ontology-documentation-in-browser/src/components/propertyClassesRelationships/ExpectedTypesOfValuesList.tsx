import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { CategorizedEdgesProp } from "../interfaces";
import { UnorderedLinkList } from "../list";
import { i18nEN } from "@/i18n";

export interface ExpectedTypesOfValuesListProps {
    contentdescription: string;
    categorizedEdges: CategorizedEdgesProp;
}

export const ExpectedTypesOfValuesList: FunctionComponent<ExpectedTypesOfValuesListProps> = ({ contentdescription, categorizedEdges }) => {
    if (!categorizedEdges.catEdges) {
        return null;
    }
    const { categories, straightLineage } = categorizedEdges.catEdges
    const iris: string[] = straightLineage
        .flatMap((lineageIri) => categories[lineageIri] ?? []);
    const isEmpty = iris.length === 0;
    return (<>
        <Typography variant="subtitle2">{contentdescription}</Typography>
        {isEmpty && <Typography variant="caption">{i18nEN.COMPONENT_PROPERTY_EMPTY}</Typography>}
        {!isEmpty && <UnorderedLinkList iris={iris} />}
    </>);
}