import { StringifiedLineage } from "./rtLdGraph"

export function sortAlphabeticallyAndFavorStartswith(
  favoredStart: string
): (a: string, b: string) => number {
  const ucFav = favoredStart.toUpperCase()
  return (a, b) => {
    const ucA = a.toUpperCase() // ignore upper and lowercase
    const ucB = b.toUpperCase() // ignore upper and lowercase
    const isAFavored: boolean = ucA.startsWith(ucFav)
    const isBFavored: boolean = ucB.startsWith(ucFav)
    //similar to XOR for startsWith
    if (isAFavored && !isBFavored) {
      return -1
    }
    if (!isAFavored && isBFavored) {
      return 1
    }
    //standard comparison for both favored or both not favored
    if (ucA < ucB) {
      return -1
    }
    if (ucA > ucB) {
      return 1
    }
    return 0
  }
}

export function sortTreeViewSiblings(
  a: StringifiedLineage,
  b: StringifiedLineage
): number {
  const aVal = a.iris.join('/')
  const bVal = b.iris.join('/')
  if (aVal === bVal) {
    return 0
  }
  return aVal > bVal ? 1 : -1
}
