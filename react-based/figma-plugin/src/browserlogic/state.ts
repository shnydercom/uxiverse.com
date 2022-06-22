import { DEFAULT_TOOLTIP } from '../components/TooltipBar'

export interface PluginState {
  tooltip: string
}

export enum HoverableElements {
  btnPrevComponent,
  btnNextComponent,
  inputChangeReplace,
}

export enum PluginActionType {
  UsrHover = 'UsrHover',
  UsrChangeReplaceInput = 'UsrChangeReplaceInput',
}

export interface UserHoverAction {
  type: PluginActionType.UsrHover
  payload: HoverableElements
}

export interface UserChangeReplaceAction {
  type: PluginActionType.UsrChangeReplaceInput
  payload: string
}

export type PluginAction = UserHoverAction | UserChangeReplaceAction

export const initialState: PluginState = {
  tooltip: DEFAULT_TOOLTIP,
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
      }
      return {
        ...state,
        tooltip,
      }
    default:
      break
  }
  return state
}
