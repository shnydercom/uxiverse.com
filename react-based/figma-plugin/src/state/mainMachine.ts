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
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgC4Ht8AbXdABwGVdVcxsIwAzVAVxIBVCTyBiACQDyANQCiAJQD6AVQCSEkQBkRAWXkA5duMSgy+WOlL5M2kAA9EAJgsB2bAE4AbBYcBmAKzW3dty4CM1gBYAGhAAT0R-XwAGbDcoqL8-N2TXCwBfNJC0LDwuUkpqWmxYMjAAY3RGdDLOYnz+YXFpOUUVeQANGXYTXX1DYyQzSwCA7GsLOIs7OwnfFxsXEPCEXycXWPjnTzcA3wAOPesMrIwcAAs9XAowInL+qho6THxr27L+hop2CQpWgGF2DIBGoJH8+ABBNQAcREPT0BnQRhM5gQI1GAU8E2m1gSASiewcS2GUV82HiJMcLgxDi8LmOIGy50urzuiMwDyKACdUAB3ZRsUgs95sni-JQAiQABTEIiEcL6bORES8bmwB3GuwmCQ8RIQVhsGyiE22dgxI3pjOwF1gVxurKMHLo3L5AvQQo+YpEErUIna3UGvQRSMGKN8KrVhwsmri7msuqsnkNLj2sYCDiiAQtpytzLtwodhToyFd7rZFBYACNrrhPt9PQCgSCwZCYfKgwNQCi0dgMW4sXYcVT8YSwpY5qTye4rHNrNZvFmctbbW97oXsMXuKWHZXq6L-t9pbK2-0laiRj3MV4B7jh-HtWT4rHpnMHGmF0ybVv2WuN4K8-cdzAGt62+H0-WPRUQ0Qbte37Qc8QJO8UwfbU3GiY10kyBlsyXL9HWwZ0KCwKBbi-Wsfn3RtQQhaFYQDeETygs90UvbEb0Q0c9X8OwUKpOx5gCOxDkzLDLVw-8yzXTkwDAAA3VAiDIwQvgkGQNHEcEG2BCjxW+ZQpAUQEIODTtEH42wpgHAI3BpaJaXjKxRjiI0LD2XxogcBxfHfHNPwkgtHgImT5MU-zMHItTNDETTAW0kCfjUqElGMjshmYi8+yveDb04-VbEnNMAhcLz51EnDcxXSTAukuSFKUgQVIAEREECUtPHYYmsYTkmsMM8TTeM-FGckbDmOxfBmI4ysXCr7W-argoU-lNzC8sqyAngpElRrwU0CR9MMmQQMbCgpAAIV+f0dAYyDTJWcN1SjXwtVjXUJrDJMvCKjx0zsHzpLKfBkGQMBMAgGgqq5cogZBsGIaMP4iD0SAeBERqulBARlElX5wTEME2qYlx4mwPi7HiEZxrcjjlhTWxkmSFMommNCbH+6HgdB8HVwWwHObh-pEeRiBUfR74ZTUcFlHEERJQUTS6OuhUTLS+YYjJinBP2fYR2WVy9jGWdxm8AIUx8CZ2b52HuchuhIARTAoD+IHKDAVBOTKM58KwBEFOd5BXfdz2eBlP4seltRGokcEFElCEzpEQE-hjhQAE1CbuqwdjVTwEipA5XMWTi5g8Q1-AJGxkj+6acABmGufh+aint0hHf9wOPa9tcfdIP2XeuIOzlFQQAHVMex3H8b4CRARxjO0qsQ4xkOFNXK619kl1HZRhTeY9gHcb9W8mugqthueebiAHad-u3c7-C6-5q-Ha-Ph0CgM4iHfs5bUH9gwFMMBfc48cYiDxmCCQodw7z1DFEUuqwJgTFNszIab0FgoV8IJNwKZ942UtvXAWttsAt2Iu3Ae98pIc2tsRV+38v4f1-p3f+gC9zgOnmpCQ8tU7iAoDAiIcDbAIMysg-imDdQmx7NMFmLhrDuDctXE4ORH7W0bvhEhbdb6DwflQrmNCwpvw-vQn+5DPbMKAWw1SIJNB+l4fRZWqVYHwKcMIvYKCxHFzgTEZyz1yZdWJlNRRtcdGEICpfa+ZC76e20WfMGejKpGAMZ-b+jDTEAJrIIUQkgw7YwkGdMQAgR6-EgV6cOIhI67UbHwlYAjsBCKQa40RwRi4TScvEMMFhME4lNPgp+qi1zqJvgHExXdeYEOflAWhhjknDLMTwAA0iIVOh4KAUBAbk-JhSRDFOyRHHasU1BVLsoI5x9S3FNOWO5NMZc0QeEEnsESgTT5jL6YFAZEStGUJieMyZSSGEzLSaLDG2TJQUTYdYq6IBAyMTukc2pJydgNNQZxLqFhSYuHRWGfezMrB0hPso8+RC3maIoYFPmHdTHkFgGoF4YVWFT0sZw8E3CxC2KVu2U8sK6kIrOeIqIDhJHTEOA4FMQkvI9JURfO2V9W6DPJSMooZKZmUupWRSeECOHgtZZCm6KtHHHMQdyxpb1NiGkfHyvws43DioJaEqV4TiVRLXIqyJZx2DKppfE8KaMgVYxBWqvg4LDk1K5SIpFyxZGjHRei-EFgSTzE8takJTc7UyveSSooRBUChDAJyYZCh8CoHGTwAAYgIKQkcGVcJ4YczynUZHCr7PxPwrljVoTRUOAS6p3CJptra4h0rSEOvlXQTN2bc0uvzYW4iPAq2SDUAIb4pby2NRremMY9a9iNoxS2zivj23zGiP4PwpVHn4qTWogdGihkuvws6v+lKFBZpzVS-AuBi34BYGDQF3xgWgqnoGux7KmJZx3rndFps9iF15bYKNB6SSyImlavFwTe3Jv7fa69HzSVDrdWQWAZjqVvo-V+71P7fV-rBABtl0KF5IJzjGfOkGUzGoSPu7wVcbCzh7S8sJqah34VoIAvNBai3gokPOxdZbI6rrrdYBtUxt17BY+sWD7GvCcYCdhJRKGeMpsHZh9NdBBMpLOJOotS6K0at9BCqFt00qrDXbIuTm6FPNqUx46Y7bdgoPuQ4fi3HJXob4wZx1gVShgAANbtyEOgMAPJdCciAbpEB-rtnQMAzR0Mtb13Oa3W5t6mCeLkkwSMW5QkHlaaCV83TQX9NyvwuFqLLsYtxYSzWctGSmi-ryQUopUDlC7IqcCINpdK7tKY6sGyxqhJl2KnJucRoFGVaeb0wLRKQvDpLWpI609SMpbAVPKpfh1aCXJhmLW1NdaIC6jxBmHgOrPk05aM9qGL3XzEKDVAIMPtkEzWUMAaiA64FCB9zAX2wA-b+2Ab9Px2B43YHHaKvwqn3PVoES1Xl0VoSLnrUuUjvAdIxKNY+p6dNrcvVAUH4PIeoH+9EsZNDqCJclGcbksBod7eUDIRqjUlCI-BMjjLdnQw2CK9MBwng1NzfjHjqRfZOnE4C4SinVPvtgF+7TgHnyGeO2UOgCAEBbgs7Z9DzrkgeubIkMU-rg39mHM8E5GRUY5MYn8BYHHlh+L2Dl+MWRnlINK77QM1XEP1dQ-p0-YieuDdG9Z6gdn8zFnLNWRbvrJSBtlL2ZUoXuqIgO9iE76krvxge71NZb30wsGo41HsQPaHg+fbVxrun2vI+6-14bsAxv4-Q7DmoYtMgxCqC5zzvnfAkeK21fYjl+efAahd71EvuoZEG13vMdFpp-A+Dr29mVIeact7CzJCL3f2eNSYD3EUfeB9D-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-bve9jAQfgwencfvQeflUL1TRq-mcR0j9dgmQfxBhbIsQTxFGjYHiK+JENgqg3vugwfZg9gIwGwEQCA25aeBMMkGHVqFGBmNMTLrYLvMAdBTSEts9mTt-Y7L-RPYVaA4gA+Vdc9FSEvS7ivRcjbfjumL1PLviLXp-dVbakVR4qSPjskDIuig+cYzQUaWw2AEwYYWQE0Q1bjuMFfZMPQzZPbTXQEY458YaXmcaS0SRF3sYYcqHZZBLs4G0ubEUTiG6UVE7jaR-Q46E2w36Y41Ec4-ocsDw0xBDaTF-q4n5jY6lXcS5ChB4GzV4O5H2R8QOSE4WdiesagJsdsVE8oysDIgyVYMuczEKsmNvlUUEy07mW0-mUGeSW5KUyvONZU6XhvqhW0vdUTreU0+zsE1M7qasYcnMPGBvbU8lXU1gts5g+Y3rFgimVSNggSMKu+FOedXqDxPjh8-jsYxkEAA */
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
        console.log(context)
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
    },
    services: {
      checkForFigmaDocMessages: (context, event) => send => {
        /** that's "onmessage" on the figma api: */
        onmessage = event => {
          console.log(event)
          console.log(event.data)
          console.log(event.data.pluginMessage)
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
