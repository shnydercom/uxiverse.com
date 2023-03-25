import React from 'react'
import { PluginContext } from '../../browserlogic/context'

export const SearchResultVisualization = () => {
  const { state } = React.useContext(PluginContext)
  const [visualization, setvisualization] = React.useState('')
  React.useEffect(() => {
    if (!state.hoveredDefinition) {
      setvisualization('')
      return
    }
    setvisualization(state.hoveredDefinition ?? '')
    return () => {
      setvisualization('')
    }
  }, [state.hoveredDefinition])
  return (
    <div className="search-result-visualization">
      <div className="search-result-visualization--inner">{visualization}</div>
    </div>
  )
}
