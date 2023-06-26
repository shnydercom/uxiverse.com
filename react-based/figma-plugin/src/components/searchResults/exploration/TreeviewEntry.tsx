import React, { useContext } from 'react'
import { FunctionComponent } from 'react'
import { ExploreIRI } from './../../../assets/explore-iri'
import { AddToReplaceValue } from './../../../assets/add-to-replacevalue'
import { GlobalStateContext } from '../../../browserlogic/state/globalStateProvider'
import {
  HoverDefinitionEnterEvent,
  PluginExplorationEvent,
} from '../../../browserlogic/state/stateEvents'
import { CopyIcon } from '../../../assets/copy-icon'
import { copyTextToClipboard } from '../../../browserlogic/copyTextToClipboard'
import { onMouseEnterExitHandlerFactory } from '../hoverHandlers'

export interface TreeviewEntryProps {
  displayFullValue: string
  iri: string
  isHighlighted?: boolean
}

export const TreeviewEntry: FunctionComponent<TreeviewEntryProps> = ({
  displayFullValue,
  isHighlighted,
  iri,
}) => {
  const globalServices = useContext(GlobalStateContext)
  const { send } = globalServices.mainService

  const exploreClick = () => {
    send({
      type: 'CHANGE_EXPLORATION',
      explorationValue: iri,
    } as PluginExplorationEvent)
  }
  const mouseEnterHandler = () => {
    send({
      type: 'HOVER_DEFINITION_ENTER',
      focusedDefinition: iri,
    } as HoverDefinitionEnterEvent)
  }
  const mouseLeaveHandler = () => {
    send('HOVER_DEFINITION_EXIT')
  }
  const copyButtonHandler = () => {
    copyTextToClipboard(displayFullValue)
  }
  const onConfirmPhraseClick = () => {
    send([
      { type: 'HIDE_PREVIEW' },
      {
        type: 'CONFIRM_PHRASE',
        displayFullValue,
        iri,
      },
    ])
  }

  const {
    onAddToInputMouseEnter,
    onCopyMouseEnter,
    onExploreMouseEnter,
    onMouseLeave,
  } = onMouseEnterExitHandlerFactory(send)

  return (
    <div
      className={`tree-entry ${isHighlighted ? 'highlight' : ''}`}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <button
        onClick={exploreClick}
        onMouseEnter={onExploreMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span className="full-value">{displayFullValue}</span>
        {/*<ExploreIRI className="button-icon" />*/}
      </button>
      <button
        onClick={onConfirmPhraseClick}
        onMouseEnter={() => onAddToInputMouseEnter(displayFullValue, iri)}
        onMouseLeave={onMouseLeave}
      >
        <AddToReplaceValue className="button-icon extra-icon" />
      </button>
      <button
        className="reordered-button"
        onClick={copyButtonHandler}
        onMouseEnter={onCopyMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <CopyIcon className="button-icon copy-icon" />
      </button>
    </div>
  )
}
