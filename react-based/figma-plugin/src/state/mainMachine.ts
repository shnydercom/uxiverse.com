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
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgC4Ht8AbXdABwGVdVcxsIwAzVAVxIBVCTyBiACQDyANQCiAJQD6AVQCSEkQBkRAWXkA5duMSgy+WOlL5M2kAA9EAJgDMV7BYBsAVkcAWAAwBOAOwW3LrwCMjgA0IACeiAH21tguHh4AHAFu0VYBCU4AvpmhaFh4XKSU1LTYsGRgAMbojOiVnMRF-MLi0nKKKvIAGjLsJrr6hsZIZpY2dk6unj5+gSHhkYFusfEJ1mvOFh722bkYOAAWergUYERVQ1Q0dJj4p+eVQ80U7BIyGuIAggDC7DICagkFA6vwkyikCj+-T0BnQRhM5gQCQSthcVi8zg8AWx9mSXlCEQQFgCVns2BsaTibkcCXijisuxAeUOx3uFzhmCupVubMeHOer3emjEPz+AKBINeFHeAHElNDBhyEZFXF5sG40lYXBYXDTHLiCZYgi4VokrDSMm5rC5GczsEdYCczuyjFy6AAnVAAd2UbFIvKewKUoIACmIREIFbD4SNEY4AibovGbBYMejHB5DUSoo5YjYAl4US57GsvDackz9vbWc6+a6Sh7vb7uAH+UGRKC1CIun0RgNo8NQHGE7EEmiLM4vJ5tQks8SC3m0vq3EkLFsGRW7Q6nQ9Lg3sJ6fX70K2jAKJAARETt35RobKpFeWyJccJMtOez2TMLbNj8n5wIrB1DMtVtKtt1PTl90PZt-VrJ5BBeN4PhFX5-kBG8pVleU+xhe9Y0QN9nzHIC32LfUvznDUTXiRIdTTNcXHLPZ8gg+COTdMosCgc4ZFoZAZEwWCT3Ys9EMFFDRXQiVg1ecFIRkO8lQIhAtQSUcXATLwS3cal5kJNdnGwFEgLcMyAi2LxtLA1ia13Dj930TAeLAPiwAEoTj0g88hS+NDxUwoFsJEJSYyHRA1I0rSdLM5w53NAJjPzewqXSNwvBsllHUgzinJctyPOE7zxMva9JVCwdRlUlx1JqzT-BivT4o1JLKQcUlfA8TLq2y0SoOuA9vQobjzmKgQkKvTCKofKIsTzLwPAcKJPDM+w518CxTQSGkgiiYlHG6tj7PrAbD2G5zRr6nzJP8jDJTBCEoVwxUwqqoJ9Q0idtVcElCyzAIsVzOJEhJaI-C+7r3SqfBkGQMBMAgGgHNO6HYfhxGhm+Ig9EgHgRAvXoJG+ARlBDYFPjEb4+GmlSrDM8kM1+7anAxFwsxRNVnGcfN-GxbFIdRuGEaRk7SihyoYaFjGOSxnGIDxgnXnDNRPmUcQRBDBQfhC56BwfUyGaxdFmccVm52RbArKsr7428CyBYltHhb3AbIFhZzvhhygwFQd1KgOTisFhVAiE95Bvd9-2eHDYnlDVtQLwkT4FBDPhPgAIREP5vmThQAE0afCokvuMjwNXRdwOf+801WBhIUnSu3UwdyX0ZF-rSjd0gPa905I4D-cg9IEOw4jv2Dh4ChBAAdSJkmyZECmqYkP4ycLqq1zfYzsQ8cc5lxNaf1cE0TK2Cw1jXCcW6d6XRboLvuNHvvx848XW4R7jIL4dAoAOIgf4OE6fu7AwCmFwJPe6scF5Lz4BIGOJNlDr0RMkU22ACzpGLPRZITF-qpk2rRDIZZtIpR2JuKsb8b7t04g-Hu4dn7+1foLdGn8+rf1-v-X+QDx4gLARAmByEJBazzuICgSDIjUjVOgsc0ReZ+DZj+DwrhTS713laJYXUyH5AoVLKh+4aFQCfj7F+0EmEf2cl-ABHDAH0IODw8B5NKawPeCvbs7BRG63wkXFBkjAjSKwXI-61Jlh1y1ClLET5mKVi0aY2+Hd74QHdgY3uRiGEmMdlLFhx1MBsL-gArh-s7HNFEJIKBEh05iAENPYEcCOwIJEAnT4Yo1BiIQN4tBvjMGyJwT+HeJo67EnrqSMyCRr46Jdp3BJ3ckl0JSQPFG6TmHmNYZYvJNjCkAGkRB5zDNeCgc9SZlIqVUkQNTY7xwvI09CLS2lSM6UsbphJsTFi2gtNKpJtijLbuM+JiTDH90YQssxUALHsNWbMwp+NCalIcVTTQPZrkSPaRgmR9z5GEkLJtCkeCCyaS-CMzROBtFfORhM35yT-n7kdmPAp5BYBqDuFdGFTjARCJEQi1BtyUXYLRYgMuZJHBmVWlZXeC0MoEoPDE3RrtJmP3JcYgaVK1m0vpd5JlAi4VuPZT45F-iHniKtFtRaVoMzagsJ852JKflTL+fK0oirwXKoZVkhWUL54ShgRqrVSK-FdJ5QgCJ-4UyKIFR4KwGRzWxOoTK2h1K5mlCIKgMIYB3Q2IUPgVACTnI8AAGICCkAnARrKxDuJ0HhZSXjPzLDLN4bUVlzQokCfGQNUQFobHShGqVpLrVytSQNBNSaU2zLTRm7iPAi0SDUAIV4ub80XmuZWy2cQyypifDSKwWYy5qgpFqNw2Jz4kg7d87A+ibW9rtT22xtKFCJuTXS-AuBs34BYAjF1rxoWL0cZ6jx5aN4l1pOXMsK50QbvSoGhwsw5HREPZa490bpmxs4va4BtK7H0ofU+l9kK31uqZV+0tL1KqIkMifMuNhANVx6WZWwWKJzmkWhiA64qiUWrvrBslMyKUDVoGA1N6bM1QB4BqidU6JAzoTvO+wVal21tXQ2yjLUaP0gzKmZw0HWMnovZxbj+SDjDv4zmvNBbnF4ZAP2Txb0F3VuXXWtdgT4jNuSJJ02Ya1NxLY92jjtq6AVDAAAa1HkIdAYAvS6HdPYyB881XwLjhJqTNaV31vXT0hM6laILUUWGsyzcmOSqPRpzzZ7vNgD8wFoLIX8BhZ4PmwQxT9khkOZU6p0XzmXIBF68+jcpx+BMnZ2qtFSSThJGOVzUb2MIYbDm94Mgp7yEVnVplLS0jLDo0zfUptXBZkLB4bAXM0QWSsFiYsG4WKEtyzB-RYh4aoDhpdsgCbKhgGoeHXAYRLuYGu2AW792wCvqBOwCm7BU4imBC0scy2y4FmpNYL8Fg5yoNorvMNpIw3DZy4CyNei4NvY+191AD2AXv341cMLIYDielgD9rDYIZAXgvEoIHnwQfftesg1M23kj-upCQnw+IfwTjVAjtEKJ7Ao8iXaZjGPpWJOxzdsAd28ePbSYT7iyh0AQAgOcUn5Ofs1daOUxrJyanNfqRcpp1zWY7eLCWWkup4xBDnKG7ABDFppBSwmEbmPpdXdl-L-HSub4q7VxrsAWvUAU54Js7Z4YKB7P18c05dSGlm+Z4RxYSjXCfmRLvZw2J9KWF1E72icRrcTitGL8hZ31NY+959uX32CcB+cqr9Xmuydh5+8TNQ2aZBiFUMoGndONZ8GBzrfDesVIFnT1brPtvc9ZmNq1dEQyUqaQ91LqZMva++8VwNHzvnQ8U4vEwIe-JO-d979T2n9Ph+M9H6ZstLOxgrktlaZEawNQ6hSnDk+PMRcohSLWmvl2txJvrjn7tcJNmoNNrAlTsrKrOrJrNrItr4IbKtizBtnzu4JbFbGsLgYBn4N1MgMeAfjvp3M9mEMJGQG3hTrADwMTCGHnHVuwD2CvAIDUirGrOGIgd8HfmZj+kRk4LEMSLvJZFMCkHOLiLYKfCuFsLnmiIQcQdQaQffOQZQUobQe8MCGIK8AzkzmPuZkRhiEIQDNqN4GIYfAZGtq1A4BRAtGuGKidtgEQdwCQZxLUEQOcBAMJCQbAFxBdCHkoTwFeEoJoIIozjoTfnoffgRvrCkE7o4OuOXCiOkE4A7oWElFsFRmiFaOaAoS4UoW4egB4ZAN4eoX4S5CQTwJ8LThILodeItnEYookTYMkRkHnqpOlD-qmNtDSLvOGuKs4aQK4fuO4Z4aUdrr4RAJ6FAFANxJUeGAIGIFeJIHUSWtEePkXHTGSE0aGkkWkG0fPhZJtCZH4PYBihgsdlEjgIMegMMQNKMSUYoRMfQNMbMc5JUTIDKJOuGA0dsQkbsS0fsakT+EBFgafAmHiPRHkUMQUSMUUWMU8e3r4TcZUdUYnPmmfj3mrInHUS0riOpFqMjvXADJurOCCefNtkGrvMXjkdCbcbCfcfCY8fkc8SiYEcEVnCcmoJrFIC8NPGwbiSng+NEIlPzspqGnEPSAEPPjqIlBSNSOkDzuEnSXcaUA8V4YiTQU4ZqR3gCOfqoIKfofwYgCzMYRmMiGRjiIcY7hSMkItJKU5iqQyWqUyRqSyUidqe6eHheCKDKLUZEbwQ-qnggOOLECkGuHRrSEELDiCfWq1OGRkOfPIQMTqYUcUW6TCayTqUER0KEcCJ3nTuEf6SPotiONpJsAtDVCuKGvPlaGSCiEmVsJ+F9GaimV6codgOqeMUiTmSEfjGEUhIaesQYZYEYdqCYaIbpBYZYPGGqCZEBHTExF+EENkBWLcAwPACMHaAQI0OQJxAwMwH6A0NwGQC0rqOzjqBkKaulDYKbP9ClJIp+HELNOaOlK2Y4TuSeblBUNULUPUIUOQC0j4PeUxNgJ+GEi+QKj4N1J+UUG6GeWSY8jni8u1N4PEIdHZC6G5jyH1NciYTttECLqumRn9Hzu9K1FEAWDWliBhb1Fkq-E2F5LhUKSpJ+NtuGbqNEGXEkF-mRdEIuOkBZDzjSO+VcT1DuFhblCNK5PxIJEVMxUaY-v6jGQZKRGBZ+AkciGWAmIxo4UdJJdBENNJZBNcm+GqJJqGqCYomXO0cSDVIXokDSD4F9KQnpZhXWHEghf9CRC8vqOiBqIWEAR6JXpgLLBThAEBSpfnuzlbBaAMrqBqEFe5rKgVnGnQCfiPBei0vzupKcYEGXLuvGO0YWHKdukuPENGUlfluNvMsrkslkjklYjpnYi0iBMZGiFKWZKGliJttsGBXzBqAKmcabOXtEujp2lailTVeeqlewI6iZSxUXFOCaL4HTFaItFpHEFmE5XYPKdGWGgtFVXBqemlU4fsJBN8AcKgM5JANctsLXPEDDmGkxG+FFa0p4OpE+HTIorqBiCSKJeLiFaNh5tNXQP2smrxiOs5NcpxfNAleaBOPGCBttvOQDGuMuQEEdWNjYohhenNWQLANegOneuhs+hFYtW9PdaaE9WODVMBQoruovtYBZEkAkQDRXuNXlsdZppSnjShqArgGho+mTXdU+Ggu4Liq4FKdYBut4BRefE+IxPio4RLhNclTGjjfuNppDfxjDTSGgvRKmLWqSG+IEtSBRcmIWJ0ljSDZrbvsVv5l7IFsFqFrgHrWSGiGWAKgjTnv9AmKiKsCKYolOMiDbVNXbbQK1V+O1eaEtp4AdtKT+P4McSmGOFsM4CtJcYDZzedtXu9j7vXnouQaAXXgrniamGBfRJpD4NXXFHzgkcog4NtAWEbezWNYTmrRdjXmAR2RLp-NQCTkoQiuiHYHEP4PXHVBDnDptMDItCWLOa3WHc5CXdvg3hkk3kHq3trjDVvMDIWGthiNSElpYTPbRE3QveWUvVACvYXfbX5iQUfrUJgBscOcadmH4DtpZckAdqmCQnOHEGBitO4FZHIlfTfQrm4WwEQCQdlVzOLVDv4AlbxZYXOSmAlGcdsCiGA93aXeAZHRTYiJJrYCitXbKQxv9GLYLjiEEFqOfEFV5ZRolAjgKqmCkAKsmY4Wydrk9mQC9moRMZFdPbYEBjuutQjVnVWFw+3mmQie2b4XlFve3tcvrU2SbW+MijVLWcSP+EbSLj-dlpw6mXCemd2Vqe5Lw4SIpcGSWHKWWBzA3F+LvGkSnU2RfGuLME6dw8Y7I5mR6VMagDMXMUPQQ5EMBuST4PGVOBnu4NYJ49I948yb41qVIxTniUkOSHY-5ZJo436jYNqDo6GoEGja4HExTjI4k-SQIyE60iSA7vTCcXTOsEkA4WJSk8oQwwZExLmPOdtCkCSAQQStlX6lsA5bvDigdlqDVIxtkEAA */
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
                target: 'rawMultiSelection',
                actions: ['assignHostUserSelection'],
              },
              HOST_INTERACTION_SELECT_SINGLE: {
                target: 'rawSingleSelection',
                actions: ['assignHostUserSelection'],
              },
            },
          },
          rawMultiSelection: {
            invoke: {
              src: 'checkForFigmaDocMessages',
            },
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
                actions: ['assignHostUserSelection'],
              },
            },
          },
          singleItemInMultiSelection: {
            on: {
              HOST_INTERACTION_SELECT_MULTI: {
                target: 'rawMultiSelection',
                actions: ['assignHostUserSelection'],
              },
              HOST_INTERACTION_SELECT_SINGLE: {
                target: 'rawSingleSelection',
                actions: ['assignHostUserSelection'],
              },
              HOST_DESELECT: {
                target: 'noSelection',
                actions: ['assignHostUserSelection'],
              },
            },
          },
          rawSingleSelection: {
            invoke: {
              src: 'checkForFigmaDocMessages',
            },
            on: {
              HOST_DESELECT: {
                target: 'noSelection',
                actions: ['assignHostUserSelection'],
              },
              HOST_INTERACTION_SELECT_MULTI: {
                target: 'rawMultiSelection',
                actions: ['assignHostUserSelection'],
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
