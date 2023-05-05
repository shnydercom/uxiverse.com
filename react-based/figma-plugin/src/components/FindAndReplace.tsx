import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Icon, Input } from 'react-figma-plugin-ds'
import { HoverableElements } from '../identifiable/HoverableElements'
import { useActor, useSelector } from '@xstate/react'
import { P, match } from 'ts-pattern'
import { CompAutocomplete } from './hostcomp-selection/comp-autocomplete'
import { HostAppElement } from '../communicationInterfaces'
import { MainMachineSelectorArg } from '../browserlogic/state/moreTypes'
import { GlobalStateContext } from '../browserlogic/state/globalStateProvider'
import {
  FocusSelectionEvent,
  PluginNotationToggleEvent,
  PluginUnlinkedDataUpdateEvent,
} from '../browserlogic/state/stateEvents'
import { RenameIcon } from '../assets/Rename'
import { PostRenameIcon } from '../assets/post-rename-icon'
import { PreRenameIcon } from '../assets/pre-rename-icon'
import { NotationSwitchDashesIcon } from '../assets/notation-switch-dashes'
import { NotationSwitchSlashesIcon } from '../assets/notation-switch-slashes'
import { getI18n } from '../i18n'
import { AvailableNotations } from '../browserlogic/notation-handler'
import { NotationSwitchCommaEqualsIcon } from '../assets/notation-switch-comma-equals'
import {
  onOverwriteReplaceClickFactory,
  onReplaceChangeFactory,
  onSelectionChangeFactory,
} from './onReplaceChangeFactory'
import { RenamePartSemantic } from '../browserlogic/state/mainMachine'

const i18n = getI18n()

const findFocusPosition = (rpss: RenamePartSemantic[]): number => {
  const rps = [...rpss].reverse().find(val => val.relativeCursorPos !== -1)
  if (!rps) {
    return -1
  }
  return rps.relativeCursorPos + rps.lexerStartEnd.start
}

const mainMachineSelector = (state: MainMachineSelectorArg) => {
  //declaration only
  let hostSelection: HostAppElement[]
  let selectionFocus: HostAppElement | undefined
  let componentSearchValue: string | undefined
  let isNavArrowsDisabled: boolean
  let isRenameBtnDisabled: boolean
  let renameValue: string | undefined
  let notation: AvailableNotations
  let replaceInputRefocusPosition: number
  //assigning
  hostSelection = state.context.host.userSelection
  selectionFocus = state.context.host.selectionFocusedElement
  componentSearchValue = state.context.plugin.hostAppSearch.searchValue
  renameValue = state.context.plugin.renameValue
  isNavArrowsDisabled = match(state)
    .when(
      state =>
        state.matches('hostSelection.singleRaw') ||
        state.matches('hostSelection.empty'),
      () => {
        return true
      }
    )
    .when(
      state =>
        state.matches('hostSelection.multi.raw') &&
        state.context.host.selectionFocusedElement,
      () => {
        return true
      }
    )
    .otherwise(() => {
      return false
    })
  isRenameBtnDisabled = !selectionFocus
  notation = match(state)
    .when(
      state => state.matches('notation.spacedDashes'),
      () => {
        return AvailableNotations.SpacedDashes
      }
    )
    .when(
      state => state.matches('notation.spacedSlashes'),
      () => {
        return AvailableNotations.SpacedSlashes
      }
    )
    .when(
      state => state.matches('notation.spacedCommaEquals'),
      () => {
        return AvailableNotations.SpacedCommaEquals
      }
    )
    .otherwise(() => {
      console.error('unknown state for notation')
      return AvailableNotations.SpacedCommaEquals
    })
  if (state.transitions.length > 0) {
    replaceInputRefocusPosition = match(state.transitions[0])
      .with({ eventType: 'CONFIRM_PHRASE' }, () =>
        findFocusPosition(
          state.context.plugin.ontologySearch.confirmedRenameParts
        )
      )
      .with({ eventType: 'CHANGE_EXPLORATION' }, () =>
        findFocusPosition(
          state.context.plugin.ontologySearch.confirmedRenameParts
        )
      )
      .with({ eventType: 'CHANGE_SEARCH_PHRASES' }, () =>
        findFocusPosition(
          state.context.plugin.ontologySearch.confirmedRenameParts
        )
      )
      .with({ eventType: 'EMPTY_SEARCH_PHRASE' }, () =>
        findFocusPosition(
          state.context.plugin.ontologySearch.confirmedRenameParts
        )
      )
      .with({ eventType: 'SELECT_EMPTY_PHRASE' }, () =>
        findFocusPosition(
          state.context.plugin.ontologySearch.confirmedRenameParts
        )
      )
      .otherwise(sel => {
        //console.log('otherwise: ' + sel.eventType)
        return -1
      })
  } else {
    //console.log('else')
    replaceInputRefocusPosition = -1
  }
  return {
    hostSelection,
    selectionFocus,
    componentSearchValue,
    isNavArrowsDisabled,
    isRenameBtnDisabled,
    renameValue,
    notation,
    replaceInputRefocusPosition,
  }
}

export const FindAndReplace = () => {
  const globalServices = useContext(GlobalStateContext)
  const {
    hostSelection,
    selectionFocus,
    componentSearchValue,
    isNavArrowsDisabled,
    isRenameBtnDisabled,
    renameValue,
    notation,
    replaceInputRefocusPosition,
  } = useSelector(globalServices.mainService, mainMachineSelector)

  const { send } = globalServices.mainService
  const [state] = useActor(globalServices.mainService)

  const replaceInputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    // handles clicks outside the input element
    if (
      replaceInputRefocusPosition !== -1 &&
      replaceInputRef.current &&
      document.activeElement !== replaceInputRef.current //checks if input doesn't have focus
    ) {
      replaceInputRef.current.setSelectionRange(
        replaceInputRefocusPosition,
        replaceInputRefocusPosition
      )
      replaceInputRef.current.focus()
      return
    }
    //handles selection-events while typing (not losing focus) after programmatic focus and value change
    if (
      replaceInputRefocusPosition !== -1 &&
      replaceInputRef.current &&
      document.activeElement === replaceInputRef.current &&
      [
        //'CONFIRM_PHRASE',
        //'CHANGE_EXPLORATION',
        //'CHANGE_SEARCH_PHRASES',
        'EMPTY_SEARCH_PHRASE',
        'SELECT_EMPTY_PHRASE',
        'SELECT_PHRASE',
      ].includes(state.transitions[0].eventType)
    ) {
      replaceInputRef.current.setSelectionRange(
        replaceInputRefocusPosition,
        replaceInputRefocusPosition
      )
      replaceInputRef.current.focus()
      return
    }
  }, [replaceInputRefocusPosition])
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
  const onOverwriteReplaceClick = onOverwriteReplaceClickFactory(
    notation,
    send,
    state
  )
  const onConfirmReplaceClick = () => {
    send({ type: 'UPDATE_UNLINKED_DATA' } as PluginUnlinkedDataUpdateEvent)
  }

  //input fields

  const onSearchChange = () => {}

  const onNotationChange = () => {
    send({
      type: 'CHANGE_NOTATION',
    } as PluginNotationToggleEvent)
  }

  const onFocusChange: React.FocusEventHandler<HTMLInputElement> = event => {
    if (state.matches('phraseRecommendations.initialEmpty')) {
      send({
        type: 'SHOW_TREE',
      })
      return
    }
  }

  const onElemHover: MouseEventHandler<
    HTMLButtonElement | HTMLInputElement
  > = event => {
    match(event.currentTarget.id)
      .when(
        id => {
          return [
            HoverableElements.btnPrevComponent,
            HoverableElements.btnNextComponent,
            HoverableElements.inputChangeReplace,
            HoverableElements.inputCompName,
            HoverableElements.btnCompTxtToReplace,
            HoverableElements.btnToggleNotation,
            HoverableElements.btnClear,
          ].includes((id as unknown) as HoverableElements)
        },
        (id: HoverableElements) => {
          send({ type: 'HOVER_UI_ELEM_ENTER', payload: id })
        }
      )
      .with(HoverableElements.btnExecReplace, id => {
        setIsExecReplaceIconHovered(true)
        send({ type: 'HOVER_UI_ELEM_ENTER', payload: id })
      })
      .run()
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
        spellCheck="false"
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
        onClick={() => {
          onOverwriteReplaceClick(componentSearchValue)
        }}
        iconButtonProps={{
          onMouseOver: onElemHover,
          onMouseLeave: onElemHoverLeave,
          id: HoverableElements.btnCompTxtToReplace,
        }}
      />

      <Icon
        name="play"
        isDisabled={isRenameBtnDisabled}
        iconComponent={execReplaceIcon}
        onClick={onConfirmReplaceClick}
        iconButtonProps={{
          onMouseOver: onElemHover,
          onMouseLeave: onElemHoverLeave,
          id: HoverableElements.btnExecReplace,
        }}
      />
      <Input
        ref={replaceInputRef}
        placeholder={i18n.prepareNewName}
        onFocus={onFocusChange}
        onChange={onReplaceChangeFactory(notation, send, state)}
        onSelect={onSelectionChangeFactory(notation, send, state)}
        icon="swap"
        iconComponent={<RenameIcon />}
        onMouseOver={onElemHover}
        onMouseLeave={onElemHoverLeave}
        value={renameValue}
        id={HoverableElements.inputChangeReplace}
        spellCheck="false"
      />
      <Icon
        name="alert"
        iconComponent={match(notation)
          .with(AvailableNotations.SpacedDashes, () => (
            <NotationSwitchDashesIcon />
          ))
          .with(AvailableNotations.SpacedSlashes, () => (
            <NotationSwitchSlashesIcon />
          ))
          .with(AvailableNotations.SpacedCommaEquals, () => (
            <NotationSwitchCommaEqualsIcon />
          ))
          .exhaustive()}
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
