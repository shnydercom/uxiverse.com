import { useSelector } from '@xstate/react';
import React, { useContext } from 'react'
import { PluginContext } from '../browserlogic/context';
import { GlobalStateContext } from '../state/globalStateProvider';
import { SelectorType } from '../state/moreTypes';

const loggedInSelector: SelectorType =
  (state) => {
    console.log(state);
    return state.matches('tooltipState');
  };

export interface TooltipBarProps {
}

export function TooltipBar(props: TooltipBarProps) {
  const globalServices = useContext(GlobalStateContext);
  const isLoggedIn = useSelector(globalServices.mainService, loggedInSelector);
  const { state } = useContext(PluginContext)
  const text = state.tooltip;
  return <div className="tooltip-bar">{text}</div>
}
