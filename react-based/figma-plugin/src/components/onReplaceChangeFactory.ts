import { P, match } from "ts-pattern"
import { AvailableNotations, NOTATIONS_MAIN_DELIMITER_DICT } from "../browserlogic/notation-handler"
import { LexerStartEnd, RenamePartSemantic } from "../browserlogic/state/mainMachine"
import { MainMachineSelectorArg } from "../browserlogic/state/moreTypes"
import { AllMainMachineStateEvents } from "../browserlogic/state/stateEvents"
import { uxiverseRootIRI } from "../browserlogic/naming-recommendations/ontology-globals"
import { getInitialRenamePartCopy } from "../browserlogic/state/initialValues"

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
            send({
                type: "EMPTY_SEARCH_PHRASE",
                confirmedRenameParts: [getInitialRenamePartCopy()],
                inputValue: "",
                ontologySearchValue: "",
                exploredIRI: uxiverseRootIRI + "Button"
            })
            return;
        }
        const trimmedValueFront = value.slice(0, selectionStart).trim();
        const trimmedValueRear = value.slice(selectionStart).trim();
        const isDelimitedAtFront = trimmedValueFront.endsWith(NOTATIONS_MAIN_DELIMITER_DICT[notation]);
        const isDelimitedAtRear = trimmedValueRear.startsWith(NOTATIONS_MAIN_DELIMITER_DICT[notation]);
        if (
            (trimmedValueFront.length === 0 && trimmedValueRear.length === 0)
            || (trimmedValueFront.length === 0 && isDelimitedAtRear)
            || (trimmedValueRear.length === 0 && isDelimitedAtFront)
            || (isDelimitedAtFront && isDelimitedAtRear)
        ) {
            const confirmedRenameParts = lexLine(value, selectionStart, notation, state.context.plugin.ontologySearch.confirmedRenameParts);
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
            const ontologySearchValue: string = determineOntologySearchValue(confirmedRenameParts);
            send({
                type: "EMPTY_SEARCH_PHRASE",
                confirmedRenameParts,
                inputValue: value,
                ontologySearchValue,
                exploredIRI
            })
            return;
        }
        const confirmedRenameParts = lexLine(value, selectionStart, notation, state.context.plugin.ontologySearch.confirmedRenameParts);
        const ontologySearchValue: string = determineOntologySearchValue(confirmedRenameParts);
        send({
            type: 'CHANGE_SEARCH_PHRASES',
            inputValue: value,
            confirmedRenameParts,
            ontologySearchValue
        })
    }

export const onSelectionChangeFactory = (
    notation: AvailableNotations,
    /** takes the "send" function from xstate, narrowed down for usage */
    send: (eventObj: AllMainMachineStateEvents) => void): React.ReactEventHandler<HTMLInputElement> => (
        event
    ) => {
    }

const lexLine = (textValue: string, textCursorPos: number, notation: AvailableNotations, previousRenameSemantics: RenamePartSemantic[]): RenamePartSemantic[] => {

    const lexByMainDelimiter = (tokenWSyntaxRegex: RegExp, replaceRegex: RegExp) => {
        //extra handling for initial state
        if (previousRenameSemantics.length === 0) {
            previousRenameSemantics = [{
                lexerStartEnd: { start: 0, end: textValue.length }, relativeCursorPos: textCursorPos, main:
                {
                    shortForm: textValue.replace(replaceRegex, ""),
                    iri: null
                }
            }]
        }

        // operation on the whole string including whitespaces from delimiter to delimiter [" asöädf345 /","  fßd.sa/", "q_wer"]
        const tokensWSyntax = textValue.match(tokenWSyntaxRegex,) ?? [textValue];

        const lexerStartEnd: LexerStartEnd[] = tokensWSyntax.map((token, idx, array) => {
            const previousLineLength = array.slice(0, idx).map((str) => {
                return str.length
            }).reduce((prev, cur) => prev + cur, 0);
            return {
                start: previousLineLength,
                end: previousLineLength + token.length
            }
        })
        return tokensWSyntax.map((token, idx, array) => {
            console.log("tokens inner fn")
            // remove whitespace and delimiter
            const cleanedToken = token.replace(replaceRegex, "");
            let foundRenameSemantics = previousRenameSemantics.find((value) => value.type === cleanedToken || value.property === cleanedToken || value.main.shortForm === cleanedToken)
            //find cursor in uncleaned string
            let matchingCursorPosition = textCursorPos <= lexerStartEnd[idx].end && textCursorPos > lexerStartEnd[idx].start ? textCursorPos : -1;
            let localMatchingCursorPosition = matchingCursorPosition === -1 ? -1 : matchingCursorPosition - lexerStartEnd[idx].start;
            if (matchingCursorPosition !== -1) {
                //find cursor in cleaned string
                let lookAhead: string = token.slice(localMatchingCursorPosition, localMatchingCursorPosition + 3);
                lookAhead = lookAhead.replace(/[/\s-]*/, "");
                if (lookAhead) {
                    localMatchingCursorPosition = cleanedToken.lastIndexOf(lookAhead);
                } else {
                    let lookBehind = token.slice(localMatchingCursorPosition - 3, localMatchingCursorPosition);
                    lookBehind = lookBehind.replace(/[/\s-]*/, "");
                    if (lookBehind) {
                        localMatchingCursorPosition = cleanedToken.indexOf(lookBehind) + lookBehind.length;
                    }
                }
            }
            let result: RenamePartSemantic = {
                relativeCursorPos: localMatchingCursorPosition,
                lexerStartEnd: lexerStartEnd[idx],
                main: { iri: null, shortForm: "" }
            }
            if (foundRenameSemantics) {
                const { property, type, main } = foundRenameSemantics;
                result = {
                    ...result,
                    property,
                    type,
                    main
                }
            } else {
                result = {
                    ...result,
                    main: { iri: null, shortForm: cleanedToken }
                }
            }
            return result;
        })
    }

    return match(notation)
        .with(AvailableNotations.SpacedDashes, () => {
            return lexByMainDelimiter(/-[^-]*|^[^-]+/g, /[/\s-]*/g);
        })
        .with(AvailableNotations.SpacedSlashes, () => {
            return lexByMainDelimiter(/[^\/]*(\/)/g, /[/\s\/]*/g);
        })
        .with(AvailableNotations.SpacedCommaEquals, (sel) => {
            return lexByMainDelimiter(/[^,]*,/g, /[/\s,]*/g);
        })
        .exhaustive();
}

const determineOntologySearchValue = (renameSemantics: RenamePartSemantic[]): string => {
    let result: string = "";
    const semanticAtCursor = renameSemantics.find((val) => val.relativeCursorPos !== -1);
    //TODO: include property and type
    result = semanticAtCursor?.main.shortForm ?? "";
    return result;
}