import * as React from 'react'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { SingleIRIFullView } from './searchResults/SingleIRIFullView'

import { OntologyViewContainer } from './searchResults/OntologyViewContainer'

export const OntologyResults = () => {
  return (
    <div className="ontology-results">
      <OverlayScrollbarsComponent
        style={{ flex: 1 }}
        options={{ scrollbars: { autoHide: 'never' } }}
      >
        <OntologyViewContainer />
        <SingleIRIFullView />
      </OverlayScrollbarsComponent>
    </div>
  )
}
