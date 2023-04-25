import { useSelector } from '@xstate/react'
import React, { MouseEventHandler, useContext } from 'react'
import { SelectorType } from '../browserlogic/state/moreTypes'
import { GlobalStateContext } from '../browserlogic/state/globalStateProvider'
import { Icon } from 'react-figma-plugin-ds'
import { HoverableElements } from '../identifiable/HoverableElements'

const tooltipTextSelector: SelectorType = state => {
  return state.context.plugin.tooltip
}

export interface TooltipBarProps { }

export function TooltipBar(props: TooltipBarProps) {
  const globalServices = useContext(GlobalStateContext)
  const tooltipText = useSelector(globalServices.mainService, tooltipTextSelector)
  const { send } = globalServices.mainService
  const onDeleteClick = () => {
    send({ type: "TRIGGER_TRASH" })
  }
  const onElemHover: MouseEventHandler<
    HTMLButtonElement | HTMLInputElement
  > = event => {
    switch (event.currentTarget.id) {
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
    send('HOVER_UI_ELEM_EXIT')
  }
  return (
    <div className="tooltip-bar">
      <span>{tooltipText ?? ' '}</span>
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
