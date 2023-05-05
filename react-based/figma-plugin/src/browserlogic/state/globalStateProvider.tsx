import { InterpreterFrom } from 'xstate'
import { useInterpret } from '@xstate/react'
import React, { createContext } from 'react'
import { mainMachine } from './mainMachine'

export const GlobalStateContext = createContext({
  mainService: {} as InterpreterFrom<typeof mainMachine>,
})

export const GlobalStateProvider = props => {
  const mainService = useInterpret(mainMachine)
  mainService.onTransition(state => {
    //console.log(state.toStrings())
    //console.log(JSON.stringify(state.transitions))
    /*console.log(
      JSON.stringify(state.context.plugin.ontologySearch.confirmedRenameParts)
    )*/
  })
  return (
    <GlobalStateContext.Provider value={{ mainService }}>
      {props.children}
    </GlobalStateContext.Provider>
  )
}
