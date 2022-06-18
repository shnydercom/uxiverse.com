import { useCallback, useState } from 'react'
import * as React from 'react'
import { FindAndReplace } from './components/FindAndReplace'
import { OntologyResults } from './components/OntologyResults'
import { searchDefinitionNames } from './logic/search'

export const PluginMainLayout = () => {
  //state
  const [searchResult, setSearchResult] = useState<string[]>([])
  //interaction handlers
  const onPreviousClick = useCallback(() => {}, [])
  const onNextClick = useCallback(() => {}, [])
  const onSearchChange = useCallback(() => {}, [])
  const onReplaceChange = useCallback((inputValue) => {
    setSearchResult(searchDefinitionNames(inputValue))
  }, [])
  const onDeleteClick = useCallback(() => {}, [])
  const onConfirmReplaceClick = useCallback(() => {}, [])

  return (
    <div className='main-layout'>
      <FindAndReplace
        onPreviousClick={onPreviousClick}
        onNextClick={onNextClick}
        onSearchChange={onSearchChange}
        onReplaceChange={onReplaceChange}
        onDeleteClick={onDeleteClick}
        onConfirmReplaceClick={onConfirmReplaceClick}
      /> 
      <OntologyResults searchResults={searchResult} />
    </div>
  )
}
