import React, { MouseEventHandler, useContext } from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { searchDefinitionNames } from '../../browserlogic/naming-recommendations/search'
import { useSelector } from '@xstate/react'
import {
  HoverDefinitionEnterEvent,
  HoverUIElemEnterEvent,
} from '../../browserlogic/state/mainMachine'
import { SearchValueSelectorType } from '../../browserlogic/state/moreTypes'
import { GlobalStateContext } from '../../browserlogic/state/globalStateProvider'
import { OntologyEmptyState } from './OntologyEmptyState'

const renameValueSelector: SearchValueSelectorType | undefined = state => {
  return state.context.plugin.renameValue
}

export const PartialSearchResults = () => {
  const globalServices = useContext(GlobalStateContext)
  const { send } = globalServices.mainService
  const renameValue = useSelector(
    globalServices.mainService,
    renameValueSelector
  )

  const [searchResult, setSearchResult] = React.useState<string[]>([])
  React.useEffect(() => {
    if (!renameValue) {
      setSearchResult([])
      return
    }
    const definitionNameResult = searchDefinitionNames(renameValue)
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
      focusedDefinition: event.currentTarget.innerText ?? '',
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
            {searchResult.map(sr => (
              <div
                className="found-term"
                onMouseEnter={onHoverSearchResult}
                onMouseLeave={onElemHoverLeave}
              >
                {sr}
              </div>
            ))}
          </div>
        </OverlayScrollbarsComponent>
      )}
    </div>
  )
}
