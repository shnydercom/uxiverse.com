import React, { useEffect, useMemo, useState } from 'react'
import { Input, InputWithIconProps } from 'react-figma-plugin-ds'
import { HostAppElement } from '../../communicationInterfaces'
import { hostAppElementTypeToClassName, SelectionList } from './selection-list'
import { CaretDownIcon } from '../../assets/caret-down-icon'
import { createPortal } from 'react-dom'

interface HostAppElementSelection {
  selectionFocus: HostAppElement | undefined
}

interface CompAutoCompleteProps {
  hostSelection: HostAppElement[]
  isForcedOpen: boolean
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

export function CompAutocomplete(
  props: CompAutoCompleteProps & HostAppElementSelection & InputWithIconProps
) {
  const {
    hostSelection,
    selectionFocus,
    children,
    value,
    isForcedOpen,
    onSelectionClick,
    ...remainingProps
  } = props

  const rootPortal = useMemo(
    () => document.getElementById('react-portal'),
    undefined
  )

  const [isOpen, setIsOpen] = useState<boolean>(isForcedOpen)
  useEffect(() => {
    if (!isOpen && isForcedOpen) {
      setIsOpen(true)
    }
    //otherwise controlled by component state
    return () => {}
  }, [isForcedOpen])

  const manualCaretOpener:
    | React.MouseEventHandler<HTMLDivElement>
    | undefined = event => {
    if (!isForcedOpen) {
      setIsOpen(!isOpen)
    }
  }

  const onSelectionClickWrapper = (hostAppElement: HostAppElement) => {
    onSelectionClick(hostAppElement)
    setIsOpen(false)
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
        isOpen &&
        createPortal(
          <SelectionList
            onSelectionClick={onSelectionClickWrapper}
            hostSelection={hostSelection}
            selectionFocusedElement={selectionFocus}
          />,
          rootPortal
        )}
    </div>
  )
}
