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
import { match } from "ts-pattern"
import { TreeView } from './exploration/TreeView'

enum ContainerVisuals {
  initialRunEmptyView = "initial",
  resultListView = "resultlist",
  treeView = "treeview"
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
      () => { result.containerVisuals = ContainerVisuals.treeView })
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
            return <ScrollBarWrapper><ResultList
              typedValue={renameValue!}
              recommendations={shortenedTerms}
              iris={searchResult}
            /></ScrollBarWrapper>
          }
        ).otherwise(
          () => {
            return <ScrollBarWrapper>{/*<TreeView node={{}} />*/}</ScrollBarWrapper>
          })
      }
    </div>
  )
}
