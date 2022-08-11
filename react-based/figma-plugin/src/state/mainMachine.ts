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
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgC4Ht8AbXdABwGVdVcxsIwAzVAVxIBVCTyBiACQDyANQCiAJQD6AVQCSEkQBkRAWXkA5duMSgy+WOlL5M2kAA9EAWgDMABgDs2AJwBGK3YAcdxzavv3AFncAGhAAT0t-R2wANn9nR0dou387G3cAVgAmdIBfHJC0LDwuUkpqWmxYMjAAY3RGdBrOYlL+YXFpOUUVeQANGXYTXX1DYyQzS0yE7F9s+P9Ix3904LDEf2xIwK9MwMznd2jfPIKMHAALPVwKMCJa0aoaOkx8G7ua0baKdgkZDXEAIIAYXYMgEagkFG6IIkyikClBQz0BnQRhM5gQ1iszmwmWiK3cznS6R8nmcIXCCCsmSs2B8WSWB0J-hs-hOIEKFyub3uqMwjwqLx5Hz5Xx+f00YmBoPBkOhPwofwA4kokSM+ejLFYrOknI47K4kpEMnZ0lYKYgrNEcVZAgtPMl8UTouzOdhLrBrrdeUYBXQAE6oADuyjYpGFnyhShhAAUxCIhGqUWjxhjMpkHP5MjZ0+4lo4MzmLQgaTZsM4UvrUv5tc4prl8hyzu7ud6Rb7ygHg6HuBHRVGRDC1CJeoNxsNk2NQGmMzNlniSY4AtEEsWM+5yzYV9rqfE7JlDq7mx6ve8Hp3sIGQ2H0H2jGKJAAREQDkFJ0aahA4o7uW2+PNWIkTrmmsJaRLi+rageARWoER5FCed78heV49uGbafII3y-P8UogmCEKvgqyqquOyIfqmlipNg6TWqkBz0ds5KgYEG7-tiSQ2Ac6ZWPBXKekhfqVFgUB3DItDIDImBobeGGilh4q4dKBFytGPxwgiMjvhqlFUrYc4Zi4+wrAezGUlmOI1tEK7RLsBrpM4dguo2bqIXJHZPMJmCiWA4lgJJ0k3khD4SoC+GykRkIkSI2kptOiBZJZvjEqa6ZpLsxYpDiGQ5qkdh2NSObOHxLYCe5yGefo3liRJUkycFClPi+8qxVOEwIOkSy4g5CQrCyBVFqB8Tfl4Bo2I4nXWSuJVuWefJCVeFAiXcDUCNhz5Ea1n4WI5G7OKyNauKk2RpP4xZHFEE2-iuNLRDYaS8S5x6tnNHkVIty1gKt2GhXhMqEfKsLwoiZHqnF7U7bqrg1lutoOekCzpHYxbEtEmw3Qa0TuPd415I2LwMPA4xugQLTkEJDDMGGzTcGQW26RYgRRLaHjLJE1q2tExYWMSMRxEuE1Eoa8TOacRSk7TQlVLU9SNDTpT0-FmKmtg+VYwjWMuH4hLc7zsTxHm8OGpkJUS6UfqKxDDm0izAQI4k0Nc6BO2zvrCQVvYTmIzNL0+hVgqvOVlsYozhJ0ocVreLsth5sW2oOHl7g0k5RKnT7ZWvf7XbXr2Qeg5On4pE4nWAWa1lmhkCxx24qv2EnbjWiSATp6eftS59fkBfVec6OROlK31MQFUc2r2HWOrVwndfJ43adPQhvvtlnl7Bkt1VfT3IAThRSvOGjrLjZWSc5v4tnnXEmz3csCRHMS+ot4JnbB5YJK6mkRwrifMeOMWzjxEP+oKzUhrIBW0fFn6YjNA4W2bMHac25vEKIbs-CslsAWPGOQgA */
  createMachine<MainMachineState>({
  context: {
    /**place cursor here and press CTRL+SHIFT+P and choose "XState: Open Visual Editor"*/
    host: {
      lastLayerSearchResult: [],
      lastTextSearchResult: [],
      selectionFocusedElement: undefined,
      userSelection: [],
    },
    plugin: {
      hostAppSearch: {
        isSearchValueElemNameMatch: false,
        searchValue: '',
      },
      ontologySearch: {
        confirmedRenameParts: [],
        hoveredDefinition: '',
        searchValue: '',
      },
      tooltip: DEFAULT_TOOLTIP,
    },
  },
  schema: {
    context: {} as MainMachineState,
    events: {} as { type: 'FOO' },
  },
  initial: 'tooltipState',
  id: 'main',
  states: {
    tooltipState: {
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
    hostSelectionState: {
      initial: 'noSelection',
      states: {
        noSelection: {
          on: {
            HOST_INTERACTION_SELECT_MULTI: {
              target: 'rawMultiSelection',
            },
            HOST_INTERACTION_SELECT_SINGLE: {
              target: 'rawSingleSelection',
            },
          },
        },
        rawMultiSelection: {
          on: {
            SELECT_PREV: {
              target: 'singleItemInMultiSelection',
            },
            SELECT_NEXT: {
              target: 'singleItemInMultiSelection',
            },
            HOST_DESELECT: {
              target: 'noSelection',
            },
            HOST_INTERACTION_SELECT_SINGLE: {
              target: 'rawSingleSelection',
            },
          },
        },
        singleItemInMultiSelection: {
          on: {
            HOST_INTERACTION_SELECT_MULTI: {
              target: 'rawMultiSelection',
            },
            HOST_INTERACTION_SELECT_SINGLE: {
              target: 'rawSingleSelection',
            },
            HOST_DESELECT: {
              target: 'noSelection',
            },
          },
        },
        rawSingleSelection: {
          on: {
            HOST_DESELECT: {
              target: 'noSelection',
            },
            HOST_INTERACTION_SELECT_MULTI: {
              target: 'rawMultiSelection',
            },
          },
        },
      },
    },
  },
})
