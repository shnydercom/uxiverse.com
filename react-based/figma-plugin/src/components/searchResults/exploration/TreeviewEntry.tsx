import React, { useContext } from "react";
import { FunctionComponent } from "react";
import { ExploreIRI } from "./../../../assets/explore-iri"
import { AddToReplaceValue } from "./../../../assets/add-to-replacevalue"
import { GlobalStateContext } from "../../../browserlogic/state/globalStateProvider";
import { HoverDefinitionEnterEvent, PluginExplorationEvent } from "../../../browserlogic/state/stateEvents";

export interface TreeviewEntryProps {
    displayFullValue: string;
    iri: string;
    isHighlighted?: boolean;
}

export const TreeviewEntry: FunctionComponent<TreeviewEntryProps> = (
    { displayFullValue, isHighlighted, iri }
) => {
    const globalServices = useContext(GlobalStateContext)
    const { send } = globalServices.mainService
    const exploreClick = () => {
        send({ type: 'CHANGE_EXPLORATION', explorationValue: iri, changePropClassSearch: false } as PluginExplorationEvent)
    }
    const mouseEnterHandler = () => {
        send({
            type: 'HOVER_DEFINITION_ENTER',
            focusedDefinition: iri,
        } as HoverDefinitionEnterEvent)
    }
    const mouseLeaveHandler = () => {
        send('HOVER_DEFINITION_EXIT')
    }
    return (<div className={`tree-entry ${isHighlighted ? "highlight" : ""}`}>
        <button onClick={exploreClick}>
            <ExploreIRI className="button-icon" />
        </button>
        <button onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler}>
            <span>{displayFullValue}</span>
            <AddToReplaceValue className="button-icon" />
        </button>
    </div>);
}