import { microCopy_EN } from './microcopy'

export type I18nFlattened = typeof microCopy_EN

export function getI18n(isoLangCode: string = 'en'): I18nFlattened {
  const microCopy = microCopy_EN
  return {
    //spread all copy objects into one flat object
    ...microCopy,
  }
}
