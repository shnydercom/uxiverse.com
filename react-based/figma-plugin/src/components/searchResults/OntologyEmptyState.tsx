import React from 'react'
import { getI18n } from '../../i18n'

const i18n = getI18n()

export const OntologyEmptyState = () => {
  return (
    <div className="empty-ontology">
      <p>{i18n.emptyOntologyIntro}</p>
      <p className="left-aligned">{i18n.emptyClassOntology}</p>
      <p className="right-aligned">{i18n.emptyPropertiesOntology}</p>
    </div>
  )
}
