import React, { useContext } from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { searchDefinitionNames } from '../../browserlogic/naming-recommendations/search'
import { useSelector } from '@xstate/react'
import {
  MainMachineSelectorArg,
} from '../../browserlogic/state/moreTypes'
import { GlobalStateContext } from '../../browserlogic/state/globalStateProvider'
import { OntologyEmptyState } from './OntologyEmptyState'
import { ResultList } from './searchCompletion/ResultList'
import { getWellKnownIriSubPath } from '../../browserlogic/naming-recommendations/IRIUtils'

const mainMachineSelector = (state: MainMachineSelectorArg) => {
  return {
    renameValue: state.context.plugin.renameValue,
    rtGraph: state.context.plugin.graph
  }
}

export const OntologyViewContainer = () => {
  //TODO: consume graph from online source
  const globalServices = useContext(GlobalStateContext)
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
              iris={searchResult}
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
