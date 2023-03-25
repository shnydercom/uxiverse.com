import ontology from './../assets/ontology_full.json'
import { sortAlphabeticallyAndFavorStartswith } from './sort'

type UxiDefinition = ArrayElemType<typeof ontology.defines>

const preFilteredIDs = ontology.defines.map(entry => {
  return entry['@id'].replace('uxi:', '')
})

export function searchDefinitionNames(searchValue: string): string[] {
  return preFilteredIDs.filter((filteredVal: string) => {
    return filteredVal.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  }).sort(sortAlphabeticallyAndFavorStartswith(searchValue))
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
  return ontology.defines
    .find(defEntry => {
      return (defEntry['@id'] ?? "") === `uxi:${uxiValue}`
    })?.comment ?? undefined
}
