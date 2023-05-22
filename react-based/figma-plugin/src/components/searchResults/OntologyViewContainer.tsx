import React, { useContext, useRef } from 'react'
import { OverlayScrollbarsComponent, useOverlayScrollbars } from 'overlayscrollbars-react'
import { useSelector } from '@xstate/react'
import {
  MainMachineSelectorArg,
} from '../../browserlogic/state/moreTypes'
import { GlobalStateContext } from '../../browserlogic/state/globalStateProvider'
import { OntologyEmptyState } from './OntologyEmptyState'
import { ResultList } from './searchCompletion/ResultList'
import { match } from "ts-pattern"
import { LineageTreeview } from './exploration/LineageTreeview'
import { CategorizedEdgesList } from './exploration/CategorizedEdgesList'
import { CategorizedEdges, ExplorationResult, featureFlags, getCategorizedEdgesForClasses, getCategorizedEdgesForPropertyCanBeOfType, getCategorizedEdgesForPropertyCanExistOnType, getLineage, getWellKnownIriSubPath, searchDefinitionNames } from '@uxiverse.com/jsonld-tools'
import { getI18n } from '../../i18n'

enum ContainerVisuals {
  initialRunEmptyView = "initial",
  resultListView = "resultlist",
  exploration = "exploration"
}

const i18n = getI18n();

const mainMachineSelector = (state: MainMachineSelectorArg) => {
  let result = {
    containerVisuals: ContainerVisuals.initialRunEmptyView,
    ontologySearchValue: state.context.plugin.ontologySearch.ontologySearchValue,
    rtGraph: state.context.plugin.graph,
    exploredIRI: state.context.plugin.ontologySearch.exploredIRI,
    isPropSearch: state.context.plugin.ontologySearch.isPropSearch
  }
  match(state)
    .when(
      (state) => (state.matches("phraseRecommendations.treeAndEdgesView")
        /*&& !state.context.plugin.ontologySearch.ontologySearchValue*/),
      () => { result.containerVisuals = ContainerVisuals.exploration })
    .when(
      (state) => (state.matches("phraseRecommendations.autoCompleteView")
        && (state.context.plugin.ontologySearch.ontologySearchValue?.length ?? 0) > 0),
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
  const { rtGraph, ontologySearchValue, containerVisuals, exploredIRI, isPropSearch } = useSelector(globalServices.mainService, mainMachineSelector)

  const [searchResult, setSearchResult] = React.useState<string[]>([])
  const [explorationResult, setExplorationResult] = React.useState<ExplorationResult>(
    {
      lineageHighlightIRI: exploredIRI,
      lineage: { iris: [], descendants: [] },
      catEdges: { categories: {}, straightLineage: [] },
      otherCatEdges: null
    })

  const treeviewScrollContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerVisuals !== ContainerVisuals.resultListView) {
      return;
    }
    if (!ontologySearchValue || !rtGraph) {
      setSearchResult([])
      return
    }
    const definitionNameResult = searchDefinitionNames(ontologySearchValue, rtGraph)

    setSearchResult(definitionNameResult)
    return () => {
      setSearchResult([])
    }
  }, [containerVisuals, ontologySearchValue]);
  React.useEffect(() => {
    if (containerVisuals !== ContainerVisuals.exploration) {
      return;
    }
    if (!rtGraph) {
      return;
    }
    const explorationHighlight = exploredIRI;
    const lineage = getLineage(rtGraph, explorationHighlight, isPropSearch, featureFlags);
    let catEdges, otherCatEdges: CategorizedEdges | null = null;
    if (!isPropSearch) {
      catEdges = getCategorizedEdgesForClasses(rtGraph, explorationHighlight);
      otherCatEdges = null;
    } else {
      catEdges = getCategorizedEdgesForPropertyCanExistOnType(rtGraph, explorationHighlight);
      otherCatEdges = getCategorizedEdgesForPropertyCanBeOfType(rtGraph, explorationHighlight);
    }
    if (!lineage || !catEdges) {
      return;
    }
    //formatting for view
    catEdges.straightLineage = catEdges.straightLineage.reverse();
    setExplorationResult({
      ...explorationResult,
      lineageHighlightIRI: explorationHighlight,
      lineage,
      catEdges,
      otherCatEdges
    })
  }, [containerVisuals, exploredIRI]);

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
        const { viewport } = instance.elements();
        const treeHighlightElement = viewport.getElementsByClassName("tree-entry highlight")?.item(0);
        if (!treeHighlightElement) {
          return;
        }
        treeHighlightElement.scrollIntoView({ behavior: "auto", block: "center", inline: "end" }); // set scroll offset
      },
      updated(instance, onUpdatedArgs) {
        const { viewport } = instance.elements();
        const treeHighlightElement = viewport.getElementsByClassName("tree-entry highlight")?.item(0);
        if (!treeHighlightElement) {
          return;
        }
        treeHighlightElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "end" }); // set scroll offset
      },
    }
  })

  React.useEffect(() => {
    if (treeviewScrollContainerRef.current) {
      initialize(treeviewScrollContainerRef.current);
    }
    return () => instance()?.destroy();
  }, [initialize, treeviewScrollContainerRef.current]);

  const shortenedTerms = searchResult.map(value =>
    getWellKnownIriSubPath(value)
  )

  let catEdgesWrapFn: undefined | ((propName: string) => string) = undefined;
  let otherCatEdgesWrapFn: undefined | ((propName: string) => string) = undefined;
  if (isPropSearch) {
    catEdgesWrapFn = i18n.fn_propCanExistOnTypeStr;
    otherCatEdgesWrapFn = i18n.fn_propIsOfTypeStr;
  } else {
    catEdgesWrapFn = i18n.fn_classHasProps
  }

  return (
    <>
      {match(containerVisuals).when(
        (val) => (val === ContainerVisuals.initialRunEmptyView),
        () => {
          return <OntologyEmptyState />
        }).when(
          (val) => ((val === ContainerVisuals.resultListView) && ontologySearchValue),
          () => {
            return <div className="ontology-search-container">
              <ScrollBarWrapper>
                <ResultList
                  typedValue={ontologySearchValue!}
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
              style={{ flex: 1, height: "128px" }}
              options={{
                overflow: {
                  x: 'scroll',
                  y: 'hidden'
                }, scrollbars: { autoHide: 'never', }
              }}
            >
              <div className='exploration'>
                <div ref={treeviewScrollContainerRef}
                  style={{ flex: 1, height: "128px", minWidth: "fit-content" }}
                >
                  <LineageTreeview exploration={explorationResult} />
                </div >
                <OverlayScrollbarsComponent
                  style={{ flex: 1, height: "128px", minWidth: "fit-content" }}
                  options={{
                    overflow: {
                      x: 'visible',
                      y: 'scroll'
                    },
                    scrollbars: { autoHide: "never" }
                  }}
                >
                  {explorationResult.catEdges
                    && <CategorizedEdgesList
                      categorizedEdges={explorationResult.catEdges}
                      wrapCategoryFn={catEdgesWrapFn}
                    />}
                  {explorationResult.otherCatEdges
                    && <CategorizedEdgesList categorizedEdges={explorationResult.otherCatEdges}
                      wrapCategoryFn={otherCatEdgesWrapFn} />}
                </OverlayScrollbarsComponent>
              </div>
            </OverlayScrollbarsComponent>
          })
      }
    </>
  )
}
