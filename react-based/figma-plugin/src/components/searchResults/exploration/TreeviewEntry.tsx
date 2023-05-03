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
        send({ type: 'CHANGE_EXPLORATION', explorationValue: iri } as PluginExplorationEvent)
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
    const onConfirmPhraseClick = () => {
        send({
            type: 'CONFIRM_PHRASE',
            displayFullValue,
            iri
        })
    }
    return (
        <div className={`tree-entry ${isHighlighted ? "highlight" : ""}`}
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
        >
            <button onClick={exploreClick}>
                <span className="full-value">{displayFullValue}</span>
                <ExploreIRI className="button-icon" />
            </button>
            <button onClick={onConfirmPhraseClick}>
                <AddToReplaceValue className="button-icon extra-icon" />
            </button>
            <button className='reordered-button' onClick={copyButtonHandler}>
                <CopyIcon className="button-icon copy-icon" />
            </button>
        </div>
    );
}