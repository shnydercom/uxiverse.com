import { createMachine } from 'xstate'
import { DEFAULT_TOOLTIP } from '../components/TooltipBar'

/**
 * the plugin can't catch up with all the new types that will be added to the host app, this is a sort of "supported types"-list
 */
export type HostAppElementTypeEquivalents =
  "BOOLEAN_OPERATION" |
  "CODE_BLOCK" |
  "COMPONENT" |
  "COMPONENT_SET" |
  "CONNECTOR" |
  "DOCUMENT" |
  "ELLIPSE" |
  "EMBED" |
  "FRAME" |
  "GROUP" |
  "INSTANCE" |
  "LINE" |
  "LINK_UNFURL" |
  "MEDIA" |
  "PAGE" |
  "POLYGON" |
  "RECTANGLE" |
  "SHAPE_WITH_TEXT" |
  "SLICE" |
  "STAMP" |
  "STAR" |
  "STICKY" |
  "TEXT" |
  "VECTOR" |
  "WIDGET";

export interface HostAppElement {
  id: string;
  name: string;
  elemType: HostAppElementTypeEquivalents;
  /**
   * used for calculating reading-direction-sorting (ltr, top to bottom) position of elements
   */
  absolutePosition: DOMRect
}

export interface HostAppState {
  userSelection: HostAppElement[];
  selectionFocusedElement: HostAppElement | undefined;
  lastLayerSearchResult: HostAppElement[];
  lastTextSearchResult: HostAppElement[];
}

export interface HostAppElementSearchState {
  searchValue: string | undefined;
  isSearchValueElemNameMatch: boolean;
}

export interface OntologySearchState {
  searchValue: string | undefined
  confirmedRenameParts: string[]
  hoveredDefinition: string | undefined
}

export interface PluginState {
  tooltip: string;
  hostAppSearch: HostAppElementSearchState;
  ontologySearch: OntologySearchState;
}

export interface MainMachineState {
  host: HostAppState
  plugin: PluginState
}

export const mainMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOi+gLuqgDYDK+q+Y2EYAZqgK7H4AqA9uy+gA4DEACQDyANQCiAJQD6AVQCSUsQBkxAWUUA5VpMSge7WAXTtMukAA9EAWgCMAJhvYAzAAYAnAFYPADicAWOycAdiCnGwAaEABPaz8-bE8ANjs7EJsnf0yAXyzItCxcTCMSckpqWB4wAGN0OnQqji5CfmFxaXlFFXUxAA05VjN9Q0ITM0sEW3tsEO87bzdvRb8nXw9ImIQ3bBtvF0S-We8bN0SXPx8c3JBMdlp4JBB8nDxCEooqGnomFkbuHkGDEZRg9xlZXHZpstEjYPG5-MkghFotYPC4Eh5knYzkcnG5lkEPDk8hhnkVXmR3uVKjU6g1OH8AcNjKYQYgbDY0bNQkEDkFAjtEkF1ii0UkUtj0niVkTHiTCsUKWVGUCWaBQU47IlIU5obD4akkRtbCl0Zi-G4gi5ji4nISrk9lSNVRZrLa0TydTC4X4EYbrMd4mK7HifAtEv5LlkgA */
  createMachine<MainMachineState>({
    context: { /**place cursor here and press CTRL+SHIFT+P and choose "XState: Open Visual Editor"*/
      host: {
        lastLayerSearchResult: [],
        lastTextSearchResult: [],
        selectionFocusedElement: undefined,
        userSelection: []
      },
      plugin: {
        hostAppSearch: {
          isSearchValueElemNameMatch: false,
          searchValue: ""
        },
        ontologySearch: {
          confirmedRenameParts: [],
          hoveredDefinition: "",
          searchValue: "",
        },
        tooltip: DEFAULT_TOOLTIP,
      },
    },
    schema: {
      context: {} as MainMachineState,
      events: {} as { type: 'FOO' },
    },
    id: 'main',
    initial: 'initialState',
    states: {
      initialState: {
        initial: 'defaultTooltip',
        states: {
          defaultTooltip: {
            on: {
              HOVER_UI_ELEM_ENTER: {
                target: 'specificTooltip',
              },
            },
          },
          specificTooltip: {
            on: {
              HOVER_UI_ELEM_EXIT: {
                target: 'defaultTooltip',
              },
            },
          },
        },
      },
    },
  })
