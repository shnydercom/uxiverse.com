import { schemaRootIRI, uxiverseRootIRI } from './ontology-globals'

export const VOCAB_IRI = uxiverseRootIRI
export const WELL_KNOWN_IRIs: { iri: string, substitute: string }[] = [
  { iri: schemaRootIRI, substitute: 'schema:' },
]

export const getWellKnownIriSubPath = (input: string): string => {
  if (input.startsWith(VOCAB_IRI)) {
    return input.substring(VOCAB_IRI.length)
  }
  const trimmer = WELL_KNOWN_IRIs.find(val => input.startsWith(val.iri))
  if (!trimmer) {
    return input
  }
  return `${trimmer.substitute}${input.substring(trimmer.iri.length)}`
}

export function moveElementToEnd<T>(arr: T[], index: number) {
  if (index !== -1) {
    arr.push(...arr.splice(index, 1))
  }
  return arr
}
