import React from 'react'

export const DEFAULT_TOOLTIP = 'tooltips are here'

export interface TooltipBarProps {
  text?: string
}

export function TooltipBar(props: TooltipBarProps) {
  let { text } = props
  if (!text) {
    text = DEFAULT_TOOLTIP;
  }
  return <div className="tooltip-bar">{text}</div>
}
