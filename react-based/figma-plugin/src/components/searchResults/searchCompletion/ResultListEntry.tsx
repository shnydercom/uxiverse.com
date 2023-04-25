import React, { MouseEventHandler } from 'react'
import { FunctionComponent } from 'react'
import { ExploreIRI } from '../../../assets/explore-iri'
import { CopyIcon } from '../../../assets/copy-icon'
import { AddToReplaceValue } from '../../../assets/add-to-replacevalue'
import { copyTextToClipboard } from '../../../browserlogic/copyTextToClipboard'

interface ResultListEntryProps {
  typedValue: string;
  displayFullValue: string;
  iri: string;
  isFocused: boolean;
  onHoverSearchResult: MouseEventHandler<HTMLDivElement>
  onElemHoverLeave: MouseEventHandler<HTMLDivElement>
}

export const ResultListEntry: FunctionComponent<ResultListEntryProps> = ({
  typedValue,
  displayFullValue,
  isFocused,
  iri,
  onHoverSearchResult,
  onElemHoverLeave
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
      <button>
        {splitpart[0] && <span className="no-match">{startString}</span>}
        {<span className="match">{centerString}</span>}
        {splitpart[1] && <span className="no-match">{endString}</span>}
        <AddToReplaceValue className='button-icon' />
      </button>
      <button>
        <ExploreIRI className="button-icon explore-icon" />
      </button>
      <button className='reordered-button' onClick={copyButtonHandler}>
        <CopyIcon className="button-icon copy-icon" />
      </button>
    </div>
  )
}
