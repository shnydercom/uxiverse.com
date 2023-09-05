import { Breadcrumbs } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { FunctionComponent } from "react";
import { RecursiveAncestor, RecursiveAncestorProps } from ".";

interface AncestorBreadcrumbsProps extends RecursiveAncestorProps {
    ariaLabel: string;
}

export const AncestorBreadcrumbs: FunctionComponent<AncestorBreadcrumbsProps> = ({ lineage, stopAtTerm, ariaLabel }) => {
    return (<Breadcrumbs aria-label={ariaLabel}
        separator={<NavigateNextIcon fontSize="small" />}>
        <RecursiveAncestor lineage={lineage} stopAtTerm={stopAtTerm} />
    </Breadcrumbs>);
}