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
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgC4Ht8AbXdABwGVdVcxsIwAzVAVxIBVCTyBiACQDyANQCiAJQD6AVQCSEkQBkRAWXkA5duMSgy+WOlL5M2kAA9EAWgDMABgDs2AJwBGK3YAcdxzavv3AFncAGhAAT0t-R2wANn9nR0dou387G3cAVgAmdIBfHJC0LDwuUkpqWmxYMjAAY3RGdBrOYlL+YXFpOUUVeQANGXYTXX1DYyQzS0yE7F9s+P9Ix3904LDEf2xIwK9MwMznd2jfPIKMHAALPVwKMCJa0aoaOkx8G7ua0baKdgkZDXEAIIAYXYMgEagkFG6IIkyikClBQz0BnQRhM5gQ1iszmwmWiK3cznS6R8nmcIXCCCsmSs2B8WSWB0J-hs-hOIEKFyub3uqMwjwqLx5Hz5Xx+f00YmBoPBkOhPwofwA4kokSM+ejLFYrOknI47K4kpEMnZ0lYKYgrNEcVZAgtPMl8UTouzOdhLrBrrdeUYBXQAE6oADuyjYpGFnyhShhAAUxCIhGqUWjxhjMpkHP5MjZ0+4lo4MzmLQgaTZsM4UvrUv5tc4prl8hyzu7ud6Rb7ygHg6HuBHRVGRDC1CJeoNxsNk2NQGmMzNlniSY4AtEEsWM+5yzYV9rqfE7JlDq7mx6ve8Hp3sIGQ2H0H2jGKJAAREQDkFJ0aahA4o7uW2+PNWIkTrmmsJaRLi+rageARWoER5FCed78heV49uGbafII3y-P8UogmCEKvgqyqquOyIfqmlipNg6TWqkBz0ds5KgYEG7-tiSQ2Ac6ZWPBXKekhfqVFgUB3DItDIDImBobeGGilh4q4dKBFytGPxwgiMjvhqlFUrYc4Zi4+wrAezGUlmOI1tEK7RLsBrpM4dguo2bqIXJHZPMJmCiWA4lgJJ0k3khD4SoC+GykRkIkSI2kptOiBZJZvjEqa6ZpLsxYpDiGQ5qkdh2NSObOHxLYCe5yGefo3liRJUkycFClPi+8qxVOEwIOkSy4g5CQrCyBVFqB8Tfl4Bo2I4nXWSuJVuWefJCVeFAiXcDUCNhz5Ea1n4WI5G7OKyNauKk2RpP4xZHFEE2-iuNLRDYaS8S5x6tnNHkVIty1gKt2GhXhMqEfKsLwoiZHqnF7U7bqrg1lutoOekCzpHYxbEtEmw3Qa0TuPd40lf6tT4MgyBgJgEA0PNKEE0TJNk6MQJEHokA8CIj4DBIQICMoMZQgCYhAnwW26TtXHlgk8Q6t4Ga2cWV0xGaDkZodSTuHjVPE6T5NvQGas05rmD04zEDM6zPzxmoALKOIIgxgowIxaDk7bSktIkvlrL5Yc1nFvtLJOFmhzLAVRI2A2pxFPjNSE+rtMU55kAot5QKE5QYCoP6NTnEJWAoqgRBJ8gKdpxnPDxhzyiW2oj4SACCgxnwAIAEIiKCQI1woACagvxV+Ie6kcBrB-sqRmt7RKZLidYGhLnXuBmquR9TGvnnHEAJ1A+eF+nmcXtnpC5xvNxF+cPAUIIADq7Oc9zIi8-zEigtzXfta4s7ZKajnGTB0Tez4UQI+NrhPDbFsvPKOutl4VHjqQROydD5bwWjrUmIkkJ8HQFAc4RA0HnC9EfdgYBTC4BPoDMu19b58AkKXTmygn4YjrP4NG2osxi08CsMyiBnD4jLDmRwu47qARzJkUBi8Y5a2wFAkSB9U7wMpgvaOyDyqoPQZg9BOCt54IIUQshOEJC23buICgND2GARxONNwRx7AeDxN7WCNF8T0LSPlBGICnrh0QSIiqkDV7QPXrAqRGcEGyJpvI16mBFEYKwaojO6jCE8z5uQv498RzsAMQ7Ci3dXAizugWOi2IszSyGoHGIfgVypC3CHK0Qjo56yEuImBBc4H+JkWApB3kUFYOUdghp5xoltFEJIEhEgG5iAEGfKEFDBxUJEJXAE-1DEIHyjiBZtlEgHWyN-ApSMimHASFPew8RKngNjp4tekij4BOaavVpCj2kRK6T0gA0iIducYXwUEvlzQZwzRkiHGWXCuj4ZkETmVWcsvgsxI1sgsKY3tEqi1cBNewJIsbOTDjgCOFzqkXlqT4+pfjt6eXRcI4JPpQk3JUXc-BhCWZswGbE-mmhRxzPxGjeidYfD+3ht7bItIeEOUiAaZcj1UWXjcZileJzfFnIvAvTeUTyCwDUK8cqmi4naN0fouZRJEgxH3MZI4Oofyj2tHSLIXE0j7T8GaA5S8jl0Gxac6RnkZV3PlYq4KdL4kQgZckzVHtsAeDyorCa2ZViUmcBwkxpqLUWoyCrFxaLRUQLtV4iRkrHUVGdXi9grqlUhONjSq+coyHes1bETMSQjp4hpDqZGQ17obAyEsKYADqx2Gte4mpKa6myvxRUIgqBQhgH9F0hQ+BUCXKgDwAAYgIKQlc1UAj0WIFJOhyI6XSXdMs-swVORDvYTI3sswOHTBw+iWQvCOHbWK453iHWNM8v2wdw68WjvHSJHg6rJBqAED8Gdc7HyaqWA4ACCxvAsImussNNjaIIwKr+Aqlir1JrEV2nFPahKZtwfKhQA6h0KvwLgKd+AWCk3zT8WlN84kltSeu9qJ0oi7UiIZPMZozpDSmFEOIVlrR9U8II+NIrAk2tEfatN96M1ie6fK6JirCPEdI9S8jhaPXUdXWDNqaZFzlg8PLXYTCR5DVhcNFk2Nsh2jZAJwlVTkOidxVKzytACEjrHROng3qJDft-bOyugGFjYGxtaWyArsx1hhRkf14aOHWnuo5AqSHbUoYlXZ9NdBHORPOK+1zf750JNUyACcaTn6mlpPdM0FYHIrhrGxsNFanCwezL3AIc9LOJoS7Z9DF5qhgAANYbyEOgMAQZdD+hicQq+HrflULmV4XUpYJq2n3J1ew3tkhRCOOYnUKwjihybK4oTHasWobvb2ugXXevJ364N4bhC52CD6e8mMnyRljMoeXKZALZk0fBhiEkXCeGxbBeCq0MLbLlkctsRKdYsbxZE0dyTfpp1-BkKfeQJsHsermYScsK4OFZFntSKYob2GsjLHibUCNdh5g4XG4VVnDmw7XmIEmqBiZM7IP2moX0sUF1wKEJnmAWdgDZxzsAZHITsF5uwOuUooRzJ2oEJwnFCS7CW5y0C2YeEzFtGPLMVpTQw48cmxnzPWdgHZ6gTn5yiWtOoCNmM5xAywFF4p2EMhHyPiUNLgEsuvsafYZrhxgROrxBsjqNcRIoaBEci4OxKQDeduNwL035vLdNOt1AZQ6AIAQDuPbx3ou7sdCGc9n54zXv-MBeCOXB4aK2CNNaHhHg4ZrlsOPLGR7Fv6orPHw7ifBfC4t1zglbiRKZ+z7nh3qAnc8Eec8+MFA3nF++ZNt70zPtqcdrpfquJDiEitA5biLecxFLyVxeirIUW7YTft69RvvH8-72bkXVu5HeTHznsAeep+i45moKdMgxBVBlA3cPdrY+AZd7YN9CsMRrINxEhQM+M2Uw91cT1-UCpsQp5shEghUr9BMMUbNUMH9k9n9OswAesv8ndHwmBd5RRf9-9ADXd3dPdwDvdID8s11vtEBCxbE3BEhY1dhkU1xlg0ZWJTp+V9okge9xV78Tchcn9B8Ed-81BkdyEXczYLYrYbY7Y5cCc6R9hHISld8VhR5sx-UVgVgnJ9pL12QXgGB4Bxg3QCAWhyAhIGBmAwxmhuAyA5dAgogFsAgEZEhoZINLBiQYg4glwJoiRDQQ8SonCvChIqhah6hGhPDSg5dTQ0CsYnEqc-BCRiwLAwjYh4gWNoirR+NhV4jSg-Q5cHJaR-DlhIhrRbQQjMRJ5wjswphRoPB+UZoXoSUhIhRyofCsc0h1tJYYY8xixtQHA8p8dLCSQAg+iyoQkFpuwgphjfdPwUg6seF5trIzQMgFhpi3B-V7B5ieNTpljTwBiLwqofI-IAp6pNioDaMfsAgdUrQdw9kaR0gTjZjziaQFiriBNZpbiCVgwlpqovoXj2D1NPwOE6QWQgMlxOj6ED1QJijNh61OpsDiR9RrjBJOxaiQ46RDgrQJjbApihp4gdV9RxpfssgGQpD3pWsjADYncIAdCzQaIlxfwJoJpMY-jQJsDywMwVhbRsx1sWS79U1ktxM6AaD95JNNUKwHAKxbBnZDgcxWi9izj4MjgNTTRrDac2TDdEtb14c09X8oA2klFbks1KVgUjg5YnJlgUo4hQshp99cQL0iQmF+E20Wsb8CCksOsnVJNs0yB8MkJS0rQOi9xII8QsYf4sZ-NmRrpOEXAadcC6dhNzT2sukhJOQkIgRzhUBvJIA5l0wkh-VAJ6EFgdRqSw1khaRDQMwCopZPAZSLS5Twy+1cNn0j5MsRJS06xcRYDilxZylrEVhbF6slgvigzTSQy2s4d5STtsBMM1FsNBz8M5MSMuStjdIay0Yy1qdfBxplhZyNwYNAh0orocy3Q8yDtpC+yizpVIzpNKVZMiNDzqy8RgMDimNbBWza0w0kYogB4KxlccwAEezCy8UhI0tnM31vJfUDgyS8QtxbIzQ8Rqt2FIKItw0o9Oj4Lgz8C1ywyPzPIzs+sBsht8ARtMdsQeCiQAggN8RvYgswc8laIoJWEEL1z+ywA5kUg0ZTEAcAggdWjDgATfxfw8KVlL9nyzSE8ZCk85CU8h9IEec+dZCB9OcdCCxa8mikYzQlx8o1wHEtc4hqR6FPBFKhK+9iCFDrSgkbc05cAKDRLjzu5UCXAUp8cdR7zhTKQQ0HBGFT1bADgKkKLhFb9ezvIiCtKSDh99tR8s8P8fKALx56EJpaJ6FtdHA1weIZhmUsyKcFhnKNLH9tKhIzsfKqCGhMBN9XjOCSwwjvAG8cLOICoW9qJ7oDxt1TQEYdtVLVyGdarXLU9PJGA2AiAcq-L2p9xgNAISQIUZ4uL1dlgt0-B9otwWMeEaqRIUrDKdLfL2q-dMQ4g0ZWNEhzLAIHRrKiRbLxp9hDhoZlzcy1LiTlqMQLB+UaILF3YPAppiwZt9TjFtcDRIg+JajTiGjAjmj6ECj4g1ssxe5bBILnI8ggA */
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
      initial: 'recommendationClosed',
      states: {
        recommendationClosed: {
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
          initial: 'initialCompSearch',
          states: {
            initialCompSearch: {
              on: {
                RECOMMEND_ALPHABETICALLY: {
                  cond: 'HAS_SELECTION',
                  target: 'recommendingSelectionHighlightSearchText',
                },
                SHOW_COMPSEARCH_TIPS: {
                  cond: 'HAS_NO_SELECTION',
                  target: 'compSearchTipsNoSelection',
                },
              },
            },
            recommendingSelectionHighlightSearchText: {
              on: {
                SELECT_COMPSEARCH_RECOMM: {
                  target: 'mainSelectionChanged',
                },
                SEARCH_IN_LAYERS: {
                  target: 'layerSearchLoading',
                },
                SEARCH_IN_TEXTS: {
                  target: 'textSearchLoading',
                },
                HOVER_COMP_BROWSE_RECOMMENDATION: {
                  target: 'peekCompViewport',
                },
                KEYPRESS_COMP_BROWSE_RECOMMENDATION: {
                  target: 'peekCompViewport',
                },
                EDIT_COMP_SEARCHTEXT: {
                  target: 'initialCompSearch',
                },
              },
            },
            compSearchTipsNoSelection: {
              on: {
                SEARCH_IN_LAYERS: {
                  target: 'layerSearchLoading',
                },
                SEARCH_IN_TEXTS: {
                  target: 'textSearchLoading',
                },
                EDIT_COMP_SEARCHTEXT: {
                  target: 'initialCompSearch',
                },
              },
            },
            mainSelectionChanged: {
              type: 'final',
            },
            layerSearchLoading: {
              on: {
                FOUND_IN_LAYERS: {
                  target: 'mainSelectionChanged',
                },
                LAYER_NOT_FOUND: {
                  target: 'compSearchTipsLayersNotFound',
                },
              },
            },
            compSearchTipsLayersNotFound: {
              on: {
                EDIT_COMP_SEARCHTEXT: {
                  target: 'initialCompSearch',
                },
              },
            },
            compSearchTipsTextNotFound: {
              on: {
                EDIT_COMP_SEARCHTEXT: {
                  target: 'initialCompSearch',
                },
              },
            },
            textSearchLoading: {
              on: {
                TEXT_NOT_FOUND: {
                  target: 'compSearchTipsTextNotFound',
                },
                FOUND_IN_TEXT: {
                  target: 'mainSelectionChanged',
                },
              },
            },
            peekCompViewport: {
              on: {
                SELECT_COMPSEARCH_RECOMM: {
                  target: 'mainSelectionChanged',
                },
                UNHOVER_COMP_BROWSE_RECOMMENDATION: {
                  target: 'recommendingSelectionHighlightSearchText',
                },
              },
            },
          },
          on: {
            FINISH_EDIT_COMPSEARCH: {
              target: 'recommendationClosed',
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
                HOVER_BROWSE__RERECOMMENDATION: {
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
            fullPhrase: {
              type: 'final',
            },
          },
          on: {
            FINISH_EDIT_RENAMEREPLACE: {
              target: 'recommendationClosed',
            },
          },
        },
      },
    },
  },
})
