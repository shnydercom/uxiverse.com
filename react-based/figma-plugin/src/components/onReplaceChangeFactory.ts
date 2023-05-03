import { match } from "ts-pattern"
import { AvailableNotations, NOTATIONS_MAIN_DICT, handleNotation } from "../browserlogic/notation-handler"
import { RenamePartSemantic } from "../browserlogic/state/mainMachine"
import { MainMachineSelectorArg } from "../browserlogic/state/moreTypes"
import { AllMainMachineStateEvents } from "../browserlogic/state/stateEvents"
import { uxiverseRootIRI } from "../browserlogic/naming-recommendations/ontology-globals"
import { getInitialRenamePartCopy } from "../browserlogic/state/initialValues"
import { lexLine } from "../browserlogic/naming-recommendations/lexLine"
import { ReactEventHandler } from "react"

export const onReplaceChangeFactory = (
    notation: AvailableNotations,
    /** takes the "send" function from xstate, narrowed down for usage */
    send: (eventObj: AllMainMachineStateEvents) => void,
    /** takes the "state" from xstate, retrievable in react through useActor */
    state: MainMachineSelectorArg) => (
        value: string,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { selectionStart } = event.currentTarget;
        if ((selectionStart === null)
            || (selectionStart !== event.currentTarget.selectionEnd)) {
            //only handle if cursor position is clear
            return;
        }
        if (state.matches("phraseRecommendations.autoCompleteView") && value === "") {
            const initialConfirmedRenamePart = getInitialRenamePartCopy();
            initialConfirmedRenamePart.relativeCursorPos = 0;
            send({
                type: "EMPTY_SEARCH_PHRASE",
                confirmedRenameParts: [initialConfirmedRenamePart],
                inputValue: "",
                ontologySearchValue: "",
                exploredIRI: uxiverseRootIRI + "Button"
            })
            return;
        }
        const trimmedValueFront = value.slice(0, selectionStart).trim();
        const trimmedValueRear = value.slice(selectionStart).trim();
        const isDelimitedAtFront = trimmedValueFront.endsWith(NOTATIONS_MAIN_DICT[notation].mainDelimiter);
        const isDelimitedAtRear = trimmedValueRear.startsWith(NOTATIONS_MAIN_DICT[notation].mainDelimiter);
        if (
            (trimmedValueFront.length === 0 && trimmedValueRear.length === 0)
            || (trimmedValueFront.length === 0 && isDelimitedAtRear)
            || (trimmedValueRear.length === 0 && isDelimitedAtFront)
            || (isDelimitedAtFront && isDelimitedAtRear)
        ) {
            let confirmedRenameParts = lexLine(value, selectionStart, notation, state.context.plugin.ontologySearch.confirmedRenameParts);
            const cursorPosRenamePartIdx = confirmedRenameParts.findIndex((val) => val.relativeCursorPos !== -1);
            //finds a suggestion for the treeview-exploration
            const exploredIRI = match(cursorPosRenamePartIdx)
                .with(-1, () => uxiverseRootIRI + "Button")
                .when((pIDx) => pIDx >= 0 && (confirmedRenameParts[pIDx].main.iri !== null),
                    (pIDx) => confirmedRenameParts[pIDx].main.iri!)
                .when((pIDx) => pIDx >= 0
                    && (confirmedRenameParts[pIDx].main.iri === null)
                    && (confirmedRenameParts.find((value) => value.main !== null)?.main?.iri ?? null !== null),
                    (pIDx) => {
                        const foundFrontIri = confirmedRenameParts.slice(0, cursorPosRenamePartIdx).reverse().find(
                            (value) => value.main !== null)?.main?.iri ?? null;
                        if (foundFrontIri !== null) {
                            return foundFrontIri;
                        }
                        return (confirmedRenameParts.find((value) => value.main !== null)!.main!.iri!)
                    })
                .otherwise(() => uxiverseRootIRI + "Button")
            const ontologySearchValue: string = determineOntologySearchValueForReplace(confirmedRenameParts);
            if (!value) {
                const initialConfirmedRenamePart = getInitialRenamePartCopy();
                initialConfirmedRenamePart.relativeCursorPos = 0;
                confirmedRenameParts = [initialConfirmedRenamePart]
            }
            send({
                type: "EMPTY_SEARCH_PHRASE",
                confirmedRenameParts,
                inputValue: value,
                ontologySearchValue,
                exploredIRI
            })
            return;
        }
        let confirmedRenameParts = lexLine(value, selectionStart, notation, state.context.plugin.ontologySearch.confirmedRenameParts);
        const ontologySearchValue: string = determineOntologySearchValueForReplace(confirmedRenameParts);
        if (!value) {
            const initialConfirmedRenamePart = getInitialRenamePartCopy();
            initialConfirmedRenamePart.relativeCursorPos = 0;
            confirmedRenameParts = [initialConfirmedRenamePart]
        }
        send({
            type: 'CHANGE_SEARCH_PHRASES',
            inputValue: value,
            confirmedRenameParts,
            ontologySearchValue
        })
    }

export const onOverwriteReplaceClickFactory = (
    notation: AvailableNotations,
    /** takes the "send" function from xstate, narrowed down for usage */
    send: (eventObj: AllMainMachineStateEvents) => void,
    /** takes the "state" from xstate, retrievable in react through useActor */
    state: MainMachineSelectorArg) => (
        componentSearchValue: string | undefined,
    ) => {
        const value = handleNotation(componentSearchValue, notation) ?? "";
        const confirmedRenameParts = lexLine(value, value.length, notation, state.context.plugin.ontologySearch.confirmedRenameParts);
        const ontologySearchValue: string = determineOntologySearchValueForReplace(confirmedRenameParts);
        send({
            type: 'CHANGE_SEARCH_PHRASES',
            inputValue: value,
            confirmedRenameParts,
            ontologySearchValue
        })
    }

/** 
 * Factory for creating selection change handlers
 * @param send takes the "send" function from xstate, narrowed down for usage
 * @param state takes the "state" from xstate, retrievable in react through useActor 
 * @returns an eventhandler-function */
export const onSelectionChangeFactory = (
    notation: AvailableNotations,
    send: (eventObj: AllMainMachineStateEvents) => void,
    state: MainMachineSelectorArg):
    ReactEventHandler<HTMLInputElement> =>
    (event) => {
        const isValidEvent = match(event)
            .with({ nativeEvent: { type: "selectionchange" } }, (sel) => true)
            .with({ nativeEvent: { type: "mouseup" } }, (sel) => true)
            .with({ nativeEvent: { type: "dragend" } }, (sel) => true)
            .otherwise(() => false)
        if (!isValidEvent) return;
        const { selectionStart, selectionEnd, selectionDirection, value } = event.currentTarget;
        if ((selectionStart === null) || (selectionEnd === null)) {
            // only handle if cursor position is clear
            return;
        }
        const replaceRegex = NOTATIONS_MAIN_DICT[notation].syntaxRemover;
        const isTextRangeSelected = (selectionStart !== selectionEnd);
        let { confirmedRenameParts, exploredIRI, ontologySearchValue } = state.context.plugin.ontologySearch;
        confirmedRenameParts.forEach((val, idx) => {
            const { start, end } = val.lexerStartEnd;
            if ((selectionStart >= start && selectionStart <= end)) {
                // start of a selection, or single selection
                val.relativeCursorPos = selectionStart - start;
                if (!isTextRangeSelected || selectionDirection === "backward") {
                    exploredIRI = val.main.iri ?? exploredIRI;
                    ontologySearchValue = determineOntologySearchValueForSelection(value, start, val.relativeCursorPos, replaceRegex)
                }
                return;
            }
            if (!isTextRangeSelected) {
                val.relativeCursorPos = -1;
                return;
            }
            if ((selectionStart < start && selectionEnd > end)) {
                //it's in the middle of a bigger selection
                val.relativeCursorPos = 0;
                return;
            }
            if (selectionStart < start && selectionEnd <= end) {
                //end of a selection
                val.relativeCursorPos = end - selectionEnd;
                if (selectionDirection !== "backward") {
                    exploredIRI = val.main.iri ?? exploredIRI;
                    ontologySearchValue = determineOntologySearchValueForSelection(value, start, val.relativeCursorPos, replaceRegex)
                }
                return;
            }
            val.relativeCursorPos = -1;
        })
        if (ontologySearchValue.length !== 0) {
            send({
                type: 'SELECT_PHRASE',
                confirmedRenameParts,
                ontologySearchValue,
                exploredIRI,
                inputValue: value
            });
            return;
        }
        send({
            type: 'SELECT_EMPTY_PHRASE',
            confirmedRenameParts,
            ontologySearchValue,
            exploredIRI,
            inputValue: value
        })

    }

const determineOntologySearchValueForSelection = (inputStr: string, start: number, relativeCursorPos: number, replaceRegex: RegExp): string => {
    return inputStr.slice(start, start + relativeCursorPos).replace(replaceRegex, "").trim();
}

const determineOntologySearchValueForReplace = (renameSemantics: RenamePartSemantic[]): string => {
    let result: string = "";
    const semanticAtCursor = renameSemantics.find((val) => val.relativeCursorPos !== -1);
    //TODO: include property and type
    result = semanticAtCursor?.main.shortForm ?? "";
    return result;
}