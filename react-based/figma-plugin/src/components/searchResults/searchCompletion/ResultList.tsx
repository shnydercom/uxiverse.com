import React from 'react'
import { FunctionComponent } from 'react'
import { ResultListEntry } from './ResultListEntry'

export interface ResultListProps {
  typedValue: string
  recommendations: string[]
}

export const ResultList: FunctionComponent<ResultListProps> = ({
  typedValue,
  recommendations,
}) => {
  return (
    <div className="result-list">
      {recommendations.map((fullVal, idx) => {
        return (
          <ResultListEntry
            key={`rli-${idx}`}
            typedValue={typedValue}
            displayFullValue={fullVal}
            isFocused={false}
          />
        )
      })}
    </div>
  )
}
