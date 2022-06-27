import React, { useContext } from 'react'
import { PluginContext } from '../browserlogic/context';

export const DEFAULT_TOOLTIP = 'tooltips are here'

export interface TooltipBarProps {
}

export function TooltipBar(props: TooltipBarProps) {
  const { state } = useContext(PluginContext)
  const text = state.tooltip;
  return <div className="tooltip-bar">{text}</div>
}
