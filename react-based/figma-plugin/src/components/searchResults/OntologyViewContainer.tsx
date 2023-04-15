import React, { useContext, useState } from 'react'
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
import { match } from "ts-pattern"
import { LineageTreeview } from './exploration/LineageTreeview'
import { ExplorationResult, getLineage } from '../../browserlogic/naming-recommendations/exploration'
import { uxiverseRootIRI } from '../../browserlogic/naming-recommendations/ontology-globals'

enum ContainerVisuals {
  initialRunEmptyView = "initial",
  resultListView = "resultlist",
  exploration = "exploration"
}

const mainMachineSelector = (state: MainMachineSelectorArg) => {
  let result = {
    containerVisuals: ContainerVisuals.initialRunEmptyView,
    renameValue: state.context.plugin.renameValue,
    rtGraph: state.context.plugin.graph
  }
  match(state)
    .when(
      (state) => (state.matches("multiPhraseState.filledMultiPhrases.singlePhrase")
        && !state.context.plugin.renameValue),
      () => { result.containerVisuals = ContainerVisuals.exploration })
    .when(
      (state) => (state.matches("multiPhraseState.filledMultiPhrases.singlePhrase")
        && (state.context.plugin.renameValue?.length ?? 0) > 0),
      () => { result.containerVisuals = ContainerVisuals.resultListView })
    .otherwise(() => {
      result.containerVisuals = ContainerVisuals.initialRunEmptyView
    })
  return result
}

const ScrollBarWrapper = ({ children }) => {
  return <OverlayScrollbarsComponent
    style={{ flex: 1 }}
    options={{ scrollbars: { autoHide: 'never' } }}
  >
    <div className="ontology-view-container--inner">
      {children}
    </div>
  </OverlayScrollbarsComponent>
}

export const OntologyViewContainer = () => {
  //TODO: consume graph from online source
  const globalServices = useContext(GlobalStateContext)
  const { rtGraph, renameValue, containerVisuals } = useSelector(globalServices.mainService, mainMachineSelector)

  const [searchResult, setSearchResult] = React.useState<string[]>([])
  const [explorationResult, setExplorationResult] = React.useState<ExplorationResult>(
    {
      lineage: { iris: [], descendants: [] },
      edges: {}
    })
  React.useEffect(() => {
    if (containerVisuals !== ContainerVisuals.resultListView) {
      return;
    }
    if (!renameValue || !rtGraph) {
      setSearchResult([])
      return
    }
    const definitionNameResult = searchDefinitionNames(renameValue, rtGraph)

    setSearchResult(definitionNameResult)
    return () => {
      setSearchResult([])
    }
  }, [containerVisuals, renameValue]);
  React.useEffect(() => {
    if (containerVisuals !== ContainerVisuals.exploration) {
      return;
    }
    if (!rtGraph) {
      return;
    }
    const lineage = getLineage(rtGraph, uxiverseRootIRI + "AtomUIElement", false);
    console.log(lineage);
    if (!lineage) {
      return;
    }
    setExplorationResult({
      ...explorationResult,
      lineage
    })
  }, [containerVisuals, renameValue]);

  const shortenedTerms = searchResult.map(value =>
    getWellKnownIriSubPath(value)
  )

  return (
    <div className="ontology-view-container">
      {match(containerVisuals).when(
        (val) => (val === ContainerVisuals.initialRunEmptyView),
        () => {
          return <OntologyEmptyState />
        }).when(
          (val) => ((val === ContainerVisuals.resultListView) && renameValue),
          () => {
            return <ScrollBarWrapper>
              <ResultList
                typedValue={renameValue!}
                recommendations={shortenedTerms}
                iris={searchResult}
              />
            </ScrollBarWrapper>
          }
        ).otherwise(
          () => {
            return <ScrollBarWrapper>
              <div className='exploration'>
                <LineageTreeview exploration={explorationResult} />
                {/* <SectionListView /> */}
              </div>
            </ScrollBarWrapper>
          })
      }
    </div>
  )
}
