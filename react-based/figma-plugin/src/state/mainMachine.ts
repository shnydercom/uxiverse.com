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
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgC4Ht8AbXdABwGVdVcxsIwAzVAVxIBVCTyBiACQDyANQCiAJQD6AVQCSEkQBkRAWXkA5duMSgy+WOlL5M2kAA9EAWgDMABgDs2AJwBGK3YAcdxzavv3AFncAGhAAT0t-R2wANn9nR0dou387G3cAVgAmdIBfHJC0LDwuUkpqWmxYMjAAY3RGdBrOYlL+YXFpOUUVeQANGXYTXX1DYyQzS0yE7F9s+P9Ix3904LDEf2xIwK9MwMznd2jfPIKMHAALPVwKMCJa0aoaOkx8G7ua0baKdgkZDXEAIIAYXYMgEagkFG6IIkyikClBQz0BnQRhM5gQ1iszmwmWiK3cznS6R8nmcIXCCCsmSs2B8WSWB0J-hs-hOIEKFyub3uqMwjwqLx5Hz5Xx+f00YmBoPBkOhPwofwA4kokSM+ejLFYrOknI47K4kpEMnZ0lYKYgrNEcVZAgtPMl8UTouzOdhLrBrrdeUYBXQAE6oADuyjYpGFnyhShhAAUxCIhGqUWjxhjMpkHP5MjZ0+4lo4MzmLQgaTZsM4UvrUv5tc4prl8hyzu7ud6Rb7ygHg6HuBHRVGRDC1CJeoNxsNk2NQGmMzNlniSY4AtEEsWM+5yzYV9rqfE7JlDq7mx6ve8Hp3sIGQ2H0H2jGKJAAREQDkFJ0aahA4o7uW2+PNWIkTrmmsJaRLi+rageARWoER5FCed78heV49uGbafII3y-P8UogmCEKvgqyqquOyIfqmlipNg6TWqkBz0ds5KgYEG7-tiSQ2Ac6ZWPBXKekhfqVFgUB3DItDIDImBobeGGilh4q4dKBFytGPxwgiMjvhqlFUrYc4Zi4+wrAezGUlmOI1tEK7RLsBrpM4dguo2bqIXJHZPMJmCiWA4lgJJ0k3khD4SoC+GykRkIkSI2kptOiBZJZvjEqa6ZpLsxYpDiGQ5qkdh2NSObOHxLYCe5yGefo3liRJUkycFClPi+8qxVOEwIOkSy4g5CQrCyBVFqB8Tfl4Bo2I4nXWSuJVuWefJCVeFAiXcDUCNhz5Ea1n4WI5G7OKyNauKk2RpP4xZHFEE2-iuNLRDYaS8S5x6tnNHkVIty1gKt2GhXhMqEfKsLwoiZHqnF7U7bqrg1lutoOekCzpHYxbEtEmw3Qa0TuPd40lf6tT4MgyBgJgEA0PNF4vGIBNEyTZOfCIj4DBIQICMoMZQgCYhAnwW26TtOrYF4rIJISRz7QsxaElENITQxWapGaeM08TpPk29zz4NTNSE6r9OiozzPxmoALKOIIgxgowIxaDk7bSSG7jd4zj7ayqQ5iBlLOzR0GK-uWOEsrOu02r56eZAKLeUChOUGAqD+jU5x+jwABifwyBQfDyEzPys+znPc7ztsUfFmJRDYtH7UjS45g5nuIH4G4rksWbY4rKRB7rdPqxVFQR6Q3nU5gqDE9TZBEKgNRfRe-lkLgoRDyPYBjxPU88IbCrsFz7AxnwUpQnzpcWH4MxI6afj3W4hKrJSLvZnSd2AQWivxM5pxFPjwd6z3Qn9yJi+jzAOPSe09PKfy7qTESjx-S4BjOcQMsAwDrxzrCGQj5HxKF3vvG2OhyI6VLtkWkNlsbXSyDSakxYXaEmwJ4BYeIuLpgLJ3EO+sNbYD-oPEmS8V4gIWirOmIllDoAgBAO4cCEFIMEKISQAAhMQAgADqUIJDxjzmbNQj4AT-UPu1akdIPCxA8HiCshxsiUOpFEOIFddj7WxE5N+TYP78NDhTcOEBI5QAAcvIBq9QHvWce47yQiRFiPgagRBPAADSIgACacYXwUAkHIxRyjVFs3UZo7Rxd8HtX8EkGhiRDTjU4o4cxUxNhV3sFxFckRMjMO-mHPu7iB6eK4YA4BU8+FfwEUE4RoiwDiPCUg1mag05iFUMoNBGCLZ7wBAfbJ4MMT7iiEjWYLtrIDWiJQ3YG5Fi0UAl4BYrh6nd0aXQDhrTh7tN8UJaoYAADWgzEGPiYFgScPARljImVMzBsz5m4LBm1DEtZywFRdo4WwbgCq-koYEWk+wazYj-BNOpT0nHdJcWwi5XieGdM7KndOmds5GxECbM28ZLbWx0RiawtEYh1jhdmFI2ZWTFiXDaRGELrSsjcGydkLwGDwHGG6AgLRyBCQYMwMMzRuBkGpREPMc4PDLEiNaW0WzQIWGJDEOIS45Z12tIkEqorZVCSqLUeojQZWlHlZiU0QsnIZDyXmJkhJixat1LEeIeZ4aGlRe-HAJrSh+ltVq1wSqAgI0Keq91dYHCxBZfEHi+I-AzRej6XumskKhsCDiNIRwVw5hhnmYs2oHB5XcDSJyRJTpprKq9TNl5uxBXKralIThOqATNNZM0TqzqgTLULewla3DWgdnygNpVTwZrNZ9PyAV6qtoWUChKAQYgFSONqewdYdSlrcEOoxo6a0BDrdO9sjaPrVS+kugFdtdLODRqycalZK1FtsudOImx7rLASEcYk+pT2CU7KGkkup81Wm8LsWwJahrxHXYkJcxIoP7kepO8BLCf6Uy1gEnuob-zlmdssStjkHZSxpELVwKwljZkcjqE5mLG0XOjsgWO8dE6-xY-PZjrGE7nFtfQoWNjEj5XGlkG+iAjI0XsLWaknhiP0dYYx5pIluM3DY0nYDy7Py3UE7qpIqQUXiYQAEMsJIwV5mMlkBsaGcNnPYcpzhVzvEdL8eczjC82nOd8Xh7EThsixC3cuew-bb4uw2FuHwXhsS0QPKhxxOB0MNNcU0jxOKfG8JQgEqB1AYFPLAPxytPtIj3SSN4U0lCwsP1ZBWExWMtwKcw241LnncWucvFl3pISBlhMQQV2kw65PeDzD+5GQ0Tp0hcC4eY6YVzWfi+1jFinf4Ocudw9LeLPJ3MeT1sALyGiYDvbekuuiH00SJHXO+NIswatvoBNGyy0iJBggkf183EunOS+clbaWXNCUYGwIgeXbUeF2axA8+wiSUdhflXEFZbSmlgscNFCXbOffs81pzrWQ1af5jqXUBZaKItOndZIlDWSZCq7MOrtg0gNbOSBvRTsuKuxSJfYsyQHCywcljEk9g7B8RA3SpnLtv3u3rpieIUQE1cRrPWCaSs8g5CAA */
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
    recommendationState: {
      initial: 'noRecommendation',
      states: {
        noRecommendation: {
          on: {
            EDIT_COMPSEARCH: {
              target: 'editingCompSearchState',
            },
            EDIT_RENAMEREPLACE: {
              target: 'editingRenameReplaceState',
            },
          },
        },
        editingCompSearchState: {
          initial: 'emptyCompSearch',
          states: {
            emptyCompSearch: {},
          },
          on: {
            FINISH_EDIT_COMPSEARCH: {
              target: 'noRecommendation',
            },
          },
        },
        editingRenameReplaceState: {
          initial: 'emptyRenameReplace',
          states: {
            emptyRenameReplace: {
              on: {
                EDIT_STARTPHRASE: {
                  target: 'recommendingStartPhrase',
                },
              },
            },
            recommendingStartPhrase: {
              on: {
                EDIT_MIDDLEPHRASE: {
                  target: 'recommendingMiddlePhrase',
                },
              },
            },
            recommendingMiddlePhrase: {
              on: {
                HOVER_BROWSE_RECOMMENDATION: {
                  target: 'peekPhraseDefinition',
                },
                KEYPRESS_BROWSE_RECOMMENDATION: {
                  target: 'peekPhraseDefinition',
                },
                CONFIRM_MIDDLEPHRASE: {
                  target: 'fullPhrase',
                },
              },
            },
            peekPhraseDefinition: {
              on: {
                CONFIRM_MIDDLEPHRASE: {
                  target: 'fullPhrase',
                },
              },
            },
            fullPhrase: {},
          },
          on: {
            FINISH_EDIT_RENAMEREPLACE: {
              target: 'noRecommendation',
            },
          },
        },
      },
    },
  },
})
