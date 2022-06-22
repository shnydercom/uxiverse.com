import React from 'react'
import { initialState, PluginAction, PluginState } from './state'

export const PluginContext = React.createContext<{
  state: PluginState
  dispatch: React.Dispatch<PluginAction>
}>({
  state: initialState,
  dispatch: () => undefined,
})
