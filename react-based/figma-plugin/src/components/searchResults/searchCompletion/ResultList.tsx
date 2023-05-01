import React, { MouseEventHandler, useContext } from 'react'
import { FunctionComponent } from 'react'
import { ResultListEntry } from './ResultListEntry'
import { GlobalStateContext } from '../../../browserlogic/state/globalStateProvider'
import { HoverUIElemEnterEvent, HoverDefinitionEnterEvent } from '../../../browserlogic/state/stateEvents'

export interface ResultListProps {
  typedValue: string
  recommendations: string[],
  iris: string[]
}

export const ResultList: FunctionComponent<ResultListProps> = ({
  typedValue,
  recommendations,
  iris
}) => {
  const globalServices = useContext(GlobalStateContext)
  const { send } = globalServices.mainService
  const onHoverSearchResult: MouseEventHandler<HTMLDivElement> = event => {
    send({
      type: 'HOVER_UI_ELEM_ENTER',
      payload: event.currentTarget.id,
    } as HoverUIElemEnterEvent)
    send({
      type: 'HOVER_DEFINITION_ENTER',
      focusedDefinition:
        event.currentTarget.attributes.getNamedItem('data-ld')?.value ?? '',
    } as HoverDefinitionEnterEvent)
  }

  const onElemHoverLeave: MouseEventHandler<HTMLDivElement> = event => {
    send('HOVER_UI_ELEM_EXIT')
    send('HOVER_DEFINITION_EXIT')
  }

  const onConfirmPhraseClick = (iri: string, displayFullValue: string) => {
    send({
      type: 'CONFIRM_PHRASE',
      displayFullValue,
      iri
    })
  }

  return (
    <div className="result-list">
      {recommendations.map((fullVal, idx) => {
        const iri = iris[idx];
        return (
          <ResultListEntry
            key={`rli-${idx}`}
            typedValue={typedValue}
            displayFullValue={fullVal}
            iri={iri}
            isFocused={false}
            onHoverSearchResult={onHoverSearchResult}
            onElemHoverLeave={onElemHoverLeave}
            onConfirmPhraseClick={onConfirmPhraseClick}
          />
        )
      })}
    </div>
  )
}
