import { useSelector } from '@xstate/react'
import React, { useContext } from 'react'
import { GlobalStateContext } from '../../browserlogic/state/globalStateProvider'
import { SearchValueSelectorType } from '../../browserlogic/state/moreTypes'

const focusedDefinitionSelector:
  | SearchValueSelectorType
  | undefined = state => {
  return state.context.plugin.ontologySearch.focusedDefinition
}

export const SingleIRIVisualization = () => {
  const globalServices = useContext(GlobalStateContext)
  const focusedDefinition = useSelector(
    globalServices.mainService,
    focusedDefinitionSelector
  )
  const visualization = focusedDefinition //TODO: add Icons
  return (
    <div className="iri-visualization">
      <div className="iri-visualization--inner">{visualization}</div>
    </div>
  )
}
