import { DEFAULT_TOOLTIP } from '../components/TooltipBar'

export interface PluginState {
  tooltip: string
}

export enum HoverableElements {
  btnPrevComponent = 'btn-prev',
  btnNextComponent = 'btn-next',
  inputChangeReplace = 'input-replace',
  inputCompName = 'input-comp-name',
  btnCompTxtToReplace = 'bnt-comptxt-to-replace',
  btnExecReplace = 'btn-exec-replace',
  btnClear = 'btn-clear',
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
        case HoverableElements.inputChangeReplace:
          tooltip = 'new name for the element'
          break
        case HoverableElements.inputCompName:
          tooltip = 'search in canvas by name'
          break;
        case HoverableElements.btnCompTxtToReplace:
          tooltip = 'append original name'
          break;
        case HoverableElements.btnExecReplace:
          tooltip = 'replace name in canvas'
          break;
        case HoverableElements.btnClear:
          tooltip = 'clear new name'
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
