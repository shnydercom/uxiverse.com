
/*

XState events

*/

import { HostAppElement } from "../../communicationInterfaces"
import { HoverableElements } from "../../identifiable/HoverableElements"
import { AvailableNotations } from "../notation-handler"
import { RenamePartSemantic } from "./mainMachine"

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
    type: 'EDIT_PHRASES';
}


export interface PluginExplorationEvent {
    type: 'CHANGE_EXPLORATION'
    explorationValue: string
}

export interface PluginNotationToggleEvent {
    type: 'CHANGE_NOTATION'
}

export interface PluginShowTreeEvent {
    type: 'SHOW_TREE';
}
export interface PluginChangeSearchPhrasesEvent {
    type: 'CHANGE_SEARCH_PHRASES';
    inputValue: string;
    /**
     * for previously confirmed or half-finished phrases
     */
    confirmedRenameParts: RenamePartSemantic[];
    /**
     * the value at the cursor position which is used for searching
     */
    ontologySearchValue: string;
}

export interface PluginConfirmPhraseEvent {
    type: 'CONFIRM_PHRASE';
    iri: string;
    displayFullValue: string;
}

export interface PluginEmptySearchPhrasesEvent {
    type: 'EMPTY_SEARCH_PHRASE';
    inputValue: string;
    /**
     * for previously confirmed or half-finished phrases
     */
    confirmedRenameParts: RenamePartSemantic[];
    /**
     * the value at the cursor position which is used for searching
     */
    ontologySearchValue: string;
    /**
     * the iri to use as the base for the treeview
     */
    exploredIRI: string;
}

export interface PluginSelectPhraseEvent {
    type: 'SELECT_PHRASE'
    /**
     * the value that the input element currently has
     */
    inputValue: string | undefined;
    /**
     * start position of the cursor, can be same as end position
     */
    selectionStart: number;
    /**
     * end position of the cursor, can be same as start position
     */
    selectionEnd: number;
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
    | "DELETE_SECONDLAST_PHRASE"
    | "DELETE_MULTI_PHRASE"
    | "DRAG_PHRASE"
    | "IGNORE"
    | "DELETED_LAST_PHRASE"
    | "REORDER_PHRASES"
}

export type AllMainMachineStateEvents = HoverUIElemEnterEvent
    | HoverDefinitionEnterEvent
    | FocusSelectionEvent
    | PluginInputTypingEvent
    | PluginExplorationEvent
    | PluginNotationToggleEvent
    | PluginUnlinkedDataUpdateEvent
    | ToggleHostOptionsVisibilityEvent
    | CopyCompTxtToRenameEvent
    | HostAppSelectionEvent
    | HostFetchEvent
    | NoArgsEvents
    | PluginShowTreeEvent
    | PluginChangeSearchPhrasesEvent
    | PluginConfirmPhraseEvent
    | PluginChangeSearchPhrasesEvent
    | PluginEmptySearchPhrasesEvent
    | PluginSelectPhraseEvent;

