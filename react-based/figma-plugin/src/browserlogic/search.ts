import ontology from './../assets/ontology_full.json'

const preFilteredIDs = ontology.defines.map(entry => {
  return entry['@id'].replace('uxi:', '')
})

export function searchDefinitionNames(searchValue: string): string[] {
  return preFilteredIDs.filter(filteredVal => {
    return filteredVal.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
  })
}
