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
  let visualizationDataURL: string | undefined = ''
  if (focusedDefinition) {
    try {
      visualizationDataURL = String(
        require(`../../../assets/type-icons/${getWellKnownIriSubPath(
          focusedDefinition
        )}.svg`).default
      )
    } catch (error) {
      visualizationDataURL = undefined
    }
  }
  const classNameAddition = !visualizationDataURL && 'gone'
  return (
    <div className={`iri-visualization ${classNameAddition}`}>
      <div className="iri-visualization--inner">
        <img src={visualizationDataURL} alt="IRI visualization icon" />
      </div>
    </div>
  )
}
