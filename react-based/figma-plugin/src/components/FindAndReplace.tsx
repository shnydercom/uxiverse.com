import React, {
  MouseEventHandler,
  useCallback,
  useContext,
} from 'react'
import { Icon, Input } from 'react-figma-plugin-ds'
import { HoverableElements } from '../identifiable/HoverableElements'
import { useSelector } from '@xstate/react'
import { CompAutocomplete } from './hostcomp-selection/comp-autocomplete'
import { HostAppElement } from '../communicationInterfaces'
import { FocusSelectorType, HostSelectorType, SearchValueSelectorType, StateMatchSelectorType } from '../browserlogic/state/moreTypes'
import { GlobalStateContext } from '../browserlogic/state/globalStateProvider'
import { CopyCompTxtToRenameEvent, FocusSelectionEvent, PluginInputTypingEvent, PluginUnlinkedDataUpdateEvent } from '../browserlogic/state/mainMachine'

const hostSelectionSelector: HostSelectorType = state => {
  return state.context.host.userSelection
}
const selectionFocusedSelector: FocusSelectorType | undefined = state => {
  return state.context.host.selectionFocusedElement
}

const hostSearchValueSelector: SearchValueSelectorType | undefined = state => {
  return state.context.plugin.hostAppSearch.searchValue
}

const renameValueSelector:
  | SearchValueSelectorType
  | undefined = state => {
    return state.context.plugin.renameValue
  }


const navArrowsDisabledSelector: StateMatchSelectorType = state => {
  if (
    state.matches('hostSelectionState.rawSingleSelection') ||
    state.matches('hostSelectionState.noSelection')
  ) {
    return true
  }
  if (
    state.matches('hostSelectionState.rawMultiSelection') &&
    state.context.host.selectionFocusedElement
  ) {
    return true
  }
  return false
}

export const FindAndReplace = () => {
  const globalServices = useContext(GlobalStateContext)
  const hostSelection = useSelector(
    globalServices.mainService,
    hostSelectionSelector
  )
  const selectionFocus = useSelector(
    globalServices.mainService,
    selectionFocusedSelector
  )
  const componentSearchValue = useSelector(
    globalServices.mainService,
    hostSearchValueSelector
  )
  const isNavArrowsDisabled = useSelector(
    globalServices.mainService,
    navArrowsDisabledSelector
  )
  const renameValue = useSelector(
    globalServices.mainService,
    renameValueSelector
  )

  const { send } = globalServices.mainService

  const onListEntryClick = (focusedElement: HostAppElement) => {
    send({ type: 'SELECT_FOCUS', focusedElement } as FocusSelectionEvent)
  }

  const onPreviousClick = () => {
    let currentSelectionIndex = hostSelection.findIndex(
      val => val === selectionFocus
    )
    currentSelectionIndex =
      currentSelectionIndex <= 0
        ? hostSelection.length - 1
        : currentSelectionIndex - 1
    const previousElement: HostAppElement = hostSelection[currentSelectionIndex]
    send({
      type: 'SELECT_FOCUS',
      focusedElement: previousElement,
    } as FocusSelectionEvent)
  }
  const onNextClick = () => {
    let currentSelectionIndex = hostSelection.findIndex(
      val => val === selectionFocus
    )
    currentSelectionIndex =
      currentSelectionIndex >= hostSelection.length - 1
        ? 0
        : currentSelectionIndex + 1
    const previousElement: HostAppElement = hostSelection[currentSelectionIndex]
    send({
      type: 'SELECT_FOCUS',
      focusedElement: previousElement,
    } as FocusSelectionEvent)
  }
  const onOverwriteReplaceClick = () => {
    send({
      type: 'COPY_COMPTXT_TO_RENAMEREPLACE',
      copiedText: componentSearchValue,
    } as CopyCompTxtToRenameEvent)
  }
  const onConfirmReplaceClick = () => {

    send({ type: "UPDATE_UNLINKED_DATA", } as PluginUnlinkedDataUpdateEvent)
  }
  const onDeleteClick = () => { }

  //input fields

  const onSearchChange = () => { }

  const onReplaceChange = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    send({ type: 'EDIT_PHRASES', inputValue: event.currentTarget.value } as PluginInputTypingEvent)
  }
  const onElemHover: MouseEventHandler<
    HTMLButtonElement | HTMLInputElement
  > = (event) => {
    switch (event.currentTarget.id) {
      case HoverableElements.btnPrevComponent:
      case HoverableElements.btnNextComponent:
      case HoverableElements.inputChangeReplace:
      case HoverableElements.inputCompName:
      case HoverableElements.btnCompTxtToReplace:
      case HoverableElements.btnExecReplace:
      case HoverableElements.btnClear:
        send({ type: 'HOVER_UI_ELEM_ENTER', payload: event.currentTarget.id })
      default:
        break
    }
  }

  const onElemHoverLeave: MouseEventHandler<
    HTMLButtonElement | HTMLInputElement
  > = (event) => {
    send('HOVER_UI_ELEM_EXIT')
  }
  return (
    <div className="find-and-replace">
      <Icon
        name="caret-left"
        isDisabled={isNavArrowsDisabled}
        onClick={onPreviousClick}
        iconButtonProps={{
          onMouseOver: onElemHover,
          onMouseLeave: onElemHoverLeave,
          id: HoverableElements.btnPrevComponent,
        }}
      />
      <CompAutocomplete
        placeholder="Find and select"
        onChange={onSearchChange}
        onMouseOver={onElemHover}
        onMouseLeave={onElemHoverLeave}
        hostSelection={hostSelection}
        selectionFocus={selectionFocus}
        value={componentSearchValue}
        onSelectionClick={onListEntryClick}
        id={HoverableElements.inputCompName}
      />
      <Icon
        name="caret-right"
        isDisabled={isNavArrowsDisabled}
        onClick={onNextClick}
        iconButtonProps={{
          onMouseOver: onElemHover,
          onMouseLeave: onElemHoverLeave,
          id: HoverableElements.btnNextComponent,
        }}
      />

      <Icon
        name="caret-down"
        onClick={onOverwriteReplaceClick}
        iconButtonProps={{
          onMouseOver: onElemHover,
          onMouseLeave: onElemHoverLeave,
          id: HoverableElements.btnCompTxtToReplace,
        }}
      />

      <Icon
        name="play"
        onClick={onConfirmReplaceClick}
        iconButtonProps={{
          onMouseOver: onElemHover,
          onMouseLeave: onElemHoverLeave,
          id: HoverableElements.btnExecReplace,
        }}
      />
      <Input
        placeholder="Rename"
        onChange={onReplaceChange}
        icon="swap"
        onMouseOver={onElemHover}
        onMouseLeave={onElemHoverLeave}
        value={renameValue}
        id={HoverableElements.inputChangeReplace}
      />
      <Icon
        name="trash"
        onClick={onDeleteClick}
        iconButtonProps={{
          onMouseOver: onElemHover,
          onMouseLeave: onElemHoverLeave,
          id: HoverableElements.btnClear,
        }}
      />
    </div>
  )
}
