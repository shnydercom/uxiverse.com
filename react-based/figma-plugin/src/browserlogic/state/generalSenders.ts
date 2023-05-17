import { match } from 'ts-pattern'
import { HostAppElement } from '../../communicationInterfaces'
import { isIRIaProperty } from '../naming-recommendations/exploration'
import {
  AvailableNotations,
  NOTATIONS_MAIN_DICT,
  determineJoinerTokens,
} from '../notation-handler'
import { getInitialRenamePartCopy } from './initialValues'
import { MainMachineXSCtx } from './mainMachine'
import { MainMachineSelectorArg } from './moreTypes'
import {
  AllMainMachineStateEvents,
  PluginConfirmPhraseEvent,
} from './stateEvents'

export function evalAndSendNotationChange(
  send: (eventObj: AllMainMachineStateEvents) => void,
  focusedElement: HostAppElement,
  state: MainMachineSelectorArg | undefined,
  context: MainMachineXSCtx | undefined
) {
  const { elementFigmaContext: ctx } = focusedElement
  if (!ctx) {
    return
  }
  if (ctx.isComponentInVariant) {
    send({
      type: 'FORCE_SPACED_COMMA_EQUALS',
    })
    return
  }
  if (
    (ctx.isAComponentSet || ctx.isInstanceOfAVariant) &&
    (state?.matches('notation.spacedCommaEquals') ||
      context?.plugin.ontologySearch.notation ===
        AvailableNotations.SpacedCommaEquals)
  ) {
    send({
      type: 'CHANGE_NOTATION',
    })
    return
  }
}

export const evalPluginConfirm = (
  context: MainMachineXSCtx,
  event: PluginConfirmPhraseEvent
): MainMachineXSCtx => {
  const { displayFullValue, iri } = event
  let ctxCopy: MainMachineXSCtx = { ...context }
  const graph = ctxCopy.plugin.graph
  ctxCopy.plugin = { ...context.plugin }
  delete ctxCopy.plugin.graph
  ctxCopy.plugin = (JSON.parse(
    JSON.stringify(ctxCopy.plugin)
  ) as unknown) as MainMachineXSCtx['plugin']
  ctxCopy.plugin.graph = graph
  const { confirmedRenameParts, notation } = ctxCopy.plugin.ontologySearch
  const foundRenamePartIdx = confirmedRenameParts.findIndex(
    val => val.relativeCursorPos !== -1
  )
  if (foundRenamePartIdx === -1) {
    console.log(context)
    console.error('error finding RenamePartSemantic')
    return ctxCopy
  }

  const foundRenamePart = confirmedRenameParts[foundRenamePartIdx]
  const isCursorAtLastPart =
    foundRenamePartIdx === confirmedRenameParts.length - 1
  foundRenamePart.main = { iri, shortForm: displayFullValue }
  const joinerStr = match(notation)
    .with(
      AvailableNotations.SpacedDashes,
      () => ` ${NOTATIONS_MAIN_DICT[notation].mainDelimiter} `
    )
    .with(
      AvailableNotations.SpacedSlashes,
      () => ` ${NOTATIONS_MAIN_DICT[notation].mainDelimiter} `
    )
    .with(
      AvailableNotations.SpacedCommaEquals,
      () => `${NOTATIONS_MAIN_DICT[notation].mainDelimiter} `
    )
    .exhaustive()
  // start handling for secondary tokens
  const joinerTokens = determineJoinerTokens(
    notation,
    confirmedRenameParts,
    context.plugin.renameValue
  )
  const joinerStrDynmic = (index: number) => {
    if (joinerTokens.length <= 1) {
      return joinerStr
    }
    return joinerTokens[index] ?? ''
  }
  const joinerReducer = (prev, cur, idx) => {
    if (idx === 0) {
      return prev + cur
    }
    return `${prev}${joinerStrDynmic(idx)}${cur}`
  }
  // end extra handling for secondary tokens
  if (isCursorAtLastPart) {
    foundRenamePart.relativeCursorPos = -1
    const newEmptyPart = getInitialRenamePartCopy()
    newEmptyPart.lexerStartEnd = {
      start: foundRenamePart.lexerStartEnd.end,
      end: foundRenamePart.lexerStartEnd.end,
    }
    const spliceLength = confirmedRenameParts.filter(
      val => val.relativeCursorPos !== -1
    ).length
    confirmedRenameParts.splice(
      foundRenamePartIdx + spliceLength + 1,
      0,
      newEmptyPart
    )
    newEmptyPart.relativeCursorPos = joinerStrDynmic(foundRenamePartIdx).length //joinerStr.length
  } else {
    foundRenamePart.relativeCursorPos =
      foundRenamePart.lexerStartEnd.end - foundRenamePart.lexerStartEnd.start
  }
  const newRenameValueParts = confirmedRenameParts.map((val, idx) => {
    /*if (idx === foundRenamePartIdx) {
      return val.main.shortForm + joinerStr
    }*/
    return val.main.shortForm
  })
  const newRenameValue = newRenameValueParts.reduce(joinerReducer, '') //.join(joinerStr)
  ctxCopy.plugin.renameValue = newRenameValue
  if (!ctxCopy.plugin.graph) {
    return ctxCopy
  }
  const isIriProp = isIRIaProperty(ctxCopy.plugin.graph, iri)
  ctxCopy.plugin.ontologySearch.isPropSearch = isIriProp
  ctxCopy.plugin.ontologySearch.exploredIRI = iri
  // mutate to set correct token start and end values
  newRenameValueParts.forEach((val, idx) => {
    const prevStrLength = newRenameValueParts
      .slice(0, idx)
      .reduce(joinerReducer, '').length
    //.join(joinerStr).length
    confirmedRenameParts[idx].lexerStartEnd = {
      start: prevStrLength,
      end: prevStrLength + val.length + joinerStrDynmic(idx).length,
    }
    if (idx === 0) {
      confirmedRenameParts[idx].lexerStartEnd.end = prevStrLength + val.length
    }
    if (idx === foundRenamePartIdx) {
      confirmedRenameParts[idx].relativeCursorPos =
        confirmedRenameParts[idx].lexerStartEnd.end -
        confirmedRenameParts[idx].lexerStartEnd.start
    }
  })
  return ctxCopy
}
