import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { FunctionComponent } from "react";
import { RecursiveAncestorStructure, RecursiveAncestorProps } from "./RecursiveAncestorStructure";

interface AncestorBreadcrumbsProps extends RecursiveAncestorProps {
    ariaLabel: string;
}

export const AncestorBreadcrumbs: FunctionComponent<AncestorBreadcrumbsProps> = ({ lineage, stopAtTerm, ariaLabel }) => {
    const mutableLineage = JSON.parse(JSON.stringify(lineage));
    return (<Breadcrumbs aria-label={ariaLabel}
        separator={<NavigateNextIcon fontSize="small" />}>
        <RecursiveAncestorStructure lineage={mutableLineage} stopAtTerm={stopAtTerm} />
    </Breadcrumbs>);
}