import React from "react";
import { FunctionComponent } from "react";
import { ExploreIRI } from "./../../../assets/explore-iri"
import { AddToReplaceValue } from "./../../../assets/add-to-replacevalue"

export interface TreeviewEntryProps {
    isTopmost?: boolean;
    displayFullValue: string;
    iri: string;
    isHighlighted?: boolean;
}

export const TreeviewEntry: FunctionComponent<TreeviewEntryProps> = (
    { isTopmost, displayFullValue, isHighlighted }
) => {
    return (<div className={`tree-entry ${isTopmost && "topmost"} ${isHighlighted && "highlight"}`}>
        <ExploreIRI />
        <span>{displayFullValue}</span>
        <AddToReplaceValue />
    </div>);
}