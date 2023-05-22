import { sortAlphabeticallyAndFavorStartswith } from '@uxiverse.com/jsonld-tools/src/sort'
import { definitionIRI, uxiverseRootIRI } from '@uxiverse.com/jsonld-tools/src/ontology-globals'
import { RtLdGraph, RtLdValue, RtLdIdentifiableNode } from '../../graphInterfaces';
import { isRtLdIdentifiableNode } from '../../typeguards';

export function searchDefinitionNames(
  searchValue: string,
  rtGraph: RtLdGraph
): string[] {
  let searchTrimmer: string = uxiverseRootIRI;
  return rtGraph.identifiableNodes
    .map(rtNode => rtNode['@id'])
    .filter(filteredVal => {
      let searchScope = ''
      if (!filteredVal.startsWith(searchTrimmer)) {
        return false
      }
      searchScope = filteredVal.substring(searchTrimmer.length)
      return searchScope.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    })
    .map((val) => val.substring(searchTrimmer.length))
    .sort(sortAlphabeticallyAndFavorStartswith(searchValue))
    .map((val) => searchTrimmer + val)
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
      return edge.type.iri === definitionIRI
    })
  const value = (foundEdge?.out as RtLdValue | undefined)?.['@v']?.toString() ?? ''
  return value
}

export function filterIdentifiableNodesById(
  rtGraph: RtLdGraph,
  filterStrings: string[]
): RtLdIdentifiableNode[] {
  return rtGraph.identifiableNodes.filter(node =>
    filterStrings.some(filterString => node['@id'].includes(filterString))
  )
}

export function getIRIsAndIdsFromIdentifiableNode(
  node: RtLdIdentifiableNode
): { iriArray: string[]; idArray: string[] } {
  const iriArray: string[] = []
  const idArray: string[] = []
  node.fields.forEach(field => {
    if (field.type && field.type.iri) {
      iriArray.push(field.type.iri)
    }
    if (isRtLdIdentifiableNode(field.out)) {
      iriArray.push(field.out['@id'])
      idArray.push(field.out['@id'])
    }
  })
  return { iriArray, idArray }
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
