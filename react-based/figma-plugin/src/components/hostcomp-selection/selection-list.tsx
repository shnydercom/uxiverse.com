import React from 'react'
import { HostAppElement } from '../../state/mainMachine';

export interface SelectionListProps {
	hostSelection: HostAppElement[];
}

//icons classes can be found here: https://github.com/thomas-lowry/figma-plugin-ds#icon

export function SelectionList(props: SelectionListProps) {
	const { hostSelection } = props

	return (
		<div className='hostcomp-list'>
			{
				hostSelection.map((itm) => {
					return <div className='hostcomp-listentry'>
						<div className="icon icon--spinner icon--spin"></div>
						<div>{JSON.stringify(itm)}</div>
					</div>
				})
			}
		</div>
	)
}