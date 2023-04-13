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
  MainMachineSelectorArg,
  SearchValueSelectorType,
} from '../../browserlogic/state/moreTypes'
import { GlobalStateContext } from '../../browserlogic/state/globalStateProvider'
import { OntologyEmptyState } from './OntologyEmptyState'
import { ResultList } from './searchCompletion/ResultList'
import { getWellKnownIriSubPath } from '../../browserlogic/naming-recommendations/IRIUtils'

const mainMachineSelector = (state: MainMachineSelectorArg) => {
  const isSinglePhrase = state.value;
  console.log("state value")
  console.log(isSinglePhrase)
  return {
    renameValue: state.context.plugin.renameValue,
    rtGraph: state.context.plugin.graph
  }
}

export const OntologyViewContainer = () => {
  //TODO: consume graph from online source
  const globalServices = useContext(GlobalStateContext)
  const { send } = globalServices.mainService
  const { rtGraph, renameValue } = useSelector(globalServices.mainService, mainMachineSelector)

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

  /*
  const leftTerms = searchResult.filter(
    val =>
      val.substring(uxiverseRootIRI.length)[0].toUpperCase() ===
      val.substring(uxiverseRootIRI.length)[0]
  )
  const rightTerms = searchResult.filter(
    val =>
      val.substring(uxiverseRootIRI.length)[0].toUpperCase() !==
      val.substring(uxiverseRootIRI.length)[0]
  )*/

  const shortenedTerms = searchResult.map(value =>
    getWellKnownIriSubPath(value)
  )

  return (
    <div className="ontology-view-container">
      {!renameValue ? (
        <OntologyEmptyState />
      ) : (
        <OverlayScrollbarsComponent
          style={{ flex: 1 }}
          options={{ scrollbars: { autoHide: 'never' } }}
        >
          <div className="ontology-view-container--inner">
            <ResultList
              typedValue={renameValue}
              recommendations={shortenedTerms}
            />
            {/* <div className="found-term-list">
              {leftTerms.map((sr, idx) => (
                <div
                  key={idx}
                  onMouseEnter={onHoverSearchResult}
                  onMouseLeave={onElemHoverLeave}
                  data-ld={sr}
                >
                  {sr.substring(uxiverseRootIRI.length)}
                </div>
              ))}
            </div>
            <div className="found-term-list">
              {rightTerms.map((sr, idx) => (
                <div
                  key={idx}
                  onMouseEnter={onHoverSearchResult}
                  onMouseLeave={onElemHoverLeave}
                  data-ld={sr}
                >
                  {sr.substring(uxiverseRootIRI.length)}
                </div>
              ))}
            </div>*/}
          </div>
        </OverlayScrollbarsComponent>
      )}
    </div>
  )
}
