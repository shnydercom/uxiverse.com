
/*

XState events

*/

import { HostAppElement } from "../../communicationInterfaces"
import { HoverableElements } from "../../identifiable/HoverableElements"
import { AvailableNotations } from "../notation-handler"

export interface HoverUIElemEnterEvent {
    type: 'HOVER_UI_ELEM_ENTER'
    payload: HoverableElements
}

export interface HoverDefinitionEnterEvent {
    type: 'HOVER_DEFINITION_ENTER'
    focusedDefinition: string
}

export interface FocusSelectionEvent {
    type: 'SELECT_FOCUS'
    focusedElement: HostAppElement
}

export interface PluginInputTypingEvent {
    type: 'EDIT_PHRASES'
    inputValue: string | undefined
}

export interface PluginNotationToggleEvent {
    type: 'CHANGE_NOTATION'
}

export interface PluginUnlinkedDataUpdateEvent {
    type: 'UPDATE_UNLINKED_DATA'
}

export interface ToggleHostOptionsVisibilityEvent {
    type: 'MANUALLY_TOGGLE_HOST_OPTIONS'
}

export interface CopyCompTxtToRenameEvent {
    type: 'COPY_COMPTXT_TO_RENAMEREPLACE'
    copiedText: string
    targetNotation: AvailableNotations
}

export interface HostAppSelectionEvent {
    type:
    | 'HOST_INTERACTION_SELECT_MULTI'
    | 'HOST_INTERACTION_SELECT_SINGLE'
    | 'HOST_DESELECT'
    | 'HOST_SELECTION_UNAVAILABE'
    userSelection: HostAppElement[]
    focusedElement: HostAppElement | undefined
}

export interface HostFetchEvent {
    type: 'HOST_FETCH_SUCCESSFUL'
    result: object
}

export interface NoArgsEvents {
    type: "HOVER_DEFINITION_EXIT"
    | "CREATE_LINKED_DATA"
    | "REMOVE_LINKED_DATA"
    | "UPDATE_LINKED_DATA"
    | "HOVER_UI_ELEM_EXIT"
    | "TRIGGER_TRASH"
    | "DELETE_LAST_PHRASE"
    | "ADD_PHRASES"
    | "ADD_UNCONFIRMED_PHRASE"
    | "CONFIRM_PHRASE"
    | "DELETE_SECONDLAST_PHRASE"
    | "DELETE_MULTI_PHRASE"
    | "DRAG_PHRASE"
    | "IGNORE"
    | "DELETED_LAST_PHRASE"
    | "REORDER_PHRASES"
}

export type AllMainMachineStateEvents = HoverUIElemEnterEvent | HoverDefinitionEnterEvent | FocusSelectionEvent | PluginInputTypingEvent | PluginNotationToggleEvent | PluginUnlinkedDataUpdateEvent | ToggleHostOptionsVisibilityEvent | CopyCompTxtToRenameEvent | HostAppSelectionEvent | HostFetchEvent | NoArgsEvents; 