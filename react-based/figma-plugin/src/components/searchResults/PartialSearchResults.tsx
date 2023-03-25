import React, { MouseEventHandler, useContext } from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { searchDefinitionNames } from '../../browserlogic/search'
import { SearchValueSelectorType } from '../../state/moreTypes'
import { useSelector } from '@xstate/react'
import { GlobalStateContext } from '../../state/globalStateProvider'
import { HoverDefinitionEnterEvent, HoverUIElemEnterEvent } from '../../state/mainMachine'

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
    send({ type: 'HOVER_UI_ELEM_ENTER', payload: event.currentTarget.id } as HoverUIElemEnterEvent)
    send({ type: 'HOVER_DEFINITION_ENTER', focusedDefinition: event.currentTarget.innerText ?? '' } as HoverDefinitionEnterEvent)
  }

  const onElemHoverLeave: MouseEventHandler<
    HTMLDivElement
  > = (event) => {
    send('HOVER_UI_ELEM_EXIT')
    send('HOVER_DEFINITION_EXIT')
  }

  return (
    <div className="partial-search-results">
      <OverlayScrollbarsComponent
        style={{ flex: 1 }}
        options={{ scrollbars: { autoHide: 'never' } }}
      >
        <div className="partial-search-results--inner">
          {searchResult.map(sr => (
            <div className="found-term" onMouseEnter={onHoverSearchResult} onMouseLeave={onElemHoverLeave}>{sr}</div>
          ))}
        </div>
      </OverlayScrollbarsComponent>
    </div>
  )
}
