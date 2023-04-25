import React, { useContext } from "react";
import { FunctionComponent } from "react";
import { ExploreIRI } from "./../../../assets/explore-iri"
import { AddToReplaceValue } from "./../../../assets/add-to-replacevalue"
import { GlobalStateContext } from "../../../browserlogic/state/globalStateProvider";
import { HoverDefinitionEnterEvent, PluginExplorationEvent } from "../../../browserlogic/state/stateEvents";
import { CopyIcon } from "../../../assets/copy-icon";
import { copyTextToClipboard } from "../../../browserlogic/copyTextToClipboard";

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
    const copyButtonHandler = () => {
        copyTextToClipboard(displayFullValue);
    }
    return (
        <div className={`tree-entry ${isHighlighted ? "highlight" : ""}`}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >
            <button>
                <span className="full-value">{displayFullValue}</span>
                <AddToReplaceValue className="button-icon" />
            </button>
            <button onClick={exploreClick}>
                <ExploreIRI className="button-icon explore-icon" />
            </button>
            <button className='reordered-button' onClick={copyButtonHandler}>
                <CopyIcon className="button-icon copy-icon" />
            </button>
        </div>
    );
}