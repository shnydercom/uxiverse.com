import React from 'react'
import { FunctionComponent } from 'react'

interface ResultListEntryProps {
  typedValue: string
  displayFullValue: string
  isFocused: boolean
  onExploreClick?: () => void
  onAddStringClick?: () => void
}

export const ResultListEntry: FunctionComponent<ResultListEntryProps> = ({
  typedValue,
  displayFullValue,
  isFocused,
}) => {
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
    <div className="list-entry">
      <div className="explore"></div>
      {splitpart[0] && <span className="no-match">{startString}</span>}
      {<span className="match">{centerString}</span>}
      {splitpart[1] && <span className="no-match">{endString}</span>}
    </div>
  )
}
