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
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgC4Ht8AbXdABwGVdVcxsIwAzVAVxIBVCTyBiACQDyANQCiAJQD6AVQCSEkQBkRAWXkA5duIDaABgC6iUGXyx0pfJkMgAHogBMAZgCM2BwE4PbhwDYn7n3YANCAAnohOAKwAHHbYEU7eAOyRkQ6JngC+GcFoWHhcpJTUtNiwZGAAxuiM6BWcxIX8wuLScooq8gAaMuy6BkggxqbmlgO2CHYALN7Ybk5TiQ6TOk5uUZOJ3sFhCE6TUTMJ3t4xOok6k27HWTkYOAAWJrgUYESVI1Q0dABOqADuyjYpBebwqIx4FHaAGF2BIAApiERCPpWIZmdAWKzjJxRXGuNJpCKTZbzRLbexnCLYZLHaKJCI+NwXG4gXIPJ4g94YzCfEq-AFA9CcsHciHQ2FqESdXr6VEmdGYsbhXFRfGLenElZ2MmhexORKxHTHJJOBKXbwstnYR6wZ6vLkWXl0TD4YXgwQUWEyDTiACCMJkAjUEkhShhEmUUgU7BkKIGaJGWMQDnW2ASU28U3iaTW5ImdjsMy8DhLzkmESuZ0td2tHPtIsdxWdrvr7oEnok3s0Yn9MaDIfFIe9AHElHGjPLE0qECnJmnM9Ms350lE8zidKrLkdJnYmW47Do3NW8t9KvhkMgwJgIDRuU7sKeKufL9fbxYoUQTJAeCIACI9CQoQEZQ4UhX0xChPhx0GSduSTGcLlmBd0h3AsUycPNEiw1wdAiOlpicQ8ogiY8cEfZ8rxvD4mwfM8L0ot9MA-L8IB-f9YURNRfWUcQRDhBR-REaCEzg6cHCmJCFjcVDHCiDDdQmbw3GwSYjjWBwIm8HQS3pUjaKfejX2or5sEgdFMCgKFz0oMBUG+Cp7idHgADFvRkCg+HkdjAOA0CRHAyDhNgxVQHGMtJI2aSC1k+SdgNGYolwiJkmSiIC3WPTyMMqi7xoszSAsqzkBsuyHPvLB0VQIgipK+z7h4REgOUHi1F-CRfQUOE+F9AAhEQYyhDqFAATSC4ZRNC+xxMSOICTcPDNL2VcFPmK552OYjxLktYnEyuiXxyxsTPyrBLOsl5SscmiKtIKqaouuqIUEAB1HyQLAiDPJjUCxoVUZJomNIZoCEsN13ZK8wiDc4h0WHdx3QjokmPaDIOxj7xOwrztsur7yyg7Trdbk+HQKB7iIUn7jtS72DAaxcDFMNYSavyAs8xrgOUX6pwBwjiNcS4YhxaZVOiNd9SpVSNsWKGjWklGKKM3LjogcyzuKh6ypo-HKMJ1ticpimyepurafpsU2c7YMBOG8QKG5iabHCDcqSWNY7GF7xReWnZiJ0dbzmihkNyPbJWRrHWlaOkpMfV2qtZMyPVYsomLBJsmjapzX7jNhmPsgq2JE0aV7dleNgv+p3dhdgX3c97283mlwjnOM45J0bVQ9uE99oY4yY9Vgq4+zvHe+vPXQRGdPycpk2HNzppREkFmJB6sQBGeyEJA55qRFa30+zUB2QqrvnXcFj31i9yIffCQjYmNE4GTsba5IV7L0bywfTvunGE75MeycoCp0wNPTOc8c50wZgAaREMNBEIgKAUDenCVe69N4iG3iIJqLVfwH0DEfMuE5xon2xDXN2Qsr4NxWrhWIRxjjSR3Ftd+aN+50Fjr-S6o9Ua6xTvrNOhtZ7ZwXn+ACK9858GLjKfoxC-rwTPrXShIsb55iSMpekcNPAHH2BaMOVok6fxVmrThuMaIGXjjncgsA1AtknqKCRhcbZ22PpXMh-MKGX2UWLBS6RlLGkDtJRIxIvAsL7srAexjsZcLMVE02VibEgItp9QuUjS4yJgiQ1xzt3EX3riohSTJ-aPx2nJTS3gHChKjjyL+kSNZ-yuiZcxwj4m2IdJgNiYjfIDjZlIlx8jyG5KofknYmZlJ2FltqdwcwoiJEqYdapRih4mP-nQIgqAQhgG+NnBQ+BUBAJcgIKQrVHG+ltmINJcpMnyOSC4dYHgPYpiSMRWKiB5qGlhhcSk9JvAMjmYYiJSzYkrOwGsjZWz6k7L2adHgTjJBqAELCZyhzWp9OnPqU02A7n7j8AcRIzy8yJX9rLDu6RNhYUWH8thplv5YzqdExpQLLFkFgAodZmzrH4FwM5fALBrwdOZl0iRvSiEZLkdORw2pZqLHmnhXw+wCWwxhnDUlSQsIVL0RHQB-z2E0uHvU+8TT6nsCsbnGxXKeV8tEQKkC3TPrCvSSJUhU1JUMmlQtOVt8EBMhcMSkWmZCJzEpeEnVtSLH3loPTbZuz9lSIkPCxFyLfyot5jczFlxsWPLxfERuKwlUd32DSeayMNU9x4VUjGurlkNJKBGiBkL9lIqOW1b0RcpTSMuWKlNGKsUPNxfimhHc81+EXFpKIQbo4hsBXS0xJlyhgAANY1SEOgMAfxjDfDzoOFmDid5cxFY6rJuxU09pxU87NNCiTYEfkpYkEqx0lrIlqqlHDGX3jnYu6yy7V3roZkcwQS8UFoI3lvXde88GH2TafEOaZCRA32M-IIA6XDFKSGkF+vyH36UVvMitasxBXlQJefDZA1kVDAE5Vyah3KeStVgriPFET8UEpBsKEkrhSRkuhPMl9ZhHBiBsFY5SvbjoWQC06+HMCEbAMR0j5G8rFVwCECTUmZOoDI-ykM7BwLsC6j2SELHEAHFiGsRYFxoinA7txhw-t5hQwSIefYql1Xd0fWWnDNSh7KaI2AEjam5OJ0AYTagG64T3F+LAMAGnlAyF-L+JQunfT6f3RXeR4k5xeHih4GZ5TphWZs+MwTDn1h+BE7hzzBHvO+bI9w7Dp1lDoAgBAN4oXwuRf-S0NewHMFYNA-vCDyWrlorkqqfNQt0gFiJDqHY2oXAfJWIlYkkxCSlY8+Jir0mfOyZq9lOrDWmtgBa6gCLPBYHwMREgoDGCsE4LA-goMBndjDewKNj243xkbG4wePNBYNzDa1CtxZa3JOVa29rQLFl6uNea2Fo7kWgJqFcmIVQ0XYvxb4HpoSA3O2nyey9-U+53tTeTPsPN4knmbBWMWlzWGP7Pt1V5jbVX-MlHfYdiLv4mA3VFPDxHyOYtxb4ujxLmOHUpfFf4akBXojaRLF4CIn2ZoaMp1hQiOJ73U+QIKNnzP2EKZCICbgZAYcRdgDwICcJhooPYNKIuAg6PcV4kxqEIuO08yrjNq96biK+BxO4RD03UrYELEpBbmZtS4j0pr7g2uMZ64N4UY3cAeDekhGIWECWkui8GwDF+yGveLV9-ubjaU5ybCSPEDwKYKWYaj6QGPNEahEDeBAeP6Btem9-O0TQbUBIdgzy78u2f3dyU91lgvUQ-fcY2HOYPixfAblhs58OeRa9t8T-eRvzfW-t9KKdaHrWeCd6UJoCQvf09C8z67x2YUMWLn2F4VYWkGTcf3MpFY5wNjxDxUEyPWv18N-QCb0gG30T1gF3wsn31hx4F9Fi3hAv0QQe2cBcDvyiAf0rGfwUms2s2ewSA8AXHml8F-2j3-xMk32AL-1azAIgF+CgCgFOm1wahEAEDEE70kH7wuUH2xxv2QIXFQOcHQIcDzGs0SjiASFxArD2DwiNCILrxIJKDIJbwoNhyoJoLoIsgYJkGHHhUREQNv14LQKf0EMwL8Fm1wOCTkimAnxkLX1aw30AK3yUJN2wFXwYJgLaiOR5xkCRz-DgIxwe0DjTCmHuSuB8F8CENNBmjwkLGmC0h2h8GsPr1IPsPIOIMoOcMcMiyP36kwTUH4ikE9Gejt3738MHXKXmFwnmCSHGSEKNBmloW+UYRiHiJrwyLsKAMUNSOUPSM6OO08KR18OF38NUkxWcHGVWESiLX92TEEziDSiUm-wsN0Q11aIAPaJALSJcMT0Px7GHAGMv04Ld3GChjnCUkr3LDGNUjcHCJHy-1hmWEimmASLkLoAUPWK6M2IPyyJP0hHhzi0S3Pz8Kx0OOTBH2WFhn1ANCuHKSMOmzcHSFEOSCNCRmSgSD0htDtDsQnQfH+AoD33I34XaQ9C9B9B7ADH7FDGwVhEjGjFjCBOv2dihiDyCQ8A7jwh3A+wUgPAnyD2iBLELAJCWDRLrExNEzoFXxAQoBYAACMXgGYiSrZuxewCEBwmYhw1BRwB9ZFgSJhywZgq8dw8U-AjRqiVodoVJA4CQP9iIqdl92RbQJSaJxSCTJSZSwA5T2xiTFSyTgwKTwxqSYwHsPYvtfBHB4hJkZl5dOTCxNx6Elgmj4ghT7TnTtYcS8TEl5Suw-RvSVTKS1SNSHtEZ-ZtR01WSiQFg1wvBDQpYtJHArhVJZlMN0SHSTInSRSXTZSmgOxMzSTD4czwwKARwxwnAs8uDlQ8QdJCRNRSQ1w8VVRQjjhlgJjpgSIWQXQGB4ABg2Qr8nUEAABaKYPMXc4YzwE808jwPSAgBocgJ0bcw9A8ladwVUR+Cw9YcsPCC8goa8miBgZgIEeoQ3W8+CA0NceIKkCWC4QiJbQldXW0-IK8ooEyMoSoaoWof8woQC6cDYWIQsKXF2KEvCEC-UK9DRVSC4FMWGGCq0Js5Mr4DCnPSYGcxVA4Y0HEDUfYOwRMjEtpe8F0EBOiquYClaGIB+Y0OkR-RYJfKi4U7ilMgUbgPig4+k3YRaNMZk-cc4ZIdSbjIiIPR+bSDwHcTi5skoVs7i6U2U-i8YcZNKTFGZfYI0MEtYLYTksGTFA8RwcpYiCfIkIymivkVMiA-EkUyyxAA0BwNMeYafH5YrF5R7aGas2VUlZo6nAxNhEKnUvMcsPNOGEPIM4iAHABNzRiZiCLCAdKwS6bbAmIk4MKisDMBslKp9YNalUNEeJsdKzScKuYDyxwEWSzBSBGZ7D5F+cpOzTYAqydH+V9a6TASqaqRldK8PGaCw6YazdML2KYhAE4OcM4SQmICw2cCalqqdMNMHNzCeNpMBIRI1KBdKn3XjHqpYL2fqkZNaUsHwCWaSVII6l9adYFQ1GmFpBSrUpS+KZ7GZazY0RwaaSGVYZ7CZGq1-DYH6ytaalsu4EBKEe4VACySARa7SQ0LLANNKK4T1QiI0VwYlNKVaVAyizVIqunVq-VGiUFTZKNKFCydKyIbSVSy4clcpDuHEBVGaKWG5ba3KlGpm+lEoAGuJZlVlMFDlc1XlMqxSncg8cSZ7Imw8Emk4BVWbYalVclSS+m7DbVY6qav66tOgWW+eE1KBM1blFW-GlMFSI0MGDSCVPYHNd5OGAtXAnyzDVK5q3606kyWtdmoBLm44ymsPK4aVV-HNGMhhVSA4WGBq2C4OrE0Otq2dMABdJdFdNdfADdaOnm-UPmrCAWy+NcJKdaFOphF+SW8rYHRnUHWitWw9CsVUF+Wq8ScSA8ZynYPwcKubB5QWv3JYzOpq7O+ndbVTareTMgRTBnBesAO66YIPGZUM-un7IeqaIpArezaSYrE20tM2xmlulTTbPzbbAmFOYLXAbXLmykcGsKotZIdYGEg+q9I+2IxzErIOme0Ui2iyVem+xegLc6iHPbSAiLaOrK4srCU4FMXcb+wGQ+uzf+0+5uoHa+pnN9fO+dbXDnGoWat3A9eCS+cKqZOYWcRKdYSM6bF+Hk8EjYREtXXBsB+eiBnXbARgNgIgZ+zuqhn5H1DRZ+fUahqzE440bejSaEksJ42w9qkR8VBizkx5akWkGZOSHSVElonovhsAOPQUI3Sg8qzayw8KvYKR-cdYaI5R2HNohwoxjckGnc1A7jdYf2MlLkrwI0L+pxiLFxlI2QtI0wQK4Rjxw9G+K9ObH5H5b1LCF-EQ9-QW3ENICWYJvh14jIsAkx5enYGJoCpSc0uzcSCvaVF-Fhwsc4MPDcYdKeq0D45x1Y1x8Jro6g1AWg+gxPLmtIcIpYHAm9QWSKqwwxzpkJ9psJmw94jI8qspz-FYSp1Yap4wxYeG7UXCJIMR3aLIDIIAA */
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
              src: 'checkForFigmaDocMessages',
            },
            on: {
              SELECT_PREV: {
                target: "multiSelectionSubSet",
                actions: "assignPluginSingleSelect"
              },
              SELECT_NEXT: {
                target: "multiSelectionSubSet",
                actions: "assignPluginSingleSelect"
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
              }
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
              },

              HOST_INTERACTION_SELECT_SINGLE: {
                cond: "isNotSelectionInSubSet",
                target: "multiSelectionSubSet"
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
