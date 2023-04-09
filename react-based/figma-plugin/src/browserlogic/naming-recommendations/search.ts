import { RtLdGraph, RtLdValue } from '@uxiverse.com/jsonld-tools'
import { sortAlphabeticallyAndFavorStartswith } from '../sort'
import { definitionIRI, uxiverseRootIRI } from './ontology-globals'

export function searchDefinitionNames(
  searchValue: string,
  rtGraph: RtLdGraph
): string[] {
  return rtGraph.identifiableNodes
    .map(rtNode => rtNode['@id'])
    .filter(filteredVal => {
      let searchScope: string = ''
      let searchTrimmer: string = uxiverseRootIRI
      if (!filteredVal.startsWith(searchTrimmer)) {
        return false
      }
      searchScope = filteredVal.substring(searchTrimmer.length)
      return searchScope.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    })
    .sort(sortAlphabeticallyAndFavorStartswith(searchValue))
}

export function getSingleUxiDefinition(
  uxiValue: string,
  rtGraph: RtLdGraph
): string | undefined {
  const foundEdge = rtGraph.identifiableNodes
    .find(node => {
      return (node['@id'] ?? '') === `${uxiValue}`
    })
    ?.fields.find(edge => {
      console.log(edge)
      return edge.type.iri === definitionIRI
    })
  const value = (foundEdge?.out as RtLdValue)['@v']?.toString() ?? ''
  return value
}
/*
const preFilteredIDs = ontology.defines.map(entry => {
  return entry['@id'].replace('uxi:', '')
})

export function searchDefinitionNames(searchValue: string): string[] {
  return preFilteredIDs
    .filter((filteredVal: string) => {
      return filteredVal.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    })
    .sort(sortAlphabeticallyAndFavorStartswith(searchValue))
}

export function searchDefinitionDescriptions(searchValue: string): string[] {
  return ontology.defines
    .map(mVal => mVal.comment ?? '')
    .filter(filteredVal => {
      const lowerCaseComment = filteredVal.toLowerCase() ?? ''
      return lowerCaseComment.indexOf(searchValue.toLowerCase()) >= 0
    })
}

export function getSingleUxiDefinition(uxiValue: string): string | undefined {
  return (
    ontology.defines.find(defEntry => {
      return (defEntry['@id'] ?? '') === `uxi:${uxiValue}`
    })?.comment ?? undefined
  )
}
*/
