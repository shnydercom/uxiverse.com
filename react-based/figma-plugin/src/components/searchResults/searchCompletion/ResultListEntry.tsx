import React, { MouseEventHandler } from 'react'
import { FunctionComponent } from 'react'
import { ExploreIRI } from '../../../assets/explore-iri'
import { CopyIcon } from '../../../assets/copy-icon'
import { AddToReplaceValue } from '../../../assets/add-to-replacevalue'
import { copyTextToClipboard } from '../../../browserlogic/copyTextToClipboard'
import { MouseEnterExitHandlers } from '../hoverHandlers'

interface ResultListEntryProps extends MouseEnterExitHandlers {
  typedValue: string;
  displayFullValue: string;
  iri: string;
  isFocused: boolean;
  onHoverSearchResult: MouseEventHandler<HTMLDivElement>
  onElemHoverLeave: MouseEventHandler<HTMLDivElement>
  onConfirmPhraseClick: (iri: string, displayFullValue: string) => void;
  onExploreClick: (iri: string) => void;
}

export const ResultListEntry: FunctionComponent<ResultListEntryProps> = ({
  typedValue,
  displayFullValue,
  isFocused,
  iri,
  onHoverSearchResult,
  onElemHoverLeave,
  onConfirmPhraseClick,
  onExploreClick,
  onAddToInputMouseEnter,
  onCopyMouseEnter,
  onExploreMouseEnter,
  onMouseLeave
}) => {
  const copyButtonHandler = () => {
    copyTextToClipboard(displayFullValue);
  }
  const splitpart = displayFullValue
    .toLowerCase()
    .split(typedValue.toLowerCase())

  const startString = displayFullValue.substring(0, splitpart[0].length)
  const centerString = displayFullValue.substring(
    splitpart[0].length,
    splitpart[0].length + typedValue.length
  )
  const endString = displayFullValue.substring(
    splitpart[0].length + typedValue.length
  )
  return (
    <div className="list-entry" data-ld={iri} onMouseEnter={onHoverSearchResult} onMouseLeave={onElemHoverLeave}>
      <button onClick={() => onExploreClick(iri)} onMouseEnter={onExploreMouseEnter} onMouseLeave={onMouseLeave}>
        {splitpart[0] && <span className="no-match">{startString}</span>}
        {<span className="match">{centerString}</span>}
        {splitpart[1] && <span className="no-match">{endString}</span>}
        {/*<ExploreIRI className="button-icon" />*/}
      </button>
      <button onClick={() => onConfirmPhraseClick(iri, displayFullValue)} onMouseEnter={onAddToInputMouseEnter} onMouseLeave={onMouseLeave}>
        <AddToReplaceValue className='button-icon extra-icon' />
      </button>
      <button className='reordered-button' onClick={copyButtonHandler} onMouseEnter={onCopyMouseEnter} onMouseLeave={onMouseLeave}>
        <CopyIcon className="button-icon copy-icon" />
      </button>
    </div>
  )
}
