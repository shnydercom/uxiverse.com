import React, { MouseEventHandler, useContext } from 'react'
import { FunctionComponent } from 'react'
import { ResultListEntry } from './ResultListEntry'
import { GlobalStateContext } from '../../../browserlogic/state/globalStateProvider'
import {
  HoverDefinitionEnterEvent,
} from '../../../browserlogic/state/stateEvents'
import { onMouseEnterExitHandlerFactory } from '../hoverHandlers'

export interface ResultListProps {
  typedValue: string
  recommendations: string[]
  iris: string[]
}

export const ResultList: FunctionComponent<ResultListProps> = ({
  typedValue,
  recommendations,
  iris,
}) => {
  const globalServices = useContext(GlobalStateContext)
  const { send } = globalServices.mainService
  const onHoverSearchResult: MouseEventHandler<HTMLDivElement> = event => {
    send({
      type: 'HOVER_DEFINITION_ENTER',
      focusedDefinition:
        event.currentTarget.attributes.getNamedItem('data-ld')?.value ?? '',
    } as HoverDefinitionEnterEvent)
  }

  const onElemHoverLeave: MouseEventHandler<HTMLDivElement> = event => {
    send('HOVER_DEFINITION_EXIT')
  }

  const onConfirmPhraseClick = (iri: string, displayFullValue: string) => {
    send({
      type: 'CONFIRM_PHRASE',
      displayFullValue,
      iri,
    })
  }

  const onExploreClick = (iri: string) => {
    send({ type: 'CHANGE_EXPLORATION', explorationValue: iri })
  }

  const mouseEnterExitHandlers = onMouseEnterExitHandlerFactory(send)

  return (
    <div className="result-list">
      {recommendations.map((fullVal, idx) => {
        const iri = iris[idx]
        return (
          <ResultListEntry
            {...mouseEnterExitHandlers}
            key={`rli-${idx}`}
            typedValue={typedValue}
            displayFullValue={fullVal}
            iri={iri}
            isFocused={false}
            onHoverSearchResult={onHoverSearchResult}
            onElemHoverLeave={onElemHoverLeave}
            onConfirmPhraseClick={onConfirmPhraseClick}
            onExploreClick={onExploreClick}
          />
        )
      })}
    </div>
  )
}
