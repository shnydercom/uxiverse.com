import { useSelector } from '@xstate/react'
import React, { useContext } from 'react'
import { GlobalStateContext } from '../../browserlogic/state/globalStateProvider'
import { SearchValueSelectorType } from '../../browserlogic/state/moreTypes'
import { SingleIRIVisualization } from './SingleIRIVisualization'

const defintionFullTextSelector:
  | SearchValueSelectorType
  | undefined = state => {
  return state.context.plugin.ontologySearch.fullText
}

export const SingleIRIFullView = () => {
  const globalServices = useContext(GlobalStateContext)
  const defintionFullText = useSelector(
    globalServices.mainService,
    defintionFullTextSelector
  )
  return (
    <div className="single-iri-full-view">
      <div className="single-iri-full-view--inner">
        <SingleIRIVisualization />
        {defintionFullText}
      </div>
    </div>
  )
}
