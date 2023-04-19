import React from "react";
import { FunctionComponent } from "react";
import { ExploreIRI } from "./../../../assets/explore-iri"
import { AddToReplaceValue } from "./../../../assets/add-to-replacevalue"

export interface TreeviewEntryProps {
    displayFullValue: string;
    iri: string;
    isHighlighted?: boolean;
}

export const TreeviewEntry: FunctionComponent<TreeviewEntryProps> = (
    { displayFullValue, isHighlighted }
) => {
    return (<div className={`tree-entry ${isHighlighted ? "highlight" : ""}`}>
        <ExploreIRI className="explore-icon" />
        <button>
            <span>{displayFullValue}</span>
            <AddToReplaceValue className="button-icon" />
        </button>
    </div>);
}