import { getI18n } from '../../i18n'
import { uxiverseRootIRI } from '../naming-recommendations/ontology-globals'
import { MainMachineXSCtx } from './mainMachine'

const i18n = getI18n()

const generalFigmaUserTips: string[] = [i18n.figmaTip001, i18n.figmaTip002]

export function getRandomTip(): string {
  return generalFigmaUserTips[
    Math.round(Math.random() * generalFigmaUserTips.length)
  ]
}

const initialContext: MainMachineXSCtx = {
  host: {
    lastLayerSearchResult: [],
    lastTextSearchResult: [],
    selectionFocusedElement: undefined,
    userSelection: [],
  },
  plugin: {
    hostAppSearch: {
      searchValue: '',
      isOptionsOpen: false,
    },
    ontologySearch: {
      ontologySearchValue: "",
      confirmedRenameParts: [],
      focusedDefinition: '',
      exploredIRI: uxiverseRootIRI + "Button",
      isPropSearch: false,
      descriptionText: getRandomTip(),
    },
    graph: undefined,
    renameValue: '',
    tooltip: i18n.tooltipDefault,
  },
}

export function getInitialXStateContextCopy(): MainMachineXSCtx {
  return JSON.parse(JSON.stringify(initialContext))
}
