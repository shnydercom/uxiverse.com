import { StringifiedLineage } from "@uxiverse.com/jsonld-tools";
import { Fragment, FunctionComponent } from "react";
import { SingleAncestor } from "./SingleAncestor";
import { ChevronRight } from "@mui/icons-material";

export interface RecursiveAncestorProps {
    lineage: StringifiedLineage;
    stopAtTerm: string;
}

export const RecursiveAncestor: FunctionComponent<RecursiveAncestorProps> = ({ lineage, stopAtTerm }) => {
    const stopTermIdx = lineage.descendants.flatMap((val) => val.iris).findIndex((val) => val === stopAtTerm);
    if (stopTermIdx !== -1) {
        const stopTermEncounter = lineage.descendants[stopTermIdx];
        stopTermEncounter.descendants = []
        lineage.descendants = [stopTermEncounter]
    }
    return (<>
        <SingleAncestor lineage={lineage} stopAtTerm={stopAtTerm} />
        {
            lineage.descendants.map((descendantLineage, idx) => {

                return (
                    <RecursiveAncestor key={`recAnc-${idx}`} lineage={descendantLineage} stopAtTerm={stopAtTerm} />)
            })
        }</>);
}