import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React from 'react'
import { HostAppElement } from '../../communicationInterfaces';

export interface SelectionListProps {
	hostSelection: HostAppElement[];
}

//icons classes can be found here: https://github.com/thomas-lowry/figma-plugin-ds#icon

export function SelectionList(props: SelectionListProps) {
	const { hostSelection } = props

	return (<OverlayScrollbarsComponent
		style={{ flex: 1 }}
		options={{ scrollbars: { autoHide: 'leave' /* never || scroll || leave || move */ } }}
	>
		<div className='hostcomp-list'>
			{
				hostSelection.map((itm) => {
					return <div className='hostcomp-listentry'>
						<div className="icon icon--spinner icon--spin"></div>
						<div>{JSON.stringify(itm)}</div>
					</div>
				})
			}
		</div></OverlayScrollbarsComponent>
	)
}