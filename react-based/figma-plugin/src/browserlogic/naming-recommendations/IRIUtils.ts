import { uxiverseRootIRI } from './ontology-globals'

export const WELL_KNOWN_IRIs: string[] = [uxiverseRootIRI]

export const getWellKnownIriSubPath = (input: string): string => {
  const trimmerIRI = WELL_KNOWN_IRIs.find(val => input.startsWith(val))
  if (!trimmerIRI) {
    return input
  }
  return input.substring(trimmerIRI.length)
}


export function moveElementToEnd<T>(arr: T[], index: number) {
  if (index !== -1) {
    arr.push(...arr.splice(index, 1));
  }
  return arr;
}