import React from 'react'
import { Input, InputWithIconProps } from 'react-figma-plugin-ds'
import { HostAppElement } from '../../communicationInterfaces'
import { hostAppElementTypeToClassName } from './selection-list'
import { CaretDownIcon } from "../../assets/caret-down-icon";

interface CompAutoCompleteProps {
    selectionFocus: HostAppElement | undefined;
    hostSelection: HostAppElement[]
}

const IconRenderer = (props: CompAutoCompleteProps) => {
    if (!props.selectionFocus) return null;
    return <div className={`${hostAppElementTypeToClassName(props.selectionFocus.type)}  icon-reposition`}></div>
}

export function CompAutocomplete(props: CompAutoCompleteProps & InputWithIconProps) {
    const { hostSelection, selectionFocus, children, ...remainingProps } = props

    const isIconForSelection: boolean = !!selectionFocus;

    remainingProps.icon = "search-large"
    if (isIconForSelection) {
        remainingProps.iconColor = "white" //same color as background
    }
    return (
        <div className='auto-complete'>
            <Input
                {...remainingProps}
            />
            {
                isIconForSelection && <IconRenderer selectionFocus={selectionFocus} hostSelection={[]} />
            }
            {hostSelection.length > 0 &&
                <div className="select-chevron">
                    <CaretDownIcon />
                </div>
            }
        </div>
    )
}
