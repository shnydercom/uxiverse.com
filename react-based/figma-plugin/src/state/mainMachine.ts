import { assign, createMachine } from 'xstate'
import { HoverableElements } from '../identifiable/HoverableElements'
import { compIdToTooltip } from '../mappers/compIdToTooltip'
import { getI18n } from './../i18n'
import { HostAppElement, HostEventTypes } from './../communicationInterfaces'

const i18n = getI18n()

export interface HoverUIElemEnterEvent {
  type: 'HOVER_UI_ELEM_ENTER'
  payload: HoverableElements
}

export interface FocusSelectionEvent {
  type: 'SELECT_FOCUS'
  focusedElement: HostAppElement
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
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgC4Ht8AbXdABwGVdVcxsIwAzVAVxIBVCTyBiACQDyANQCiAJQD6AVQCSEkQBkRAWXkA5duIDaABgC6iUGXyx0pfJkMgAHogBMAZgCM2ACw6PTpwFYHvu3YAbAAcADQgAJ6IPsF22N5OgYEA7EEAnA52OsGuAL654WhYeFyklNS02LBkYADG6IzotZzEZfzC4tJyiiryABoy7LoGSCDGpuaWo7YIdq6B2GlOdgnewcHe3sk+yeFRCE6uwQuJKTq+aSlOaXb5hRg4ABYmuBRgRHWTVDR0mPhvH1qk3aFHYEhkGnEAEEAMLsGQCNQSCg9OESZRSBTw4ZWcZmdAWKwzBw5bCJObBG46OzJVx0vbRYKJbA6Bxs2JzbyBDLJO4gIpPF4Az4EzDfSp-YVA0UgsEQzRiWHwxHI1FgigQgDiShxozxkyJiBJrjJgQpVJpdNcDNmzmCi0SqScDnOgT8Dj5Auwz1gr3eIos4roACdUAB3ZRsUhS4EopRogAKYhEQl1RhM+MJ02iOmSOmwNO81KL8zsaWSDhtWTs9ocS0C3jsPhCl28noe3qF-ulgYqIfDke4MZlcZEaLUIj6Q30uIzBuzB1z+cLxZ0pfLlci9mWJtpiWurl8JN87eKPr9gK+fewoYjUfQw4ssvBkMVcIRSNHaI1am1IjTYxzqKhqLnmBbJEWKxrmaG5VgELg6EsawpK4aTBLSHoFPyHbno+YrXreg7Rt2wKCKCL4KkqH6qvG6pajqTgjOmEzAQuPgZNgyQhMkaR0hka52HBpJ+HSOhJAJGynoKvp4UGN4DveeHPvK0LviqX5ghiWIyAB+qsaAMybHEHg6E4wTOOc8zrFW1K1vWqHcuyJ5YV6uEkaKcmEYp7lPhpEgAGICDCUgULpQFZgZ0RePaXIrF4XgOK40U2mZZpkgkiVOIha68W2Lk4V2l4edeyDeUVgYsAARm8uDKa+VHqWqyL0f+M56uFUyRQcyFkhBuZeN4dJmbsW4HLl2AkpkHhcUEriJVJnYyT5+E-NgpVDstFBVTVdWUWpn5NT+f5aIxs4sRFNj2IhLhshBmzBKZmRujZ3KcWyLq8U2GxbAtbnlStlTrcR-1bdVYC1WRcr1ftNFjppmLYm1zGZp1l0HGZDiLA4yQQSSTpltao3XFl6XOkl2WoYev2FQGAN0EDD6bdt4PPgAIiIGlhedqMzE4yQPZxXLOIlOPoSsVbNgW73OFkmwOIE1NLSDBHhhQWBQB8SmQxRqnKgdtHogjOlI4B3MgY4jjYIEyxrLEc1rEEKX87WSSBElZk3FseX3MUwZ1PgyDIGAmAQDQxWrX7tQB0HIdhxYMJECYkA8CIrODBIMICMoCYolCYgwnwXMoyBLompcFIhEEEGuI4No48kE3nFyaxZbS6wLZH0fB6HV4R-7gfd3HmAJ0nEAp2nYLJmoULKOIIgJgosKtUxpvFwumRl2aRyVykg216N6RuI61IZG7FYNh3-cxz34eVJA+KYFAMIB5QYCoMGtSPEGPD+RCMgUHweQE8M5ZxziIPOBci7zi6s4TeFdYi7xrpufYqQFgPU2GsJKCCnCXyjgPWOvc74QAfk-F+bx36fzklgfEqAiDP2QK-ChjweDJkzsoWeahWYSChAoBMfAoQACERDwhhDwhQABNKB+k0YWwbr4O6qR3BmTCETMsJxXbmWtnWbGuCu4ENvnQe+pBH70MYR-L+15qGkFoaY8h5ieAAIEAAdRAdnXO+dAHwhzlIi6MxHA4wmmaIyjYspHBtEWe0qE0jRNcLSQ8dZeT5V9lfQehDDHEOMaQhhdjKEERSSHdWeE+DoCgI8IgJTHh+iYewMA1hap+TYWAiBgDWFZ2UD4nmOYNgTSLJ4Uy6F5bIKihBI+SRzIkibjSXR+Cb69lWkY9Wti37mM8vk4hj8ikVPKaUqp5ial1IceAjxL4JCL3EeIUKJs9K+K6d4HpJksrDUGTaDY+ZTghGWA9RCIRpnXyHnJBZJiyHLNyX3PB19CnLWKaU7ZlScmPH2fUo5BcTmaCnJcle1zOmLm6X4B5-Tz5DIQGkBIpoxnwUGUEX5qSDHYEBVksxoLKidxmZC-60KykVN2Z-RF7RRCSEaRIARYhnEogkK09hIhOFQj1h0kCWVcW9NMgS55RMspxFdiEeWzpT7BGpfouZRCSFLKYas8F3c2W0w5bC7lCLam1QANIiHEUmDmFBXEJiFSKpxYqJUcNZjKj8cq2LZDuXivpTznpE3OHEd55lDjbG5Pq2ZdM6UZMWcC01eTzUFI2VCrZXL4W8tTunQV7iC5ounJijq8rQ33IjQMqN+wUhpEFiZG4lxnQ+GTf8689KTUrOvHgxlCLyCwDUP8ZahzmknLORc4NXUFVhqVY8xtRKeKts1fzEsd1vbYWSTmlNAL01AuySCixq1h1FrHROpS5bAEQgkJWjFZ016LrreG5VkaiVpA8FbDRfMrJnx7WktNxrM2DsvRBnlN7J3-XHqW0BqpmmVoXWjJd9av1rptDBAsUTeLlh4v4kDtL+3QYvZUIgqAIhgGDPChQ+BUDrKgD-AQUhOGzqhOcsQL72pmzYtsFwryxJiRyDcJwNoSXGQeZseYlxrYkcNek8DZ6s2rSozRuj56GNMfVjwOdkg1ACDBIFdjrM0O80E9gYTgRROoSbC8v9SrEKNhJT4PISScAsr+aBsjqnIOVCvee9gY6FDUdo+O-AuB-L4BYCHBDYIy3Ir4Khq5NaFyyPiNjTYij+kqP2F8+IJkXNllWB5n2Xm1m9vmSehl8K5JBeqWOxFE7ouxfiyWxLSH72perfxrqmX5E5bmHlyTpkiueAiaZNCODPM3iq752rA6mV0FoHU+jjHmM8ErRIIzJm2OcIs9EKzNm7PibGy4FdU3rhMkU6mvzI65JrdtTprbpmOOPt66+6B6GTu9NsyEezEno3Ugm6ZWzzoKzlf3ZVw91WjWZOWxRugNQwAAGtTFCHQGAMMxhgxIoNo0+94qxxtKOwcP7HgAdiYc9Gwa-6xmwMTehO7x6VOPevKjjHL8sc47x7Vdjgh+Ueq9aKkQJO2H+sDYicnCrW2Q6LHzXwsTywpU8AzneD13DZFZ322rYhg6oCDgbsgVHahgG-r-NQ-9AGdZJ9PWeyYF5L3JxvRYW9jgIOrvvfYX0HRJDpHdbG8tbhze8zSpTYHMkG8wEbsAJuzcW77Qw3AEQY9x4T6gc3CXkTsDzuwPhioUTk+OHENCEEghjIwoEKsLoyRzHLPuMsOQ1y65qyQ9PxuwCm6z0nsFejmPfHxwmR4oZYBgBz8oGQrNWZKEL1CYvaX+vobdzyRs-gBm0993XncjfrbN-cNDr04eDX3f14brvPfzdmoH+rZQ6AIAQA+CPsfE+hedGFWLiQJO-VSoDbKpfN9dDJke0akVCdCa4R6dCKsMCaJaJbYS4F0WzVkNvBHdWTvePbvRPG-VlR+e-R-Z-UfVAcfHgJ1F1ZMCgd1T-H1cXX-aVAAvrIA3mEAlkBvCA39Z0aAg+LINwOA7YByMsLITCCrebOHRbDvC-TAq-PvZlNZO-B-J-MAF-YgifTONQX+MQVQKfGfOfPgIvZeb7aRZgsyVg8AhAqAkafYRKGKYrMSN2N0H5MPBbUjc-WPS-bAznMAdHZQ8fVmJgKxGUNQjQrQ6fWfeePQhfAwvjJg+wbRTiBvWJdCDYRKIlAIBuWkGJGkRIKkJIBaBmHwmQwxFPCIIicgIg8fWAHgTOBMcRD1dgKcJ9AQe3GeOeZ3GEKI5GH7PxbYK2XpQ4OaD5NYSw+wIJTiV2CJGsLiDIPI+8AogFYo0osgcouAHgCEFEMQMEefRfRgro+wJkXozwOkeWJkIYqsL2AscY1kM0TwRJEQ-I5YuSRoIgD4CAUogoyo9mJQTQLhReciLYjo1eXY2YfYhsQ4gYk4rg33RsXcV2cAqTNkPdL0e41-R49AZ4yAN45Y2AKodWQg1-HgT44RcXX4zYiI7Ywwm5BAZwFwUsBIElKyVCLiKscsVtBIMZC4dYZ0GY7gOY68J4l4zE1-bE0wR+PElQngKEGfCQf43jToowo0LwNwIJa4QaQHcsGvUaF0AWNkkIN0TIRKaYubZElQ1E9E142YrE+gUMKAKAdWAolhEQAQMQdmSQGU13RU2klUhk9Um0YWBCU4Y4DdLwCCbk0gXk1afkjEi0oUq01AG0u05Y1YzUIzZMd0mk5U+ktUpkzUsyS7AM1BW2REjsY08fU0gU6MlQ7EksifSUrhdjIImQTQ1OaUskgErFECPMWNKCZYTkB6TIX0xIUA6E0yQ8HYPVI0is0svktE8snky06sgknoTQXbBeEKdgJxJo-48nTsq2GWCsZ0FYesAcvmeIYcxCHIW7CcuclE6cs0wUystaSc1QxEYIls-Q7cpKazGWN0VkVkeNX0sSBuGNbXBILXRwUM9AcMyoSM8068h8hc1mRUTUN8yI8nEsTiB5PmLiLtQSTUi2FkfMisIII8CCqCugGC+8iox8uCkgwk5clENQ2fBfUk98wAoEkkGk4rHIGsdwJtI0X8gi9k44e6WbLCP4BgeAUYAUCk7FAAWjmBtFks-LgPQlzEZPcwVjmwIFaHICDBkvNkJn2B1XtC3RuGtkuDSAWm0u4HKFWgYGYCjBaBsv0oXFSBSlWF6kggCDSNzEsq0tKF0uvGqDqAaCaCcrKBcq6liTiCCBWB4qZBdEsncpPN3mpG8ppF8sVgvFpj0uiKBIUqJjzHzGOCSB8EsiLArCytkmvElGWkirRjcqJnMmXGyD8B8AytpFDxEL+hypVjvA2n+nqpmFSExi8DYN-TdAeg1KMpOMWDWESjmgGJriqs2hKjKhyuZlwCGuiEritgggGjXB4iSBsnmDekyE5JyjmmEJh0Wmyp7FTVvDVlFItzqryvlNmAbBNDxi2HOH5kPF4hOtbUcDZCyBrgcl4lQLAG2tmEMsQEPDBy4iSFij-MhtEIHyHhHnHwgGhsau33zHmCSArArx+vOFRoe3qz7GhqFgdAbzJhHL5htBrgQmKzdDc2yCPw7BPyPT13ZwptWgCJsXI2hppHQms2WG5BCVSDWBw1JH6jmmuDdi5BuDJqW3IxwIhTzXZQLR2SLXtWhuthcCWFpsSnpuGIQG5AWGlhriZHPK5BVt5vPQa3IxCzIEizwhxqCBZHQiOF4mWBuFiHCWuBZHwyOByB+tmxEK5vh2U0RzVpKgeDwhhEeFQEfkgGFtZFjRMlSEekmlhsXDEnrQSkExxiLIPXRvENjv8xW2wA01ow2100fmhrKtGr6ibGLHlhrkcwbiSkJspBSBlg5rLpmWjqjwzSruR2wEaz2VC3C2DEizazi2xrespKEMzumiyGdFzsc2Zs8AxgenWHHMjucMj3JsdqHWdua3tVaxi0XvTpJDcDEg+h9syFV1Gl-Wk08DrEPK8EHth3LpcIdrU0qGe3ruYybvQr8BgkuGODMgSDG0iQDKyk2GdFLr-uHorrHo51Wi50x2x1x3wHx3AdZE8upHVV8DdlwqMqbjJS1QTWyPtuj0kMz2v0puXuxW8DQgLHQjZLMjLDSBSjZBZBMhGwehJTNC6puqjowcfgwOYcKLpWKNkawN731tOsmJ4diGiVr3zC3j3z9pb1-rRvQYAcYbcKkI8P71wKgCH1wAKKbtzDuWyGrmrm1WloPjr10cTX0cPwYfQKYeUZYcsY1qgHwMULsbYflUGjuRXBiCCWxkodiJ0Yby8YP1bycLEJMb8bMbkbki5wKL8MaEwCAPbIywxgmjgJGw8EpDmiEjw3gJ2HcEDIjskePrPwkOyYCfkcYDYCIHCblJXobEuwyPgL3i5FrxNE1TLB4mxiXFQeorDIeNYf6exQKt9zmgbkrzNGxlsyOD8FIsWfmQWPvCWKFI9rOMEbdkSD6OuCpSvIWZvIjJnKjJorgGhspCrEpBcEr2QniT7v2YeegqedgvuYfJFI1iUOWPAZMpMnljPhJA2AArrx1I2GEpbn+ZNNvNnJBaorAGKJxteliUV3XzrD7uZP5jGNKpWHWHsIkaRKfLLOeexbgFjPjMfj6cBPeshwHNJGRYLPWDmerIZeBcgvnKfPxdbUJdMmJbQkuF9ICExiMiUSWHMnmHyHyCAA */
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
              HOST_INTERACTION_SELECT_MULTI: {
                target: "rawMultiSelection",
                actions: "assignHostUserSelection"
              },

              HOST_INTERACTION_SELECT_SINGLE: {
                target: "rawSingleSelection",
                actions: "assignHostUserSelection"
              }
            },
          },

          rawMultiSelection: {
            invoke: {
              src: 'checkForFigmaDocMessages'
            },
            on: {
              SELECT_PREV: {
                target: "multiSelectionSubSet",
                actions: "assignPluginSingleSelect"
              },

              SELECT_NEXT: {
                target: "multiSelectionSubSet",
                actions: "assignPluginSingleSelect"
              },

              HOST_INTERACTION_SELECT_SINGLE: [{
                cond: "isSelectionInSubSet",
                target: "multiSelectionSubSet"
              }, {
                target: "rawSingleSelection",
                cond: "isNotSelectionInSubSet"
              }],

              HOST_INTERACTION_SELECT_MULTI: {
                target: "rawMultiSelection",
                internal: false,
                actions: "assignHostUserSelection"
              },
              SELECT_FOCUS: {
                target: "multiSelectionSubSet",
                actions: "assignFocusSelection"
              }
            },
          },

          multiSelectionSubSet: {
            on: {
              HOST_INTERACTION_SELECT_SINGLE: [{
                target: "multiSelectionSubSet",
                cond: "isSelectionInSubSet",
                internal: true,
                actions: "updateSelectionSubSet"
              }, {
                cond: "isNotSelectionInSubSet",
                target: "rawSingleSelection"
              }],

              HOST_INTERACTION_SELECT_MULTI: {
                target: "rawMultiSelection",
                actions: "assignHostUserSelection"
              },

              HOST_DESELECT: "rawMultiSelection"
            },

            invoke: {
              src: "checkForFigmaDocMessages"
            }
          },

          rawSingleSelection: {
            invoke: {
              src: 'checkForFigmaDocMessages'
            },

            on: {
              HOST_INTERACTION_SELECT_MULTI: {
                target: "rawMultiSelection",
                actions: "assignHostUserSelection"
              }
            }
          }
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
      assignHostUserSelection: (context, event: HostAppSelectionEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.host.userSelection = event.userSelection
        assign<MainMachineState, HostAppSelectionEvent>(ctxCopy)
      },
      assignFocusSelection: (context, event: FocusSelectionEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.host.selectionFocusedElement = event.focusedElement
        assign<MainMachineState, FocusSelectionEvent>(ctxCopy)
      },
    },
    guards: {
      hasMultiSelection: (context, event) => {
        return context.host.userSelection && context.host.userSelection.length > 1;
      },
      hasNoSelection: (context, event) => {
        return context.host.userSelection && context.host.userSelection.length === 1;
      },
      isSelectionInSubSet: (context, event) => {
        return !!context.host.userSelection.find((val) => val.id === (event as HostAppSelectionEvent).userSelection[0].id)
      },
      isNotSelectionInSubSet: (context, event) => {
        return context.host.userSelection.every((val) => val.id !== (event as HostAppSelectionEvent).userSelection[0].id)
      },
    },
    services: {
      checkForFigmaDocMessages: (context, event) => send => {
        /** that's "onmessage" on the figma api: */
        onmessage = event => {
          const plMsg = event.data.pluginMessage
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
