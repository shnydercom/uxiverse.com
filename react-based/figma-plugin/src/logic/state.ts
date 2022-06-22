import { DEFAULT_TOOLTIP } from '../components/TooltipBar'

export interface PluginState {
  tooltip: string
}
const initialState: PluginState = {
  tooltip: DEFAULT_TOOLTIP,
}

export enum HoverableElements {
  btnPrevComponent,
  btnNextComponent,
}

export enum PluginActionType {
  UsrHover = 'UsrHover',
}

export interface UserHoverAction {
  type: PluginActionType.UsrHover
  payload: HoverableElements
}

export type PluginAction = UserHoverAction

const reducer: (state: PluginState, action: PluginAction) => PluginState = (
  state,
  action
) => {
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
        tooltip,
      }
    default:
      break
  }
  return state
}
