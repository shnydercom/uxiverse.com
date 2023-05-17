import { Event, SingleOrArray } from 'xstate'
import {
  AllMainMachineStateEvents,
  HoverUIElemEnterEvent,
} from '../../browserlogic/state/stateEvents'
import { HoverableElements } from '../../identifiable/HoverableElements'

export interface MouseEnterExitHandlers {
  onAddToInputMouseEnter: (displayFullValue: string, iri: string) => void
  onMouseLeave: () => void
  onExploreMouseEnter: () => void
  onCopyMouseEnter: () => void
}

export const onMouseEnterExitHandlerFactory = (
  /** takes the "send" function from xstate, narrowed down for usage */
  send: (eventObj: SingleOrArray<Event<AllMainMachineStateEvents>>) => void
): MouseEnterExitHandlers => {
  const onAddToInputMouseEnter = (displayFullValue: string, iri: string) => {
    send([
      { type: 'CONFIRM_PHRASE_PREVIEW', displayFullValue, iri },
      {
        type: 'HOVER_UI_ELEM_ENTER',
        payload: HoverableElements.addTerm,
      } as HoverUIElemEnterEvent,
    ])
  }
  const onMouseLeave = () => {
    send([
      { type: 'HIDE_PREVIEW' },
      {
        type: 'HOVER_UI_ELEM_EXIT',
      },
    ])
  }
  const onExploreMouseEnter = () => {
    send({
      type: 'HOVER_UI_ELEM_ENTER',
      payload: HoverableElements.foundTerm,
    } as HoverUIElemEnterEvent)
  }
  const onCopyMouseEnter = () => {
    send({
      type: 'HOVER_UI_ELEM_ENTER',
      payload: HoverableElements.copyTerm,
    } as HoverUIElemEnterEvent)
  }
  return {
    onAddToInputMouseEnter,
    onMouseLeave,
    onExploreMouseEnter,
    onCopyMouseEnter,
  }
}
