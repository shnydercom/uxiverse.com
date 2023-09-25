import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { CategorizedEdgesProp } from "../interfaces";
import { UnorderedLinkList } from "../list";

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
    return (<>
        <Typography variant="subtitle2">{contentdescription}</Typography>
        <UnorderedLinkList iris={iris} />
    </>);
}