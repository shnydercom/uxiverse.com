import React from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { PluginContext } from '../../browserlogic/context'
import { searchDefinitionNames } from '../../browserlogic/search'
import { PluginActionType } from '../../browserlogic/state'

export const PartialSearchResults = () => {
  const { state, dispatch } = React.useContext(PluginContext)
  const [searchResult, setSearchResult] = React.useState<string[]>([])
  React.useEffect(() => {
    if (!state.searchValue) {
      setSearchResult([])
      return
    }
    const definitionNameResult = searchDefinitionNames(state.searchValue)
    setSearchResult(definitionNameResult)
    return () => {
      setSearchResult([])
    }
  }, [state.searchValue])

  const onHoverSearchResult = React.useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(event => {
    dispatch({
      type: PluginActionType.UsrHoverDefinition,
      payload: event.currentTarget.innerText ?? '',
    })
  }, [])
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
