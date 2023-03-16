import React, { MouseEventHandler, useCallback, useContext, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Icon, Input } from 'react-figma-plugin-ds'
import { PluginContext } from '../browserlogic/context'
import { PluginActionType } from '../browserlogic/state'
import { HoverableElements } from '../identifiable/HoverableElements'
import { GlobalStateContext } from '../state/globalStateProvider'
import { FocusSelectorType, HostSelectorType, StateMatchSelectorType } from '../state/moreTypes'
import { useSelector } from '@xstate/react';
import { SelectionList } from './hostcomp-selection/selection-list'

const hostSelectionSelector: HostSelectorType =
  (state) => {
    return state.context.host.userSelection;
  };
const selectionFocusedSelector: FocusSelectorType | undefined =
  (state) => {
    return state.context.host.selectionFocusedElement;
  };

const rawMultiSelectionSelector: StateMatchSelectorType = (state) => {
  return state.matches("hostSelectionState.rawMultiSelection")
}

const navArrowsDisabledSelector: StateMatchSelectorType = (state) => {
  if (state.matches("hostSelectionState.rawSingleSelection") ||
    state.matches("hostSelectionState.noSelection")) {
    return true;
  }
  if (state.matches("hostSelectionState.rawMultiSelection") && state.context.host.selectionFocusedElement) {
    return true;
  }
  return false;
}

export const FindAndReplace = () => {
  const globalServices = useContext(GlobalStateContext);
  const hostSelection = useSelector(globalServices.mainService, hostSelectionSelector);
  const selectionFocus = useSelector(globalServices.mainService, selectionFocusedSelector);
  const isHostSelectionMultiAndRaw = useSelector(globalServices.mainService, rawMultiSelectionSelector);
  const isNavArrowsDisabled = useSelector(globalServices.mainService, navArrowsDisabledSelector)

  const { send } = globalServices.mainService;

  const { dispatch } = useContext(PluginContext)

  const onPreviousClick = useCallback(() => { console.log("bla") }, [])
  const onNextClick = useCallback(() => { }, [])
  const onOverwriteReplaceClick = useCallback(() => { }, [])
  const onConfirmReplaceClick = useCallback(() => { }, [])
  const onDeleteClick = useCallback(() => { }, [])

  //input fields

  const onSearchChange = useCallback(() => { }, [])

  const onReplaceChange = useCallback(
    (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: PluginActionType.UsrChangeReplaceInput,
        payload: value,
      })
    },
    []
  )
  const rootPortal = useMemo(() => document.getElementById("react-portal"), undefined)
  const onElemHover: MouseEventHandler<
    HTMLButtonElement | HTMLInputElement
  > = useCallback(event => {
    switch (event.currentTarget.id) {
      case HoverableElements.btnPrevComponent:
      case HoverableElements.btnNextComponent:
      case HoverableElements.inputChangeReplace:
      case HoverableElements.inputCompName:
      case HoverableElements.btnCompTxtToReplace:
      case HoverableElements.btnExecReplace:
      case HoverableElements.btnClear:
        send({ type: "HOVER_UI_ELEM_ENTER", payload: event.currentTarget.id })
      default:
        break
    }
  }, [])

  const onElemHoverLeave: MouseEventHandler<
    HTMLButtonElement | HTMLInputElement
  > = useCallback(event => {
    send("HOVER_UI_ELEM_EXIT")
  }, [])
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
      />{rootPortal && isHostSelectionMultiAndRaw && createPortal(
        <SelectionList hostSelection={hostSelection} selectionFocusedElement={selectionFocus} />,
        rootPortal
      )}
      <Input
        placeholder="Find element"
        onChange={onSearchChange}
        icon="search-large"
        onMouseOver={onElemHover}
        onMouseLeave={onElemHoverLeave}
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
