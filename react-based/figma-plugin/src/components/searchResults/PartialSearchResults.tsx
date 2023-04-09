import React, { MouseEventHandler, useContext } from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { searchDefinitionNames } from '../../browserlogic/naming-recommendations/search'
import { useSelector } from '@xstate/react'
import {
  HoverDefinitionEnterEvent,
  HoverUIElemEnterEvent,
} from '../../browserlogic/state/mainMachine'
import {
  GraphSelectorType,
  SearchValueSelectorType,
} from '../../browserlogic/state/moreTypes'
import { GlobalStateContext } from '../../browserlogic/state/globalStateProvider'
import { OntologyEmptyState } from './OntologyEmptyState'
import { uxiverseRootIRI } from '../../browserlogic/naming-recommendations/ontology-globals'

const renameValueSelector: SearchValueSelectorType | undefined = state => {
  return state.context.plugin.renameValue
}

const graphSelector: GraphSelectorType | undefined = state => {
  return state.context.plugin.graph
}

export const PartialSearchResults = () => {
  //TODO: consume graph from online source
  const globalServices = useContext(GlobalStateContext)
  const { send } = globalServices.mainService
  const renameValue = useSelector(
    globalServices.mainService,
    renameValueSelector
  )
  const rtGraph = useSelector(globalServices.mainService, graphSelector)

  const [searchResult, setSearchResult] = React.useState<string[]>([])
  React.useEffect(() => {
    if (!renameValue || !rtGraph) {
      setSearchResult([])
      return
    }
    const definitionNameResult = searchDefinitionNames(renameValue, rtGraph)

    setSearchResult(definitionNameResult)
    return () => {
      setSearchResult([])
    }
  }, [renameValue])

  const onHoverSearchResult: MouseEventHandler<HTMLDivElement> = event => {
    send({
      type: 'HOVER_UI_ELEM_ENTER',
      payload: event.currentTarget.id,
    } as HoverUIElemEnterEvent)
    console.log(event.currentTarget)
    send({
      type: 'HOVER_DEFINITION_ENTER',
      focusedDefinition:
        event.currentTarget.attributes.getNamedItem('data-ld')?.value ?? '',
    } as HoverDefinitionEnterEvent)
  }

  const onElemHoverLeave: MouseEventHandler<HTMLDivElement> = event => {
    send('HOVER_UI_ELEM_EXIT')
    send('HOVER_DEFINITION_EXIT')
  }

  return (
    <div className="partial-search-results">
      {!renameValue ? (
        <OntologyEmptyState />
      ) : (
        <OverlayScrollbarsComponent
          style={{ flex: 1 }}
          options={{ scrollbars: { autoHide: 'never' } }}
        >
          <div className="partial-search-results--inner">
            {searchResult.map((sr, idx) => (
              <div
                key={idx}
                className="found-term"
                onMouseEnter={onHoverSearchResult}
                onMouseLeave={onElemHoverLeave}
                data-ld={sr}
              >
                {sr.substring(uxiverseRootIRI.length)}
              </div>
            ))}
          </div>
        </OverlayScrollbarsComponent>
      )}
    </div>
  )
}
