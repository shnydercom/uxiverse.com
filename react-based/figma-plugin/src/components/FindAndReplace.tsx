import React, { MouseEventHandler, useContext, useState } from 'react'
import { Icon, Input } from 'react-figma-plugin-ds'
import { HoverableElements } from '../identifiable/HoverableElements'
import { useSelector } from '@xstate/react'
import { CompAutocomplete } from './hostcomp-selection/comp-autocomplete'
import { HostAppElement } from '../communicationInterfaces'
import {
  FocusSelectorType,
  HostSelectorType,
  SearchValueSelectorType,
  StateMatchSelectorType,
} from '../browserlogic/state/moreTypes'
import { GlobalStateContext } from '../browserlogic/state/globalStateProvider'
import {
  CopyCompTxtToRenameEvent,
  FocusSelectionEvent,
  PluginInputTypingEvent,
  PluginNotationToggleEvent,
  PluginUnlinkedDataUpdateEvent,
} from '../browserlogic/state/mainMachine'
import { RenameIcon } from '../assets/Rename'
import { PostRenameIcon } from '../assets/post-rename-icon'
import { PreRenameIcon } from '../assets/pre-rename-icon'
import { NotationSwitchDashesIcon } from '../assets/notation-switch-dashes'
import { NotationSwitchSlashesIcon } from '../assets/notation-switch-slashes'
import { getI18n } from '../i18n'
import { AvailableNotations } from '../browserlogic/notation-handler'

const i18n = getI18n()

const hostSelectionSelector: HostSelectorType = state => {
  return state.context.host.userSelection
}
const selectionFocusedSelector: FocusSelectorType | undefined = state => {
  return state.context.host.selectionFocusedElement
}

const hostSearchValueSelector: SearchValueSelectorType | undefined = state => {
  return state.context.plugin.hostAppSearch.searchValue
}

const renameValueSelector: SearchValueSelectorType | undefined = state => {
  return state.context.plugin.renameValue
}
const notationIsDashedSelector: StateMatchSelectorType | undefined = state => {
  return state.matches('NotationState.SpacedDashes')
}

const navArrowsDisabledSelector: StateMatchSelectorType = state => {
  if (
    state.matches('hostSelection.singleRaw') ||
    state.matches('hostSelection.empty')
  ) {
    return true
  }
  if (
    state.matches('hostSelection.multi.raw') &&
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
  const isNotationDashed = useSelector(
    globalServices.mainService,
    notationIsDashedSelector
  )

  const { send } = globalServices.mainService

  const [isExecReplaceIconHovered, setIsExecReplaceIconHovered] = useState<
    boolean
  >(false)
  const execReplaceIcon = isExecReplaceIconHovered ? (
    <PostRenameIcon />
  ) : (
    <PreRenameIcon />
  )

  const onListEntryClick = (focusedElement: HostAppElement) => {
    send({ type: 'SELECT_FOCUS', focusedElement } as FocusSelectionEvent)
  }

  const onPreviousClick = () => {
    let currentSelectionIndex = hostSelection.findIndex(
      val => val.id === selectionFocus?.id
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
      val => val.id === selectionFocus?.id
    )
    currentSelectionIndex =
      currentSelectionIndex >= hostSelection.length - 1
        ? 0
        : currentSelectionIndex + 1
    const nextElement: HostAppElement = hostSelection[currentSelectionIndex]
    send({
      type: 'SELECT_FOCUS',
      focusedElement: nextElement,
    } as FocusSelectionEvent)
  }
  const onOverwriteReplaceClick = () => {
    send({
      type: 'COPY_COMPTXT_TO_RENAMEREPLACE',
      copiedText: componentSearchValue,
      targetNotation: isNotationDashed
        ? AvailableNotations.SpacedDashes
        : AvailableNotations.SpacedSlashes,
    } as CopyCompTxtToRenameEvent)
  }
  const onConfirmReplaceClick = () => {
    send({ type: 'UPDATE_UNLINKED_DATA' } as PluginUnlinkedDataUpdateEvent)
  }

  //input fields

  const onSearchChange = () => { }

  const onNotationChange = () => {
    send({
      type: 'CHANGE_NOTATION',
    } as PluginNotationToggleEvent)
  }

  const onReplaceChange = (
    value: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    send({
      type: 'EDIT_PHRASES',
      inputValue: event.currentTarget.value,
    } as PluginInputTypingEvent)
  }

  const onElemHover: MouseEventHandler<
    HTMLButtonElement | HTMLInputElement
  > = event => {
    switch (event.currentTarget.id) {
      case HoverableElements.btnPrevComponent:
        break
      case HoverableElements.btnNextComponent:
        break
      case HoverableElements.inputChangeReplace:
        break
      case HoverableElements.inputCompName:
        break
      case HoverableElements.btnCompTxtToReplace:
        break
      case HoverableElements.btnExecReplace:
        setIsExecReplaceIconHovered(true)
        break
      case HoverableElements.btnToggleNotation:
        break
      case HoverableElements.btnClear:
        break
      default:
        return // function returns on any other DOM element id
    }
    send({ type: 'HOVER_UI_ELEM_ENTER', payload: event.currentTarget.id })
  }

  const onElemHoverLeave: MouseEventHandler<
    HTMLButtonElement | HTMLInputElement
  > = event => {
    if (isExecReplaceIconHovered) {
      setIsExecReplaceIconHovered(false)
    }
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
        placeholder={i18n.findAndSelect}
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
        iconComponent={execReplaceIcon}
        onClick={onConfirmReplaceClick}
        iconButtonProps={{
          onMouseOver: onElemHover,
          onMouseLeave: onElemHoverLeave,
          id: HoverableElements.btnExecReplace,
        }}
      />
      <Input
        placeholder={i18n.prepareNewName}
        onChange={onReplaceChange}
        icon="swap"
        iconComponent={<RenameIcon />}
        onMouseOver={onElemHover}
        onMouseLeave={onElemHoverLeave}
        value={renameValue}
        id={HoverableElements.inputChangeReplace}
      />
      <Icon
        name="alert"
        iconComponent={
          !isNotationDashed ? (
            <NotationSwitchDashesIcon />
          ) : (
            <NotationSwitchSlashesIcon />
          )
        }
        onClick={onNotationChange}
        iconButtonProps={{
          onMouseOver: onElemHover,
          onMouseLeave: onElemHoverLeave,
          id: HoverableElements.btnToggleNotation,
        }}
      />
    </div>
  )
}
