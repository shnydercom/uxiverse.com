import * as React from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { DefinitionSearchResult } from './searchResults/definitionSearchResult'

import { PartialSearchResults } from './searchResults/PartialSearchResults'
import { PreviewSearchResult } from './searchResults/PreviewSearchResult'

export const OntologyResults = () => {
  return (
    <div className="ontology-results">
      <OverlayScrollbarsComponent
        style={{ flex: 1 }}
        options={{ scrollbars: { autoHide: 'never' } }}
      >
        <PartialSearchResults />
        <PreviewSearchResult />
        <DefinitionSearchResult />
      </OverlayScrollbarsComponent>
    </div>
  )
}
