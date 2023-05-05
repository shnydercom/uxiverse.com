import { match } from 'ts-pattern'
import {
  AvailableNotations,
  NOTATIONS_MAIN_DICT,
  handleNotation,
} from '../browserlogic/notation-handler'
import { RenamePartSemantic } from '../browserlogic/state/mainMachine'
import { MainMachineSelectorArg } from '../browserlogic/state/moreTypes'
import { AllMainMachineStateEvents } from '../browserlogic/state/stateEvents'
import { uxiverseRootIRI } from '../browserlogic/naming-recommendations/ontology-globals'
import { getInitialRenamePartCopy } from '../browserlogic/state/initialValues'
import { lexLine } from '../browserlogic/naming-recommendations/lexLine'
import { ReactEventHandler } from 'react'

export const onReplaceChangeFactory = (
  notation: AvailableNotations,
  /** takes the "send" function from xstate, narrowed down for usage */
  send: (eventObj: AllMainMachineStateEvents) => void,
  /** takes the "state" from xstate, retrievable in react through useActor */
  state: MainMachineSelectorArg
) => (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
  let { selectionStart } = event.currentTarget
  if (
    selectionStart === null ||
    selectionStart !== event.currentTarget.selectionEnd
  ) {
    //only handle if cursor position is clear
    return
  }
  if (
    event.nativeEvent.type === 'input' &&
    (event.nativeEvent as InputEvent).data ===
      NOTATIONS_MAIN_DICT[notation].mainDelimiter
  ) {
    // confirm the topmost phrase in autocomplete-suggestions when pressing the notation's main delimiter
    const valueFront = value.substring(0, selectionStart - 1).trim()
    const valueRear = value.substring(selectionStart, undefined).trim()
    const notationSyntaxToken = match(notation)
      .with(
        AvailableNotations.SpacedCommaEquals,
        sel => `${NOTATIONS_MAIN_DICT[sel].mainDelimiter} `
      )
      .with(
        AvailableNotations.SpacedDashes,
        sel => ` ${NOTATIONS_MAIN_DICT[sel].mainDelimiter} `
      )
      .with(
        AvailableNotations.SpacedSlashes,
        sel => ` ${NOTATIONS_MAIN_DICT[sel].mainDelimiter} `
      )
      .exhaustive()
    // note: if re-using value and selectionStart turns out to be buggy, extract to individual variables
    value = `${valueFront}${notationSyntaxToken}${valueRear}`
    selectionStart = valueFront.length + notationSyntaxToken.length
  }
  if (state.matches('phraseRecommendations.autoCompleteView') && value === '') {
    const initialConfirmedRenamePart = getInitialRenamePartCopy()
    initialConfirmedRenamePart.relativeCursorPos = 0
    send({
      type: 'EMPTY_SEARCH_PHRASE',
      confirmedRenameParts: [initialConfirmedRenamePart],
      inputValue: '',
      ontologySearchValue: '',
      exploredIRI: uxiverseRootIRI + 'Button',
    })
    return
  }
  const trimmedValueFront = value.slice(0, selectionStart).trim()
  const trimmedValueRear = value.slice(selectionStart).trim()
  const isDelimitedAtFront = trimmedValueFront.endsWith(
    NOTATIONS_MAIN_DICT[notation].mainDelimiter
  )
  const isDelimitedAtRear = trimmedValueRear.startsWith(
    NOTATIONS_MAIN_DICT[notation].mainDelimiter
  )
  if (
    (trimmedValueFront.length === 0 && trimmedValueRear.length === 0) ||
    (trimmedValueFront.length === 0 && isDelimitedAtRear) ||
    (trimmedValueRear.length === 0 && isDelimitedAtFront) ||
    (isDelimitedAtFront && isDelimitedAtRear)
  ) {
    let confirmedRenameParts = lexLine(
      value,
      selectionStart,
      notation,
      state.context.plugin.ontologySearch.confirmedRenameParts
    )
    const cursorPosRenamePartIdx = confirmedRenameParts.findIndex(
      val => val.relativeCursorPos !== -1
    )
    if (confirmedRenameParts[cursorPosRenamePartIdx]) {
      confirmedRenameParts[cursorPosRenamePartIdx].relativeCursorPos =
        confirmedRenameParts[cursorPosRenamePartIdx].lexerStartEnd.end -
        confirmedRenameParts[cursorPosRenamePartIdx].lexerStartEnd.start
    }
    //finds a suggestion for the treeview-exploration
    const exploredIRI = match(cursorPosRenamePartIdx)
      .with(-1, () => uxiverseRootIRI + 'Button')
      .when(
        pIDx => pIDx >= 0 && confirmedRenameParts[pIDx].main.iri !== null,
        pIDx => confirmedRenameParts[pIDx].main.iri!
      )
      .when(
        pIDx =>
          pIDx >= 0 &&
          confirmedRenameParts[pIDx].main.iri === null &&
          (confirmedRenameParts.find(value => value.main !== null)?.main?.iri ??
            null !== null),
        pIDx => {
          const foundFrontIri =
            confirmedRenameParts
              .slice(0, cursorPosRenamePartIdx)
              .reverse()
              .find(value => value.main !== null)?.main?.iri ?? null
          if (foundFrontIri !== null) {
            return foundFrontIri
          }
          return confirmedRenameParts.find(value => value.main !== null)!.main!
            .iri!
        }
      )
      .otherwise(() => uxiverseRootIRI + 'Button')
    const ontologySearchValue: string = determineOntologySearchValueForReplace(
      confirmedRenameParts
    )
    if (!value) {
      const initialConfirmedRenamePart = getInitialRenamePartCopy()
      initialConfirmedRenamePart.relativeCursorPos = 0
      confirmedRenameParts = [initialConfirmedRenamePart]
    }
    send({
      type: 'EMPTY_SEARCH_PHRASE',
      confirmedRenameParts,
      inputValue: value,
      ontologySearchValue,
      exploredIRI,
    })
    return
  }
  let confirmedRenameParts = lexLine(
    value,
    selectionStart,
    notation,
    state.context.plugin.ontologySearch.confirmedRenameParts
  )
  const ontologySearchValue: string = determineOntologySearchValueForReplace(
    confirmedRenameParts
  )
  if (!value) {
    const initialConfirmedRenamePart = getInitialRenamePartCopy()
    initialConfirmedRenamePart.relativeCursorPos = 0
    confirmedRenameParts = [initialConfirmedRenamePart]
  }
  send({
    type: 'CHANGE_SEARCH_PHRASES',
    inputValue: value,
    confirmedRenameParts,
    ontologySearchValue,
  })
}

export const onOverwriteReplaceClickFactory = (
  notation: AvailableNotations,
  /** takes the "send" function from xstate, narrowed down for usage */
  send: (eventObj: AllMainMachineStateEvents) => void,
  /** takes the "state" from xstate, retrievable in react through useActor */
  state: MainMachineSelectorArg
) => (componentSearchValue: string | undefined) => {
  const value = handleNotation(componentSearchValue, notation) ?? ''
  const confirmedRenameParts = lexLine(
    value,
    value.length,
    notation,
    state.context.plugin.ontologySearch.confirmedRenameParts
  )
  const ontologySearchValue: string = determineOntologySearchValueForReplace(
    confirmedRenameParts
  )
  send({
    type: 'CHANGE_SEARCH_PHRASES',
    inputValue: value,
    confirmedRenameParts,
    ontologySearchValue,
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
  state: MainMachineSelectorArg
): ReactEventHandler<HTMLInputElement> => event => {
  const isValidEvent = match(event)
    .with({ nativeEvent: { type: 'selectionchange' } }, sel => true)
    .with({ nativeEvent: { type: 'mouseup' } }, sel => true)
    .with({ nativeEvent: { type: 'dragend' } }, sel => true)
    .otherwise(() => false)
  if (!isValidEvent) return
  let selectionStartValidated: number
  let selectionEndValidated: number
  const {
    selectionStart,
    selectionEnd,
    selectionDirection,
    value,
  } = event.currentTarget
  if (selectionStart === null || selectionEnd === null) {
    // only handle if cursor position is clear
    return
  }
  selectionStartValidated = selectionStart
  selectionEndValidated = selectionEnd
  const replaceRegex = NOTATIONS_MAIN_DICT[notation].syntaxRemover
  const isTextRangeSelected = selectionStartValidated !== selectionEndValidated
  let {
    confirmedRenameParts,
    exploredIRI,
    ontologySearchValue,
  } = state.context.plugin.ontologySearch
  //handle selection event after programmatic change
  if (
    confirmedRenameParts.length > 0 &&
    [
      'CONFIRM_PHRASE',
      'CHANGE_EXPLORATION',
      'CHANGE_SEARCH_PHRASES',
      'EMPTY_SEARCH_PHRASE',
      'SELECT_EMPTY_PHRASE',
      'SELECT_PHRASE',
    ].includes(state.transitions[0].eventType) &&
    confirmedRenameParts[confirmedRenameParts.length - 1].relativeCursorPos ===
      -1 &&
    selectionStartValidated === value.length
  ) {
    const cursorPosRenamePartIdx = confirmedRenameParts.findIndex(
      val => val.relativeCursorPos !== -1
    )
    if (cursorPosRenamePartIdx === -1) {
      console.error('error in onSelectionChangeFactory')
    }
    selectionStartValidated = selectionEndValidated =
      confirmedRenameParts[cursorPosRenamePartIdx].lexerStartEnd.start
  }
  //iterate over confirmed parts
  confirmedRenameParts.forEach((val, idx, array) => {
    const { start, end } = val.lexerStartEnd
    if (selectionStartValidated >= start && selectionStartValidated <= end) {
      // start of a selection, or single selection
      val.relativeCursorPos = selectionStartValidated - start
      if (!isTextRangeSelected || selectionDirection === 'backward') {
        exploredIRI = val.main.iri ?? exploredIRI
        ontologySearchValue = determineOntologySearchValueForSelection(
          value,
          start,
          val.relativeCursorPos,
          replaceRegex
        )
      }
      return
    }
    if (!isTextRangeSelected) {
      val.relativeCursorPos = -1
      return
    }
    if (selectionStartValidated < start && selectionEndValidated > end) {
      //it's in the middle of a bigger selection
      val.relativeCursorPos = 0
      return
    }
    if (selectionStartValidated < start && selectionEndValidated <= end) {
      //end of a selection
      val.relativeCursorPos = end - selectionEndValidated
      if (selectionDirection !== 'backward') {
        exploredIRI = val.main.iri ?? exploredIRI
        ontologySearchValue = determineOntologySearchValueForSelection(
          value,
          start,
          val.relativeCursorPos,
          replaceRegex
        )
      }
      return
    }
    val.relativeCursorPos = -1
  })
  if (ontologySearchValue.length !== 0) {
    send({
      type: 'SELECT_PHRASE',
      confirmedRenameParts,
      ontologySearchValue,
      exploredIRI,
      inputValue: value,
    })
    return
  }
  send({
    type: 'SELECT_EMPTY_PHRASE',
    confirmedRenameParts,
    ontologySearchValue,
    exploredIRI,
    inputValue: value,
  })
}

const determineOntologySearchValueForSelection = (
  inputStr: string,
  start: number,
  relativeCursorPos: number,
  replaceRegex: RegExp
): string => {
  return inputStr
    .slice(start, start + relativeCursorPos)
    .replace(replaceRegex, '')
    .trim()
}

const determineOntologySearchValueForReplace = (
  renameSemantics: RenamePartSemantic[]
): string => {
  let result: string = ''
  const semanticAtCursor = renameSemantics.find(
    val => val.relativeCursorPos !== -1
  )
  //TODO: include property and type
  result = semanticAtCursor?.main.shortForm ?? ''
  return result
}
