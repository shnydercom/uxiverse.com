import { StringifiedLineage } from "@uxiverse.com/jsonld-tools";
import { FunctionComponent } from "react";
import { SingleAncestorStructure } from "./SingleAncestorStructure";

export interface RecursiveAncestorProps {
    lineage: StringifiedLineage;
    stopAtTerm: string;
}

export const RecursiveAncestorStructure: FunctionComponent<RecursiveAncestorProps> = ({ lineage, stopAtTerm }) => {
    const stopTermIdx = lineage.descendants.flatMap((val) => val.iris).findIndex((val) => val === stopAtTerm);
    const curElemMatches = lineage.iris.some((val) => val === stopAtTerm);
    if (stopTermIdx !== -1) {
        const stopTermEncounter = lineage.descendants[stopTermIdx];
        stopTermEncounter.descendants = []
        lineage.descendants = [stopTermEncounter]
    }
    return (<>
        <SingleAncestorStructure lineage={lineage} stopAtTerm={stopAtTerm} />
        {
            !curElemMatches && lineage.descendants.map((descendantLineage, idx) => {
                return (
                    <RecursiveAncestorStructure key={`recAnc-${idx}`} lineage={descendantLineage} stopAtTerm={stopAtTerm} />)
            })
        }</>);
}