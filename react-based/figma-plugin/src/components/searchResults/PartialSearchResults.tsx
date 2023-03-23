import React, { MouseEventHandler, useContext } from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { PluginContext } from '../../browserlogic/context'
import { searchDefinitionNames } from '../../browserlogic/search'
import { PluginActionType } from '../../browserlogic/state'
import { SearchValueSelectorType } from '../../state/moreTypes'
import { useSelector } from '@xstate/react'
import { GlobalStateContext } from '../../state/globalStateProvider'

const ontologySearchValueSelector: SearchValueSelectorType | undefined = state => {
  return state.context.plugin.ontologySearch.searchValue
}

export const PartialSearchResults = () => {
  const globalServices = useContext(GlobalStateContext)
  const { send } = globalServices.mainService
  const ontologySearch = useSelector(
    globalServices.mainService,
    ontologySearchValueSelector
  )

  const { state, dispatch } = React.useContext(PluginContext)
  const [searchResult, setSearchResult] = React.useState<string[]>([])
  React.useEffect(() => {
    if (!ontologySearch) {
      setSearchResult([])
      return
    }
    const definitionNameResult = searchDefinitionNames(ontologySearch)
    setSearchResult(definitionNameResult)
    return () => {
      setSearchResult([])
    }
  }, [ontologySearch])


  const onHoverSearchResult: MouseEventHandler<
    HTMLDivElement
  > = (event) => {
    send({ type: 'HOVER_UI_ELEM_ENTER', payload: event.currentTarget.id })
    dispatch({
      type: PluginActionType.UsrHoverDefinition,
      payload: event.currentTarget.innerText ?? '',
    })
  }


  return (
    <div className="partial-search-results">
      <OverlayScrollbarsComponent
        style={{ flex: 1 }}
        options={{ scrollbars: { autoHide: 'never' } }}
      >
        <div className="partial-search-results--inner">
          {searchResult.map(sr => (
            <div className="found-term" onMouseEnter={onHoverSearchResult}>{sr}</div>
          ))}
        </div>
      </OverlayScrollbarsComponent>
    </div>
  )
}
