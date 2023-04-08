import React, { createContext, useEffect, useState } from 'react'
import {
  createGraph,
  createEmptyGraph,
  RtLdGraph,
} from '@uxiverse.com/jsonld-tools'

export const GraphContext = createContext<RtLdGraph>(createEmptyGraph())

export const OntologyProvider = (props: React.PropsWithChildren<unknown>) => {
  const [rtGraphValue, setrtGraphValue] = useState<RtLdGraph>(
    createEmptyGraph()
  )
  useEffect(() => {
    const fetchLatestOntology = async () => {
      const data = await fetch(
        'https://uxiverse.com/ontology?format=jsonld-flattened'
      )
      const flattenedUxiverseOntology = await data.json()
      const result = createGraph(flattenedUxiverseOntology)
      // here is a good point to add plugin-specific functionality to the graph
      setrtGraphValue(result)
    }
    fetchLatestOntology().catch(console.error)
    return () => {
      setrtGraphValue(createEmptyGraph())
    }
  }, [])

  return (
    <GraphContext.Provider value={rtGraphValue}>
      {props.children}
    </GraphContext.Provider>
  )
}
