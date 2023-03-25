import { useSelector } from '@xstate/react'
import React, { useContext } from 'react'
import { GlobalStateContext } from '../../state/globalStateProvider'
import { SearchValueSelectorType } from '../../state/moreTypes'
import { SearchResultVisualization } from './SearchResultVisualization'

const defintionFullTextSelector: SearchValueSelectorType | undefined = state => {
  return state.context.plugin.ontologySearch.fullText
}

export const DefinitionSearchResult = () => {
  const globalServices = useContext(GlobalStateContext)
  const defintionFullText = useSelector(
    globalServices.mainService,
    defintionFullTextSelector
  )
  return (
    <div className="full-search-result">
      <div className="full-search-result--inner">
        <SearchResultVisualization />
        {defintionFullText}
      </div>
    </div>
  )
}
