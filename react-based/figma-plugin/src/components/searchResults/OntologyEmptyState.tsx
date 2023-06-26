import React from 'react'
import { getI18n } from '../../i18n'

const i18n = getI18n()

export const OntologyEmptyState = () => {
  return (
    <div className="empty-ontology">
      <p>{i18n.emptyOntologyIntro}</p>
    </div>
  )
}
