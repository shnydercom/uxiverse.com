import { Box } from "@mui/material";
import { StringifiedLineage } from "@uxiverse.com/jsonld-tools";
import { Fragment, FunctionComponent } from "react";
import { SingleAncestor } from "./singleAncestor";
import { ChevronRight } from "@mui/icons-material";

interface RecursiveAncestorProps {
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
    return (<Box sx={{
        display: "flex",
        flexDirection: "row"
    }}>
        <SingleAncestor lineage={lineage} />
        {
            lineage.descendants.map((descendantLineage, idx) => {
                return (<Fragment key={`recAnc-${idx}`}>
                    <ChevronRight />
                    <RecursiveAncestor lineage={descendantLineage} stopAtTerm={stopAtTerm} />
                </Fragment>)
            })
        }
    </Box>);
}