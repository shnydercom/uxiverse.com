import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { MouseEventHandler, useCallback, useContext } from 'react'
import { HostAppElement, HostAppElementTypeEquivalents } from '../../communicationInterfaces';
import { GlobalStateContext } from '../../state/globalStateProvider';
import { FocusSelectionEvent } from '../../state/mainMachine';

export interface SelectionListProps {
	selectionFocusedElement: HostAppElement | undefined;
	hostSelection: HostAppElement[];
}

export function hostAppElementTypeToClassName(type: HostAppElementTypeEquivalents): string {
	let result: string;
	switch (type) {
		case "FRAME":
			result = "icon icon--frame"
			break;
		case "COMPONENT":
			result = "icon icon--component"
			break;
		case "INSTANCE":
			result = "icon icon--instance"
			break;
		case "MEDIA":
			result = "icon icon--image"
			break;
		case "GROUP":
			result = "icon icon--group"
			break;
		case "TEXT":
			result = "icon icon--text"
			break;
		case "RECTANGLE":
			result = "icon icon--rectangle"
			break;
		case "VECTOR":
			result = "icon icon--vector"
			break;
		default:
			result = "icon--" + type.toLowerCase()
			break;
	}
	return result
}

//icons classes can be found here: https://github.com/thomas-lowry/figma-plugin-ds#icon

export function SelectionList(props: SelectionListProps) {
	const { hostSelection, selectionFocusedElement } = props
	const globalServices = useContext(GlobalStateContext);
	const { send } = globalServices.mainService;
	const onListEntryClickFactory: (focusedElement: HostAppElement) => MouseEventHandler<
		HTMLDivElement
	> = useCallback((focusedElement) => event => {
		send({ type: "SELECT_FOCUS", focusedElement } as FocusSelectionEvent)
	}, [])
	if (hostSelection?.length <= 1 && !selectionFocusedElement) {
		return null;
	}
	return (<OverlayScrollbarsComponent
		className='hostcomp-list-scrollcontainer'
		style={{ flex: 1 }}
		options={{ scrollbars: { autoHide: 'leave' /* never || scroll || leave || move */ } }}
	>
		<div className='hostcomp-list'>
			{
				hostSelection.map((itm) => {
					return <div className='hostcomp-listentry' onClick={onListEntryClickFactory(itm)}>
						<div className={`${hostAppElementTypeToClassName(itm.type)}  icon-reposition`}></div>
						<div className="hostcomp-listentry-text">{itm.name}</div>
					</div>
				})
			}
		</div></OverlayScrollbarsComponent>
	)
}