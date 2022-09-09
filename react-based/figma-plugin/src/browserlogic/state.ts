import { HoverableElements } from "../identifiable/HoverableElements"

const DEFAULT_TOOLTIP = "to be deprecated"
export interface PluginState {
  tooltip: string
  searchValue: string | undefined
  confirmedRenameParts: string[]
  hoveredDefinition: string | undefined
}

export enum PluginActionType {
  UsrHover = 'UsrHover',
  UsrChangeReplaceInput = 'UsrChangeReplaceInput',
  UsrConfirmRenamePart = 'UsrConfirmRenamePart',
  UsrHoverDefinition = 'UsrHoverDefinition',
}

export interface UserHoverAction {
  type: PluginActionType.UsrHover
  payload: HoverableElements
}

export interface UserChangeReplaceAction {
  type: PluginActionType.UsrChangeReplaceInput
  payload: string
}

export interface UserConfirmRenamePartAction {
  type: PluginActionType.UsrConfirmRenamePart
  payload: string
}

export interface UserHoverDefinitionAction {
  type: PluginActionType.UsrHoverDefinition
  payload: string
}

export type PluginAction =
  | UserHoverAction
  | UserChangeReplaceAction
  | UserConfirmRenamePartAction
  | UserHoverDefinitionAction

export const initialState: PluginState = {
  tooltip: DEFAULT_TOOLTIP,
  searchValue: undefined,
  confirmedRenameParts: [],
  hoveredDefinition: undefined,
}

export const pluginReducer: (
  state: PluginState,
  action: PluginAction
) => PluginState = (state, action) => {
  switch (action.type) {
    case PluginActionType.UsrHover:
      let tooltip = DEFAULT_TOOLTIP
      switch (action.payload) {
        case HoverableElements.btnPrevComponent:
          tooltip = 'select previous'
          break
        case HoverableElements.btnNextComponent:
          tooltip = 'select next'
          break
        case HoverableElements.inputChangeReplace:
          tooltip = 'new name for the element'
          break
        case HoverableElements.inputCompName:
          tooltip = 'search in canvas by name'
          break
        case HoverableElements.btnCompTxtToReplace:
          tooltip = 'append original name'
          break
        case HoverableElements.btnExecReplace:
          tooltip = 'replace name in canvas'
          break
        case HoverableElements.btnClear:
          tooltip = 'clear new name'
          break
      }
      return {
        ...state,
        tooltip,
      }
    case PluginActionType.UsrChangeReplaceInput:
      return {
        ...state,
        searchValue: action.payload,
      }
    case PluginActionType.UsrConfirmRenamePart:
      const confirmedRenameParts = [
        ...state.confirmedRenameParts,
        action.payload,
      ]
      return {
        ...state,
        confirmedRenameParts,
      }
    case PluginActionType.UsrHoverDefinition:
      return {
        ...state,
        hoveredDefinition: action.payload,
      }
    default:
      break
  }
  return state
}
