import { getI18n } from '../../i18n'
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
      confirmedRenameParts: [],
      focusedDefinition: '',
      fullText: getRandomTip(),
    },
    graph: undefined,
    renameValue: '',
    tooltip: i18n.tooltipDefault,
  },
}

export function getInitialXStateContextCopy(): MainMachineXSCtx {
  return JSON.parse(JSON.stringify(initialContext))
}
