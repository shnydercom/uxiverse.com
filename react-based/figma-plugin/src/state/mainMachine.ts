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
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgC4Ht8AbXdABwGVdVcxsIwAzVAVxIBVCTyBiACQDyANQCiAJQD6AVQCSEkQBkRAWXkA5duIDaABgC6iUGXyx0pfJkMgAHogBMAZgCM2ACw6PTpwFYHvu3YAbAAcADQgAJ6IPsF22N5OgYEA7EEAnA52OsGuAL654WhYeFyklNS02LBkYADG6IzotZzEZfzC4tJyiiryABoy7LoGSCDGpuaWo7YIdq6B2GlOdgnewcHe3sk+yeFRCE6uwQuJKTq+aSlOaXb5hRg4ABYmuBRgRHWTVDR0mPhvH1qk3aFHYEhkGnEAEEAMLsGQCNQSCg9OESZRSBTw4ZWcZmdAWKwzBw5bCJObBG46OzJVx0vbRYKJbA6Bxs2JzbyBDLJO4gIpPF4Az4EzDfSp-YVA0UgsEQzRiWHwxHI1FgigQgDiShxozxkyJiBJrjJgQpVJpdNcDNmzmCi0SqScDnOgT8Dj5Auwz1gr3eIos4roACdUAB3ZRsUhS4EopRogAKYhEQl1RhM+MJ02iOmSOmwNO81KL8zsaWSDhtWTs9ocS0C3jsPhCl28noe3qF-ulgYqIfDke4MZlcZEaLUIj6Q30uIzBuzB1z+cLxZ0pfLlci9mWJtpiWurl8JN87eKPr9gK+fewoYjUfQw4ssvBkMVcIRSNHaI1am1IjTYxzqKhqLnmBbJEWKxrmaG5VgELg6EsawpK4aTBLSHoFPyHbno+YrXreg7Rt2wKCKCL4KkqH6qvGYIYliMgAfqwELpscQeDoTjBM45zzOsVbUrW9aody7InlhXq4SRopBtgyD3nhFAsAARm8uDPvK0LviqX7qlqOoznqQFZqAMwxCcEG5l43h0lxuxbgcaSHtgJKZB4yRmoErgOHkEk4V2l4yde8lDtJgYqWpGmvlROlqsi+n-k4IzphMLGmfYiEuGyEGbMEnGZG6AnctgFZsohrhNhsWynoKvqKcFClhWKEVgOpZFytF2mfnF9HYoZKWZlM6UHFxDiLA4yQQSSTpltaDnXE4+Y+M6riLWka5OW2flngFAb4T8cmNYF4Wqa1z4ACIiLpTHGUNNjRMkeUlVyzg+ZN6ErFWzYFmybLLOcviBDVnZ1U1sm3hQWBQB8eFRZRXU0WOdGYn1yWAalJn3bajjYIEyxrLE3lrEENpOI9tZJF5XiUisEHA8GdT4MgyBgJgEA0EFB0M7UTMs2zHMWDCRAmJAPAiOdgwSDCAjKAmKJQmIMJ8DdGN3cSa6LGaRwhEEEEVZu+yTckLkAw2TK5kcwT04zzOs+zV5czbfP26KQsixAYsS2CyZqFCyjiCICYKLC-79ejg0gZkJqXBSOspDZjhVsVq1nGWDheRWDbWzztv8w7lSQPimBQDCTOUGAqDBrUjxBjwABiEIyBQfDyF7Usy3LIgK0rKsRwuzjR1rxyxPH+s2qkCx5ZsayrSPTjZ7zdsC-tBcQEXJdl28lfV7JWD4qgRCl8g5fb48PDJtLyj+2o50SFCCgJnwUIAEIiPCML3woACavfzsNjg0niBNTYqR3BcTCPNMsJxKbcTxnWCaC9c4u17AdQupBi5HxPlXGu1496kAPpgre2CeDNwEAAdXbrLeWisW7wjlr-NKWNHCTRcmaNijZFpHBtEWe0qE0j8NcLSQ8dZeTbRwNzReedOar3XoQiu2DwZOztlDPCfB0BQEeEQdRjw-Sn3YGAaw6ldKUM7t3FuF8ZbKAYZjMy2RvAuSLJ4Ti6F04G2iGTexKcQjsgBjSRBztl6yTQVDORp9FE52diopqaiNFaI0bo7B+jDEkK7jQl8Ehg5f3EBQaxascwbAcRxRadlXE2g2EtGByw8qIRCP4pe+c6DBIwZveRO8CJKLZlE46mAYmaO0Qk6uSSjGpKVukzQU4clh2YjY-J9i-BFOcZnNxCA0gJFNEkDkzo3RBDqVIlBMj0Eb2PkQtpjsInKOLqo7RcSdEnMeEM9oohJCXwTBIZ+YhyEogkBYq+Igb5QmVGoXJIFFoFPmU4kphV5qLTiJTbxcCMi1LETeDpyCV6NLXoc0JCj2nnM6Zc6J1z+l3IeQAaREF-JMV0KAmLeR8shXyfnX3OgCj8wKFygrmY4ziizSnzXOHEU43jDjbG5LstFQTMUhJaWE3Fki14Eu6b0m5Az7kGPUuLSWLzVRmPGdONG0y8mLjBdy4pLioX7BSGkZ6HEbiXGdD4cVgTrxNKOVg05lQc7uvueQWAah-hNRSWY9JmTsnsuGpywpELzXLOSPw3GlNHolhylte4xQJFIOdagqVzTjmtJwQdL1JLfX+thtQ0ZEIJB6smQa26IK7FRp5ZC5Z618xwqZLSEIGcnUNOwK67FHq6BFvzewEtAbumey1R3HVNC9XhqxpG8FTaY02hggWPhTlyxxuYT26RGLZEypxQdIgqAIhgGDHchQ+BUAKqgPXAQUgb4hqhFksQNbZyqxBdsFw5SdCBD-TkG4TgbSrPYkUzY8xLh413fs-dWLD2DuwCes9F781XpvVDHgobJBqAEGCOuD6b7zrMt+7Av7-0hFQk2MpHh4gcUQo2VZPhfJpvEairNBzpV5tlYWhDPqyCwAUKe89fr8C4DrvgFgbNJ1gm1eWvgc6pl1oXAA42vgcqgOcRA-Y1S6O2sY6sFj2F03sd7f2vjslh16N9UM-14nJPSc1bJ6d8nFO1s-SpzIangFbDmFpkDnE9OcR4ZxNC89kUZoCWZnNbq7myVoIYy917b08D1RIXD+HCPnWIw9LwZHHEUcA9Rhy60XCmpC9cJkMH0V9piwOgtlQEuqvQylgjj7b6Vrcx+vuEbSPkYA1R4D-LqRBcSPlCsRmvSRfqXu2rB7uNHsqDUMAABrTBQh0BgDDMYYMwzaImPk98sclicsHD6wVgbQHSa8QTRsgeor0LVclfN71slltrbLhtrbO31KPsEE82l7zPkiCO5fZlrLESndBda50lkPFvXLNdwL7agh5XcNkJ7LqYtiFZqgFmOOyAntqGAWuDc1BNxbk5o7vt-bJiDiHU7UdNaxxHnrRODlKoOiSHSHKE1063Ai6Z2brqceYDx2AAnROScuuPrgCIovxeS9QMTmTyJ2AK3YI-RUKJTvHDiGhCCQQNkYUCFWF0ZI5jln3GWHIa5MfZvXgr-HYBCfK+l2c+VKjqC7YTI8UMsAwCq+UDIc650lBa6hDrpTHmI1M55I2fwLjiv7EcEtS3orlhoXcJNjs029k1ZF7j53rvifhM98XZQ6AIAQA+L7-3gf-udCBwykHR2mV-JZYCqHTJ7TUlQuha4+V0JVjAvw-h2xLgun-aye3nHi5O4ly7qXZekFQ0r9X2vfvUAB54OSylyYKA0ub4y47vz-ld+jz1hdPeWSW4H6V6acF8wbu2CJMsWRMKsZRXiiVWPHdF8XxL3d0qDz1vXXxrzADr230D2ljUAbjEFUGD1D3Dz4G11DncyvzMhvz7wN0H2dGHwch8ntG5Q8G5zdCRS-1AI4zgyhgXyV1L2vHeygID3OiYDwRlFgPgMQJDzD0DlQMj3QO6z-iYXgRKkt0EXQg2B8mWQCGNlpAERpESCpCSGBhClIGYOAMaVlwiCInIC3wD1gB4GlgTC-hMXYCnCrQEGpz9gDnpxhEEKMhjyYW2FxkcUOG8hCBiHshTzYRKkph4RrA8gyFUPvA0KCW0N0LIH0LgB4AhBRDEDBAjyjwwOEJmBrBcAbE8DpHTiZDWG8PsC2HsSN0yP508FES-zUPQDCOvEaCIA+AgF0I0MMMuiUE0FvmDnIiSIcIGlSPsCZFcKyI8NyIIJT0bF3Epn71AzZFTWMxwEqOqIOlqPqMaOiNgCqChk33rx4BaLfhBw6MSP4OSKEMYWJDy1LASFWT4lQg8irHLGtQSA2QuHWGdBCO4AWMqCWMgBWPrzWNMGLk2OgJ4ChFDwkC6PfUcMwKNDOLYWuBsko3LFN0IOyHzAeK7TZEcFQk-1mMOjeOiNkk+IaNCNWPoFDCgCgChg0PPhEAEDEEukkDBMZ2hJWFhKuIRJtFegQlOGODjSWA8VePULxJqPQDqK+KJJ+JJNQDJIpOiNiM1Fw2TEZJcHOJZPhJuMIK4jKy5IngJhmK9HmMFMWOFOWLFOgLWP1K2OBNvkfU4JkAQPFlBMOO6PDl6IQDzEFSgmWE5DykyHZMSF7zGM4kPB2CtmRXNOgPxKNNFNxPFLDJ3x2M0HSyDikFBDISsK6NOzdNxmcBpFehWHrF9LJniADMQhyCq1DJNIDwjJFMJOjNNJxIFK2JtIQIdLQIzNWjI2zLdFZFZG4iG32Cn2NgFXRwSDR0cH5KqINI+MjJrIbLrNjMD3OkVE1BbIENOxLBKiKTJg8gdTsHZIARZC1IrCCCPHHPeLoAJO+LnIrIXJ6ATJRFgLD0jwONbMvxdJJCVPoxyBrHcAtSNG7IPMeOOFynCy-ykm6XBgHCOj2jhi0kBURm-ASi0CSmOJmQOG8AyD8PQickxLXF3I52-IcTpD-X-Qqg2HyCwj+AYHgFGAFBQqNQAFo5gbR6KKoWQOIcyjgywE9dSOwCBWhyAgw6KQImL5o6x7RE0XQXRGxsggZkU+LuBygDoGBmAowWgFKhKFxUhSZVgyRLIAh9K8w41gZ5KyhZJqg6gGgmg1KygNLhpBE4gggVhvymQXReJtLCz45qR9KaRcw0hgYwK9pBKISXSRL9gyZaNjg4VEJJpBF-LdoewatJQmpbKsYtL5puJlxsg-AfAfLaQBdQL4re1CIoKEqUqZhUgxovA791o3Q8pESwrcjFg1gfJvIPCKo4rQZwKGpQpwKWpcAyrogdZcYIJrI1w40kgBJ5gSp0TniNpvIsTJJCrZsIYNiSdkrgqTj7AGwTRpothzhHpDwnJJrrVHB0TcKRInJZ8wABrZg5p9hnIN1BEMImxxJKChdYNv95Vl43YA8IAbq0qU9zd5gkgKxDc9rzgrq5t4MFtB0bqXoHRLcVpAyyYbQKp8wx80IawQhPAFrc93qC86sLNcFMB95D4+MbqaR0IyNlhuQOFUg1hV1SQrJvJrgvIuQbhIbzMYaGsQxUUuk9plViUR11Ubq8YXAlhEafJkb8iEBuQFhfofJ0iSyuRObCbubLM+NR0BNS11qejNrXSggWR0IjgnJM8aw8L9gLiWRHr1hDw8wQLsSqDosXs4tgoHg8IYRHhUBi5IAKbWRBUOJUh8pXI7qcw-0o0vAJovBJoeKTMf9qCoauNXtrxkNz0ksMNi4bqfBWRdLIIYVAYKoaNjYvFHpLgKwdxVaXb80NbuatbBNhNgxRN7MpM-qNrUKP8A73IshnQQ6aMEJNzuI8p1gQy3r47nbobk7eNa6bN1U7MJMW6-aSQ3A-0XQnJKRMhEcSsRt6NnQbh0KvAc846vrx6k7XaDomt07b0s71y-AYJLhjguIEgAteEuTFpNhnRY62Mx7hc1bJ6lswBVt1tNttt8Bdtr6c6PFqR8705C7+VNh1lhVBElDK7Dk6Cl83cgq9bUL0L7RAiHiuIyw0hSZMhFgMavIxqmQjgUHaCAD6DNC+1tC0GgDRapq8H9xYh+Ezc2109rcs87dBdv6PrC8xdi9l85VV9LlvdcANCs7cx7Fsg9Y9Z04YguHcYeG8Ybds9qH59aH0GGCPcJGoBwCASA9r7nIVxzIVgJoLb7BzctYrcNG+HD6v7j6f7-8RHACxGDomDojWDGgSbhDDVhLRoXIx8-MPBKRvI4JcG+Ftgth3BuSHapt8bntUHdGgD8S2AiAZG26jVjyyt5Dx8E4uQzcTQ4Uyw40JolxP76yJz69MHnT9bQr7BvJjZijaRvSKrTzJytCyA5dIjVj-qbHZgjxcYU43DrgdlyzazKyhTqzLyDCbrKQqxKQXAjdUJWQ9q5hnHamzzsALzrzfjVqcmsGjUYhcYOJ04M4SQNh2T-zUSNggK1gkmOx5yqzjSZm4AGG+n9hTmQIgi3A4cE8xLLhbjHo-Ckh8Z1gvIzRun6m5mPnZyDCJSpTi4TnGnULYdfTSQHntT1gam3mEWoykWvn5z-rk4gWrG0JQXCCAgxo2IwElhuJ5hyLcggA */
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
