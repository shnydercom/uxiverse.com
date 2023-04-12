import { useSelector } from '@xstate/react'
import React, { useContext } from 'react'
import { GlobalStateContext } from '../../browserlogic/state/globalStateProvider'
import { SearchValueSelectorType } from '../../browserlogic/state/moreTypes'
import { getWellKnownIriSubPath } from '../../browserlogic/naming-recommendations/IRIUtils'

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
  let visualization: string = ''
  if (focusedDefinition) {
    try {
      visualization = String(
        require(`../../../assets/type-icons/${getWellKnownIriSubPath(
          focusedDefinition
        )}.svg`).default
      )
    } catch (error) {}
  }

  console.log(visualization)
  return (
    <div className={`iri-visualization ${!visualization && 'gone'}`}>
      <div className="iri-visualization--inner">
        <img src={visualization} alt="IRI visualization icon" />
      </div>
    </div>
  )
}
