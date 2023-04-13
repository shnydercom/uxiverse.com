import React, { useContext, useMemo } from 'react'
import { Input, InputWithIconProps } from 'react-figma-plugin-ds'
import { HostAppElement } from '../../communicationInterfaces'
import { hostAppElementTypeToClassName, SelectionList } from './selection-list'
import { CaretDownIcon } from '../../assets/caret-down-icon'
import { createPortal } from 'react-dom'
import { useSelector } from '@xstate/react'
import { IsOpenSelectorType } from '../../browserlogic/state/moreTypes'
import { GlobalStateContext } from '../../browserlogic/state/globalStateProvider'
import { ToggleHostOptionsVisibilityEvent } from '../../browserlogic/state/stateEvents'

interface HostAppElementSelection {
  selectionFocus: HostAppElement | undefined
}

interface CompAutoCompleteProps {
  hostSelection: HostAppElement[]
  onSelectionClick: (selection: HostAppElement) => void
}

const IconRenderer = (props: HostAppElementSelection) => {
  if (!props.selectionFocus) return null
  return (
    <div
      className={`${hostAppElementTypeToClassName(
        props.selectionFocus.type
      )}  icon-reposition`}
    ></div>
  )
}

const isOptionsOpenSelector: IsOpenSelectorType = state => {
  return state.context.plugin.hostAppSearch.isOptionsOpen
}


export function CompAutocomplete(
  props: CompAutoCompleteProps & HostAppElementSelection & InputWithIconProps
) {
  const {
    hostSelection,
    selectionFocus,
    children,
    value,
    onSelectionClick,
    ...remainingProps
  } = props
  const globalServices = useContext(GlobalStateContext)
  const { send } = globalServices.mainService

  const isOptionsOpen = useSelector(
    globalServices.mainService,
    isOptionsOpenSelector
  )
  const rootPortal = useMemo(
    () => document.getElementById('react-portal'),
    undefined
  )

  const manualCaretOpener:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = event => {
      send({ type: 'MANUALLY_TOGGLE_HOST_OPTIONS' } as ToggleHostOptionsVisibilityEvent)
    }

  const isIconForSelection: boolean =
    !!selectionFocus && value === selectionFocus.name

  remainingProps.icon = 'search-large'
  if (isIconForSelection) {
    //remainingProps.iconColor = 'white' //same color as background
    remainingProps.iconComponent = (
      <IconRenderer selectionFocus={selectionFocus} />
    )
  }
  return (
    <div className="auto-complete">
      <Input value={value ?? ''} {...remainingProps}>
        {hostSelection?.length > 0 && (
          <div className="select-chevron" onClick={manualCaretOpener}>
            <CaretDownIcon />
          </div>
        )}
      </Input>
      {rootPortal &&
        isOptionsOpen &&
        createPortal(
          <SelectionList
            onSelectionClick={onSelectionClick}
            hostSelection={hostSelection}
            selectionFocusedElement={selectionFocus}
          />,
          rootPortal
        )}
    </div>
  )
}
