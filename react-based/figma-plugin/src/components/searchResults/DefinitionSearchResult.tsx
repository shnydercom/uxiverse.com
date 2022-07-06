import React from 'react'
import { PluginContext } from '../../browserlogic/context'
import { getSingleUxiDefinition } from '../../browserlogic/search'

export const DefinitionSearchResult = () => {
  const { state } = React.useContext(PluginContext)
  const [fullText, setFullText] = React.useState('')
  React.useEffect(() => {
    if (!state.hoveredDefinition) {
      setFullText('')
      return
    }
    const hoveredDefinition = getSingleUxiDefinition(state.hoveredDefinition)
    setFullText(hoveredDefinition ?? '')
    return () => {
      setFullText('')
    }
  }, [state.hoveredDefinition])
  return (
    <div className="full-search-result">
      <div className="full-search-result--inner">{fullText}</div>
    </div>
  )
}
