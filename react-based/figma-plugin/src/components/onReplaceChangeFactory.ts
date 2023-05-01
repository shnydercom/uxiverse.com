import { match } from "ts-pattern"
import { AvailableNotations } from "../browserlogic/notation-handler"
import { LexerStartEnd, MainMachineXSCtx, RenamePartSemantic } from "../browserlogic/state/mainMachine"
import { MainMachineSelectorArg } from "../browserlogic/state/moreTypes"
import { AllMainMachineStateEvents } from "../browserlogic/state/stateEvents"

export const onReplaceChangeFactory = (
    notation: AvailableNotations,
    /** takes the "send" function from xstate, narrowed down for usage */
    send: (eventObj: AllMainMachineStateEvents) => void,
    /** takes the "state" from xstate, retrievable in react through useActor */
    state: MainMachineSelectorArg) => (
        value: string,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (value === "" && state.matches("phraseRecommendations.autoCompleteView")) {
            send({
                type: "EMPTY_SEARCH_PHRASES",
            })
            return;
        }
        if ((event.currentTarget.selectionStart === null)
            || (event.currentTarget.selectionStart !== event.currentTarget.selectionEnd)) {
            //only handle if cursor position is clear
            return;
        }
        const confirmedRenameParts = lexLine(value, event.currentTarget.selectionStart, notation, state.context.plugin.ontologySearch.confirmedRenameParts);
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
                lexerStartEnd: { start: 0, end: textValue.length }, relativeCursorPos: textCursorPos, value:
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
            let foundRenameSemantics = previousRenameSemantics.find((value) => value.type?.shortForm === cleanedToken || value.property?.shortForm === cleanedToken || value.value?.shortForm === cleanedToken)
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
            }
            if (foundRenameSemantics) {
                const { property, type, value } = foundRenameSemantics;
                result = {
                    ...result,
                    property,
                    type,
                    value
                }
            } else {
                result = {
                    ...result,
                    value: { iri: null, shortForm: cleanedToken }
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
    result = semanticAtCursor?.value?.shortForm ?? "";
    return result;
}