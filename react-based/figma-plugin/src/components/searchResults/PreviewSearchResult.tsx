import React from 'react'
import { PluginContext } from '../../browserlogic/context'

export const PreviewSearchResult = () => {
  const { state } = React.useContext(PluginContext)
  const [preview, setPreview] = React.useState('')
  React.useEffect(() => {
    if (!state.hoveredDefinition) {
      setPreview('')
      return
    }
    setPreview(state.hoveredDefinition ?? '')
    return () => {
      setPreview('')
    }
  }, [state.hoveredDefinition])
  return (
    <div className="preview-search-result">
      <div className="preview-search-result--inner">{preview}</div>
    </div>
  )
}
