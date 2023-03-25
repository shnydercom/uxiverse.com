import { useSelector } from '@xstate/react';
import React, { useContext } from 'react'
import { SelectorType } from '../browserlogic/state/moreTypes';
import { GlobalStateContext } from '../browserlogic/state/globalStateProvider';

const loggedInSelector: SelectorType =
  (state) => {
    return state.context.plugin.tooltip;
  };

export interface TooltipBarProps {
}

export function TooltipBar(props: TooltipBarProps) {
  const globalServices = useContext(GlobalStateContext);
  const tooltipText = useSelector(globalServices.mainService, loggedInSelector);
  return <div className="tooltip-bar">{tooltipText ?? " "}</div>
}
