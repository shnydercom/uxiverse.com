import React from 'react'
import { FigmaSelectionList } from '../../communicationInterfaces'

export interface SelectionListProps {
    hostSelection: FigmaSelectionList;
}

function SelectionList(props: SelectionListProps) {
    const { hostSelection } = props

    return (
        <div className='hostcomp-list'>
            {
                hostSelection.map((itm) => {
                    return <div className='hostcomp-listentry'>
                        <div className="icon icon--spinner icon--spin"></div>
                        <div>{itm}</div>
                    </div>
                })
            }
        </div>
    )
}

export default SelectionList
