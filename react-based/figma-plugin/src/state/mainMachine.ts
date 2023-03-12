import { assign, createMachine } from 'xstate'
import { HoverableElements } from '../identifiable/HoverableElements'
import { compIdToTooltip } from '../mappers/compIdToTooltip'
import { getI18n } from './../i18n'
import { HostEventTypes } from './../communicationInterfaces'

const i18n = getI18n()
/**
 * the plugin can't catch up with all the new types that will be added to the host app, this is a sort of "supported types"-list
 */
export type HostAppElementTypeEquivalents =
  | 'BOOLEAN_OPERATION'
  | 'CODE_BLOCK'
  | 'COMPONENT'
  | 'COMPONENT_SET'
  | 'CONNECTOR'
  | 'DOCUMENT'
  | 'ELLIPSE'
  | 'EMBED'
  | 'FRAME'
  | 'GROUP'
  | 'INSTANCE'
  | 'LINE'
  | 'LINK_UNFURL'
  | 'MEDIA'
  | 'PAGE'
  | 'POLYGON'
  | 'RECTANGLE'
  | 'SHAPE_WITH_TEXT'
  | 'SLICE'
  | 'STAMP'
  | 'STAR'
  | 'STICKY'
  | 'TEXT'
  | 'VECTOR'
  | 'WIDGET'

export interface HostAppElement {
  id: string
  name: string
  elemType: HostAppElementTypeEquivalents
  /**
   * used for calculating reading-direction-sorting (ltr, top to bottom) position of elements
   */
  absolutePosition: DOMRect
}

export interface HoverUIElemEnterEvent {
  type: 'HOVER_UI_ELEM_ENTER'
  payload: HoverableElements
}

export interface HostAppUserSelectionEvent {
  type: "HOST_SELECTION_CHANGE";
  userSelection: HostAppElement[]
}

export interface HostAppSelectionEvent {
  type:
  | 'HOST_INTERACTION_SELECT_MULTI'
  | 'HOST_INTERACTION_SELECT_SINGLE'
  | 'HOST_DESELECT'
  userSelection: HostAppElement[]
}

export interface HostAppState {
  userSelection: HostAppElement[]
  selectionFocusedElement: HostAppElement | undefined
  lastLayerSearchResult: HostAppElement[]
  lastTextSearchResult: HostAppElement[]
}

export interface HostAppElementSearchState {
  searchValue: string | undefined
  isSearchValueElemNameMatch: boolean
}

export interface OntologySearchState {
  searchValue: string | undefined
  confirmedRenameParts: string[]
  hoveredDefinition: string | undefined
}

export interface PluginState {
  tooltip: string
  hostAppSearch: HostAppElementSearchState
  ontologySearch: OntologySearchState
}

export interface MainMachineState {
  host: HostAppState
  plugin: PluginState
}

export const mainMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgC4Ht8AbXdABwGVdVcxsIwAzVAVxIBVCTyBiACQDyANQCiAJQD6AVQCSEkQBkRAWXkA5duIDaABgC6iUGXyx0pfJkMgAnogCMANgAsT7A-cBOAKwBmBzp8PFycAGhAAD0QfACY7bDsfAHYnDwcggA5op2jogF9csLQsPC5SSmpabFgyMABjdEZ0Ws5iMv5hcWk5RRV5AA0Zdl0DJBBjU3NLUdsERydE+M9ff0DgsMiERJ1XRK8daMCgnQ8fHy98wowcAAsTXAowIjrJqho6THwHp9rJ9op2CQUHoAYXYMgEagkwL4AEE1ABxETDKzjMzoCxWGYHOzpRYOdJOHxOOx2DzpdI+daIJwOBZOPY6Ow5HRbHx2c4FEBFG53L7PdGYV6VABOqAA7so2KQ+T8BTwgUpQRIAApiERCZGjVGTTGIHIJbA6I1EnzpRLRDypUIRezOHzYdIOHK+U4ePKc7nYW6we6PfkWIV0UUSqXoGW-BUiJVqER9Ib6FEmNEY0YbOb2x3O06BaJhLGOLyG42Es0Wq0XLlXL28v2ygMVOjIUPhgUUFgAIweuD+AMjoPBkOhcMRmqMSZ1qcQXiZDt20USRPmXkSBLzetNOjc7gJRJJZIpFc93t93xeDewTe4LYDHa78pBANV6tHY3HAqsG2n0VnXnni92K7Wli86bo4+KEsSpLkj4h5Vse16Cuel7SrWLy3mA3Z9gCMZxi+2rvpOCBfj+f4uABq42HqOTfmBO6QfuMEenBNanq257BhQWBQE8CE9oCD4DlCsIIkiCZam+KagBsNJ0gyTLRCyARMl4a4ILEyR4nRe7QbBxTwahbFvNgwpgGAABuqBELxgj-BIMgaOIML9hC-GKgCyhSAoYJ4RJUxSfYpybmyDjLDSTJMqpBwLtgsTOCklr4isuk8j6CGBsZpkWVZBkWHx9maGITlgi5WGAvZ8JKD5EwEf5sz7AsXhOj4Oghb4y4tZFOiOtgXiWtsTiMviXVOMl1apTliFGSZ5mWdZAi2QAIiIWFVcmfk2nVbJuCk6QJO4Kw6CplFqUSCzeAELVnM4+2jfprH1lNmWWZKV4TW2nYYTwUjKgtMKaBIHleTIWEDhQUgAEJAvGIxjtVknHQp6SbkaAQ0r+FpkVSalZLihy7Ka+KOnYo0mbU+DIMgYCYBANCGSKdTk5T1O0xYwJECYkA8CIC2DFCAjKMqQIwmI0KrROtWmri0RmnsDh2AE06NapAC0CSFhylzFKTjNUzTZ6PWTFO6yzmBsxzEBczzAJqmoMLKOIIjKgoTmiTDr5w+tGySzFMstfLZzsg4Ks4vaGuVlrDNG8z+uVJAaKYFAwLk5QYCoMKtTXIGPAAGL2cDfDyFbfMC0LIt8GLNXHcrZo9VjFoBNgS4tQpdiJGkiQk5HTN63TdBx6QCdJ8gKdpxn6VYGillDyP6fXDwarAvz9tqAtEgwgoyqwuDIhgsC68KAAmhX8MzCucTZmyvjEu4XhHRs0u343uzN4ybceB3TER4b3cm+l-dcdPB4o9M7ngnqQKeycgGz3lIIAA6sXQWIhhbQgkGCQWx9PZ6nSI-JuTpX7t1UjuB02Z2S7hvmHT02so49werHCA8dE6QNTrPdKVDu5cQQnwdAUBrhEG4dcX0wD2BgHCJhB8CDS4oIXkvDBupNipDcCSY4DgkjZDJHfewh1kZJF6k4JGsRX6d2-sbGOfd6ED0YcPKBY92Jd11hwiaXCeF8J4YI2ewjRH3mQQXeyEhnYH3EBQWRhF5Z7ENDojI+x5at0Ib1eISjUiqItNgoxOto692wP-QeTDgGsLsdTBx91MBON4fwtxGcPFiO8XZSEmg4xBLErDNaH5NFhICLsSJBiYnHWSLiOW8tEnJGSRQqsbCTEZKyZYmeNiDZpPoQnTh-CXECOsdcSp7RRCSEXgLCQ4MxACFgUCCQ0jlDL1+sVNQwTaqhO0R0vRUTX6qS2JufpyiknqNSdQ3+55JmAOYTM+mxiCkLMcUsspqz1kAGkRAHyfBQCgCDdn7MOSIY5UYl4iBXn9AcVyNo3PCXc-R0TEiqTdHEV5gy1EpM-jgMZ6TaFmIYX83JtigXzKgIs5x4L-lrJEd2bmvNtnKn4t4up0NEwexaXVNpET7ldJJcdEK34KUqKGR8mlGU2XfKMr8nJLDzyG2mWs8gsA1CfAml4suNS-EwgCWIBpbt8LwzTIdOIZI24slbmfSkirtiKIGaqqlIyv5zO1XQpleqAV0ENRCk1ZreKSJ8bU2M7AHUSuaSE112B3X+ESF63aPqZi3wcP6t5arqWa1pfkmhk1w0WOZfqoyMaeXsDjeaopltBX82FYmsVuKXXTmzWaXN+aEiqT2H0hJgbhkjQ1XSmtf9zEAMjSAoyRBUDWDAMKVZCh8CoHZTnAQUgV7Wv8YE3FMwPDHGIacWIwRpxuixq3QkhpkjeGyDibYH9K2atDaYzJS7slWJ5elddm7t08t3furiPAz2SDUAIAE2cj0r37fYZI9oWQpC8B+pG8xSXmmwBfO9LgH3uh-fOsNjL60rvSs2oRJqFAbq3aa-AuBs74BYNTTtAIhUirLn2xp7sM2gEvYyG9bJ35nHNIyOui4iO9PmBSXwiQFyfJ-v+3VwGWVNpXa2sgsBKlmvY5x7jArePdv49CQTjrfJSoOESbNb6uqOi6qaBVl7nBEZIVJ5cLd1PjIZQBiN2nG2VFoKInde6D1iokAhpDKGFpodmAuKWyl2RGmXCFDzmjHMUlvXYe9pJyPhyrVqzTgGpmrPShF8p1woMHuQ8e1evibPpvFni1LMV0sMiy8uVSAyFjEcK6R4rAX6W1uo8u0LUbsA1DAAAa2nkIdAYAxTGGFGItyEikFWpOcoZLz6S0JGSDh2IeGcuzHZB4CTJH6RjbndWqjwWaMzdXZUebS3k4rbWxt7sx7BCbMRXsg5Rz9uYvOTioTTrMEpZpPEVRZ3P34eOvJb8w2itunGwun5lWxBU1QJTfHZB121DAFnXOah86F15jbO2DsnYu2S9LfwMUUYklvm6IIQcq5qx6tj57kz8eYEJ2AYnpPyc-OHrgawwvRfi9QGTnjgJ2DC3YJvQqQIL16l-I3S051HSNTzW3LGJxvzZD0TSIIbdsMC4qwwuXROwAk8V5L2Z1COHUE28qa4opYBgGV8oGQC0FpKA1zCLX0O7PTB1+b-XE6Qq0lbjztMSR0dmiSFel0bdv2ld-V8+3FjHdi+dxLvJbKuLKHQBACATwfd+4D4DzoIOUUSDReDrFFztdqV1-FA3ifjcp-sBSM6lo9HYOcPXYNZW-0TLxwTp3Luyfl7mZX6vtewD19QP7ng0LYVqnhUi0HqKO+Q4hIdkf2ax-kkamow6qk2SuH1-3o3z67dz4dwvkvS+3eAtXwnKvGvOvX3bfAPReNQXOMQVQIPEPMPPgTXV2drSuNMS-fXcfW-KfTqVwPvBPV-Nud-ILIXL-BXZfc8T7Lff3BaJgMBOUcAyA6A4PUPR2eAiPRA8SSVGPNSFIbzGIZIFqYkPNLwdIOuAaVwZqfYPBIIeYYmDVZCdACg3-PuaXawF6MoEA-3WAHgReZUA+BBdgOMVBAQNFW2e2NURnYENgppDrL2ZcGKZ+Y4dkX8BcFwB-PYb8dnZJeYaIG6WQ0MBQv+ZQ1Q8gdQuAHgeyIEMQR8FgyPWzDgiWWw+cBkDwRw0iICKIW-HqI0JkMkLwnwn9OQ-w88RoIgJ4CAIIhQzQpaJQTQVeZ2WycPGIpAk+RAauBqU3LYbNfEVTZI2kbBQrUaAokI9KYo0o8okI2AKoLiYAhvHgKoneVFOoqIhA7vZqDohkFwU4c0bLIfBAQIBYLor1L1FcS0AYvwoYoo9AEoyAMYhvCY0wBOaY0AngGEEPFUaI5aZLPYtwM0Q41TY4jwB-BITDI0DYtPbY047gQooyEY64s424+gUUKAKALiBQ+eEQAQMQJaSQBoj4qPOIjaQIXEX8JIlI5wtI3Y0kdWEEwkMErLCE0gKEyoGEsouE0AiYiARE5EhOVEmQeEBDNUT4skHqaIEk2+VIh-EU3EFGUErYuk3wyE846Ey40Y1kjQi8VUgPF41eY9OgmQKA7mN45YvEkTY6V0OIOSTwrY9wU3dkIdJkEfekcfGQ-IjU4Y5U2EhU+EwYmYuY-6NQJ2KQf4WBIwnE5LZIwsMke0xHJ0h-R0osRkS07w9wek+QxUpk90lkz0tk9UrMnfXUqAw01gsM20yM6WaM8kOwB-E0TIhMnIq0hwFMxkugZkm47M70p4haQqeEQsxo9gk0jYcMu0ss07GM00i0Kk2sgkesxstM5sjM1stU9snfX01FIEcA0PCPJYos406wxAQc0sh0nDCs1wxwGs7IqcpMhsisD4BgeAUYbkJo2HZWLIFWM4XEPvY4M4RqBWK8n9AgVocgQMR8+zckxwhYRwPNTIFcOWY4Uaf87gcoIyBgZgKUFoBC4Cwic0AbOKLcNIZYAIKQ2dP80oQC88aoOoBoJoNCsoDC2qekDMJkBcMfT8s4bC+YPEbwPwAi4IW6Fif0SbWijaF81HZTRuY0fpXYSCRiH9O6fi9KD4BCQSjYdIG7U0ecA4I4K9Q4SKQkTcO5e5Pg6cXi8aIpVhcUIIxSvs3c2YHGRueSKS2KM0SKWIYE1GdzMsZwYyk8OSpCZsN6dCXAJSvUA0E4P4-8ZcEfAbN0b8K9AITwMCN0afMabyusSbYycUTiB48nCaIKzYXMBGMCRYVkFcXwEjLytKWxGabKIpXK1TQsbYMkFkRqEUwrYQhGA4Ik40V+FcA8DVWS1KvJKqiy-yj6QKqy5A+wK9d8+SCdVuf2TqJGeMokJVDGeYAggS8a51PUck58jo5-OKwrGIA4X8vPSjf9M6gUM2f3CAWq-KrEbgo49zTYxkDwdaxdELI1ICza2HHDQsEfIQkU86LYckj9eJUJBKIkFS6S06p7QvabT60BTASeIgBtDOXKkUlcQ0EUlqWWIIHDS7M+Hgy+MhVqN63HD66rVlf-DlUFLlVxCFPlXK3qDMHRTIXqPYYGp5BRFVd5CtGG8rD-V7BG3TN7fTVjSyqwiazYP1HED1Ykbww6accdGuBzZJR0XaEbMmnVSrVG97RsK4BCYEa4VABOSAXK0kWkRuDPK6MsmkAbY4XEBcTY5cL1ekLWuteGymtdZjCDYBBrLic2+kEtC3PG5uVTVi46K9G7fLGIEbe7LHR7AWwgnW2jA1PTRjH21jEzLjG676qVC2uka25qikO2yO8TGO0kBcPzRkd2qbIDYWyoejdxE1IzNjDjHO82qTeILIK9RIhcBzUld+CTIIecHPPmyhWGwWz2kDc8WrKLaDBOQOoQ+JbGlS-YEU+2w6Ye3qR0eYZIWul7aenTD7UyL7YeH7dbfATbJe4Onu+kMOqugbQ6s8wkVuIQy0ErCepOtKogkXRfMvBsJmxIG7OWA4K3eYZwbwJ+ktZ-EbI8p0XwA+3++XUvV3AIsgGXYvEgsAXKp0fYpkZa63SBo6LEXvePLqAfZPJB+fP+7-AB93dhBZL3XABQ829pGKJIPwMkSMgIO62PPXS0XApPfAxO2fZOz-Wh7BlfD3AA9fR4-3QOmuPRNIHoxwbYCkSKMhwRihvAk6r+sRn+mhlBn-dKcgkIqgxoJGjrGHezeWVwIQuqi0QISuwtba1S29Pg5wOaoQ6hiR4x+hpktgIgVhvOwiEUx+EkbGrIbYKJTRhYfLaWMfNGV6+Uhk2c9Gnat++MuK4kLqY4T+qsJcxQzJQI0MMgcY26uJ78KJrx789SmchvN0q4zMtJ243KlSyKE4exo0YBxqpGXYJKoppplU3MuASYrKkJyWra2YZejyrYrI0qh-RSGsmU7wuUl00Z4Zj01p7MsAZQ3B3aIjLopGNIThgIJZnIeM9qBB5I50vPIZi45phcsZjk1AJElEkI82pIKsy5lGBSHNU0RB1J1Mxpx5kZnZxcjUg58+Y5lqUK5qVx3Y5xs8xMnw-IIAA */
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
        tooltip: i18n.tooltipDefault,
      },
    },
    schema: {
      context: {} as MainMachineState,
      events: {} as { type: 'FOO' },
    },
    predictableActionArguments: true,
    type: 'parallel',
    id: 'main',
    states: {
      tooltipState: {
        initial: 'defaultTooltip',
        states: {
          defaultTooltip: {
            on: {
              HOVER_UI_ELEM_ENTER: {
                actions: 'showTooltip',
                target: 'specificTooltip',
              },
            },
          },
          specificTooltip: {
            on: {
              HOVER_UI_ELEM_EXIT: {
                actions: 'resetTooltip',
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
            invoke: {
              src: 'checkForFigmaDocMessages',
            },
            on: {
              HOST_SELECTION_CHANGE: {
                actions: "assignHostUserSelection",
                target: 'reevalSelection',
              },
            },
          },
          rawMultiSelection: {
            invoke: {
              src: 'checkForFigmaDocMessages',
            },
            on: {
              SELECT_PREV: {
                target: 'reevalMultiSelectionSubSet',
              },
              SELECT_NEXT: {
                target: 'reevalMultiSelectionSubSet',
              },
            },
          },
          multiSelectionSubSet: {
            on: {
              HOST_SELECTION_CHANGE: {
                actions: "assignHostUserSelection",
                target: 'reevalSelection',
              },
              SELECT_PREV: {
                target: 'reevalMultiSelectionSubSet',
              },
              SELECT_NEXT: {
                target: 'reevalMultiSelectionSubSet',
              },
            },
          },
          rawSingleSelection: {
            invoke: {
              src: 'checkForFigmaDocMessages',
            },
            on: {
              HOST_SELECTION_CHANGE: {
                actions: "assignHostUserSelection",
                target: 'reevalSelection',
              },
            },
          },
          reevalSelection: {
            on: {
              HOST_INTERACTION_SELECT_MULTI: {
                actions: 'assignHostUserSelection',
                target: 'rawMultiSelection',
              },
              HOST_INTERACTION_SELECT_SINGLE: {
                actions: 'assignHostUserSelection',
                target: 'rawSingleSelection',
              },
              HOST_DESELECT: {
                actions: 'assignHostUserSelection',
                target: 'noSelection',
              },
            },
          },
          reevalMultiSelectionSubSet: {
            on: {
              UPDATE_MULTISELECTIONSUBSET: {
                target: 'multiSelectionSubSet',
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
                    cond: 'hasMultiSelection',
                    target: 'recommendingSelectionHighlightSearchText',
                  },
                  SHOW_COMPSEARCH_TIPS: {
                    cond: 'hasNoSelection',
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
      multiPhraseState: {
        initial: 'emptyMultiphrases',
        states: {
          emptyMultiphrases: {
            on: {
              COPY_COMPTXT_TO_RENAMEREPLACE: {
                target: 'filledMultiPhrases',
              },
              INSERT_PHRASE: {
                target: 'filledMultiPhrases',
              },
            },
          },
          filledMultiPhrases: {
            initial: 'singlePhrase',
            states: {
              singlePhrase: {
                on: {
                  DELETE_LAST_PHRASE: {
                    target: 'empty',
                  },
                  ADD_PHRASES: {
                    target: 'multiPhrase',
                  },
                },
              },
              empty: {
                type: 'final',
              },
              draggingPhrase: {
                on: {
                  REORDER_PHRASES: {
                    cond: 'VALID_DROPTARGET',
                    target: 'multiPhrase',
                  },
                  IGNORE: {
                    cond: 'INVALID_DROPTARGET',
                    target: 'multiPhrase',
                  },
                },
              },
              multiPhrase: {
                on: {
                  ADD_UNCONFIRMED_PHRASE: {},
                  DELETE_NPLUSTWO_PHRASE: {},
                  CONFIRM_PHRASE: {},
                  DRAG_PHRASE: {
                    target: 'draggingPhrase',
                  },
                  DELETE_SECONDLAST_PHRASE: {
                    target: 'singlePhrase',
                  },
                },
              },
            },
            on: {
              DELETED_LAST_PHRASE: {
                target: 'emptyMultiphrases',
              },
            },
          },
        },
      },
    },
  }).withConfig({
    actions: {
      showTooltip: (context, event: HoverUIElemEnterEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.tooltip = compIdToTooltip(event.payload)
        assign<MainMachineState, HoverUIElemEnterEvent>(ctxCopy)
      },
      resetTooltip: (context, event: HoverUIElemEnterEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.tooltip = i18n.tooltipDefault
        assign<MainMachineState, HoverUIElemEnterEvent>(ctxCopy)
      },
      assignHostUserSelection: (context, event: HostAppSelectionEvent | HostAppUserSelectionEvent) => {
        const ctxCopy = { ...context }
        console.log("assign Host user sel")
        ctxCopy.host.userSelection = event.userSelection
        assign<MainMachineState, HostAppSelectionEvent>(ctxCopy)
      },
    },
    guards: {
      hasMultiSelection: (context, event) => {
        return context.host.userSelection && context.host.userSelection.length > 1;
      },
      hasNoSelection: (context, event) => {
        return context.host.userSelection && context.host.userSelection.length === 1;
      },
    },
    services: {
      checkForFigmaDocMessages: (context, event) => send => {
        /** that's "onmessage" on the figma api: */
        onmessage = event => {
          const plMsg = event.data.pluginMessage
          send({
            type: 'HOST_SELECTION_CHANGE',
            userSelection: plMsg.selection,
          } as HostAppUserSelectionEvent)
          switch (plMsg.type) {
            case HostEventTypes.selectionChanged:
              if (!plMsg.selection.length) {
                send({
                  type: 'HOST_DESELECT',
                  userSelection: plMsg.selection,
                } as HostAppSelectionEvent)
                break
              }
              if (plMsg.selection.length > 1) {
                send({
                  type: 'HOST_INTERACTION_SELECT_MULTI',
                  userSelection: plMsg.selection,
                } as HostAppSelectionEvent)
                break
              }
              send({
                type: 'HOST_INTERACTION_SELECT_SINGLE',
                userSelection: plMsg.selection,
              } as HostAppSelectionEvent)
              break
            default:
              break
          }
        }

        return () => {
          //cleanup onmessage?
        }
      },
    },
  })

// external effects from figma page py parent.onMessage(HostEventTypes.selectionChanged)
