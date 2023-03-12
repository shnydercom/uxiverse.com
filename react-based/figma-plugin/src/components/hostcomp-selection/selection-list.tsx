import React from 'react'
import { HostAppElement } from '../../state/mainMachine';

export interface SelectionListProps {
	hostSelection: HostAppElement[];
}

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