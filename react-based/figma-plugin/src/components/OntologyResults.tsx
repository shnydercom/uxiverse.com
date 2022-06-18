import * as React from 'react'
export interface OntologyResultsProps {
  searchResults: string[]
}

export const OntologyResults = (props: OntologyResultsProps) => {
  const { searchResults } = props
  return (
    <div className='ontology-results'>
      {searchResults.map(val => (
        <div>{val}</div>
      ))}
    </div>
  )
}
