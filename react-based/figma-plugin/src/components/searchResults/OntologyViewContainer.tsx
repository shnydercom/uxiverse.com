import React, { useContext, useRef, useState } from 'react'
import { OverlayScrollbarsComponent, useOverlayScrollbars } from 'overlayscrollbars-react'
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
import { ExplorationResult, getCategorizedEdges, getLineage } from '../../browserlogic/naming-recommendations/exploration'
import { uxiverseRootIRI } from '../../browserlogic/naming-recommendations/ontology-globals'
import CategorizedEdgesList from './exploration/CategorizedEdgesList'

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
    style={{ flex: 1, overflowX: 'scroll', overflowY: "hidden" }}
    options={{ scrollbars: { autoHide: 'never', } }}
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
      lineageHighlightIRI: uxiverseRootIRI + "Button",
      lineage: { iris: [], descendants: [] },
      catEdges: { categories: {}, straightLineage: [] }
    })

  const treeviewScrollContainerRef = useRef<HTMLDivElement>(null);

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
    const explorationHighlight = explorationResult.lineageHighlightIRI
    const lineage = getLineage(rtGraph, explorationHighlight, false);
    const catEdges = getCategorizedEdges(rtGraph, explorationHighlight, false);
    console.log(lineage);
    console.log(catEdges)
    if (!lineage || !catEdges) {
      return;
    }
    //formatting for view
    catEdges.straightLineage = catEdges.straightLineage.reverse();
    setExplorationResult({
      ...explorationResult,
      lineageHighlightIRI: explorationHighlight,
      lineage,
      catEdges
    })
  }, [containerVisuals, renameValue]);

  const [initialize, instance] = useOverlayScrollbars({
    options: {
      overflow: {
        x: 'visible',
        y: 'scroll'
      }, scrollbars: { autoHide: 'never', }
    }
    , defer: true,
    events: {
      initialized(instance) {
        console.log("initialized")
        const { viewport } = instance.elements();
        const treeHighlightElement = viewport.getElementsByClassName("tree-entry highlight")?.item(0);
        if (!treeHighlightElement) {
          return;
        }
        treeHighlightElement.scrollIntoView({ behavior: "auto", block: "center", inline: "end" }); // set scroll offset
      },
      updated(instance, onUpdatedArgs) {
        console.log("updated")
        const { viewport } = instance.elements();
        const treeHighlightElement = viewport.getElementsByClassName("tree-entry highlight")?.item(0);
        if (!treeHighlightElement) {
          return;
        }
        treeHighlightElement.scrollIntoView({ behavior: "auto", block: "center", inline: "end" }); // set scroll offset
      },
    }
  })

  React.useEffect(() => {
    if (treeviewScrollContainerRef.current) {
      initialize(treeviewScrollContainerRef.current);
    }
  }, [initialize, treeviewScrollContainerRef.current]);

  const shortenedTerms = searchResult.map(value =>
    getWellKnownIriSubPath(value)
  )

  return (
    <>
      {match(containerVisuals).when(
        (val) => (val === ContainerVisuals.initialRunEmptyView),
        () => {
          return <OntologyEmptyState />
        }).when(
          (val) => ((val === ContainerVisuals.resultListView) && renameValue),
          () => {
            return <div className="ontology-search-container">
              <ScrollBarWrapper>
                <ResultList
                  typedValue={renameValue!}
                  recommendations={shortenedTerms}
                  iris={searchResult}
                />
              </ScrollBarWrapper>
            </div>
          }
        ).otherwise(
          () => {
            return <OverlayScrollbarsComponent
              className='ontology-nav-container'
              style={{ flex: 1, height: "inherit" }}
              options={{
                overflow: {
                  x: 'scroll',
                  y: 'visible'
                }, scrollbars: { autoHide: 'never', }
              }}
            >
              <div className='exploration'>
                <div ref={treeviewScrollContainerRef}
                  style={{ flex: 1, height: "88px", minWidth: "fit-content" }}
                >
                  <LineageTreeview exploration={explorationResult} />
                </div >
                <OverlayScrollbarsComponent
                  style={{ flex: 1, height: "88px", minWidth: "fit-content" }}
                  options={{
                    overflow: {
                      x: 'visible',
                      y: 'scroll'
                    },
                    scrollbars: { autoHide: "never" }
                  }}
                >
                  <CategorizedEdgesList categorizedEdges={explorationResult.catEdges} />
                </OverlayScrollbarsComponent>
              </div>
            </OverlayScrollbarsComponent>
          })
      }
    </>
  )
}
