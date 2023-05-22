import { uxiverseRootIRI } from '@uxiverse.com/jsonld-tools'
import { getI18n } from '../../i18n'
import { AvailableNotations } from '../notation-handler'
import { MainMachineXSCtx, RenamePartSemantic } from './mainMachine'

const i18n = getI18n()

const generalFigmaUserTips: string[] = [i18n.figmaTip001, i18n.figmaTip002]

export function getRandomTip(): string {
  return generalFigmaUserTips[
    Math.round(Math.random() * (generalFigmaUserTips.length - 1))
  ]
}

const initialRenamePart: RenamePartSemantic = {
  lexerStartEnd: { start: 0, end: 0 },
  relativeCursorPos: -1,
  main: { iri: null, shortForm: '' },
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
      notation: AvailableNotations.SpacedDashes,
      ontologySearchValue: '',
      confirmedRenameParts: [initialRenamePart],
      focusedDefinition: '',
      exploredIRI: uxiverseRootIRI + 'Button',
      isPropSearch: false,
      descriptionText: getRandomTip(),
    },
    graph: undefined,
    renameValue: '',
    previewValue: '',
    tooltip: i18n.tooltipDefault,
  },
}

export function getInitialXStateContextCopy(): MainMachineXSCtx {
  return JSON.parse(JSON.stringify(initialContext))
}

export function getInitialRenamePartCopy(): RenamePartSemantic {
  return JSON.parse(JSON.stringify(initialRenamePart))
}
