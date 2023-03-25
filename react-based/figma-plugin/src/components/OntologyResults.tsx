import * as React from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { DefinitionSearchResult } from './searchResults/definitionSearchResult'

import { PartialSearchResults } from './searchResults/PartialSearchResults'
import { SearchResultVisualization } from './searchResults/SearchResultVisualization'

export const OntologyResults = () => {
  return (
    <div className="ontology-results">
      <OverlayScrollbarsComponent
        style={{ flex: 1 }}
        options={{ scrollbars: { autoHide: 'never' } }}
      >
        <PartialSearchResults />
        <DefinitionSearchResult />
      </OverlayScrollbarsComponent>
    </div>
  )
}
