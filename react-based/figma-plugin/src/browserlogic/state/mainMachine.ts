import { assign, createMachine } from 'xstate'
import { HoverableElements } from '../../identifiable/HoverableElements'
import { compIdToTooltip } from '../../mappers/compIdToTooltip'
import { getI18n } from './../../i18n'
import {
  HostAppElement,
  HostEventTypes,
  HostSelectionChangedBridgeEvent,
  PluginEventTypes,
  PluginRenameBridgeEvent,
  PluginSelectionChangedBridgeEvent,
} from './../../communicationInterfaces'
import { getRandomTip, getInitialXStateContextCopy } from './initialValues'
import { getSingleUxiDefinition } from '../search'
import { AvailableNotations, handleNotation } from '../notation-handler'

const i18n = getI18n()

/*

XState events

*/

export interface HoverUIElemEnterEvent {
  type: 'HOVER_UI_ELEM_ENTER'
  payload: HoverableElements
}

export interface HoverDefinitionEnterEvent {
  type: 'HOVER_DEFINITION_ENTER'
  focusedDefinition: string
}

export interface FocusSelectionEvent {
  type: 'SELECT_FOCUS'
  focusedElement: HostAppElement
}

export interface PluginInputTypingEvent {
  type: 'EDIT_PHRASES'
  inputValue: string | undefined
}

export interface PluginNotationToggleEvent {
  type: 'CHANGE_NOTATION'
}

export interface PluginUnlinkedDataUpdateEvent {
  type: 'UPDATE_UNLINKED_DATA'
}

export interface ToggleHostOptionsVisibilityEvent {
  type: 'MANUALLY_TOGGLE_HOST_OPTIONS'
}

export interface CopyCompTxtToRenameEvent {
  type: 'COPY_COMPTXT_TO_RENAMEREPLACE'
  copiedText: string
  targetNotation: AvailableNotations
}

export interface HostAppSelectionEvent {
  type:
  | 'HOST_INTERACTION_SELECT_MULTI'
  | 'HOST_INTERACTION_SELECT_SINGLE'
  | 'HOST_DESELECT'
  | 'HOST_SELECTION_UNAVAILABE'
  userSelection: HostAppElement[]
  focusedElement: HostAppElement | undefined
}

/*

XState Contexts

*/

export interface HostAppXSCtx {
  userSelection: HostAppElement[]
  selectionFocusedElement: HostAppElement | undefined
  lastLayerSearchResult: HostAppElement[]
  lastTextSearchResult: HostAppElement[]
}

export interface HostAppElementSearchXSCtx {
  searchValue: string | undefined
  isOptionsOpen: boolean
}

export interface OntologySearchXSCtx {
  confirmedRenameParts: string[]
  focusedDefinition: string | undefined
  fullText: string | undefined
}

export interface PluginXSCtx {
  tooltip: string
  renameValue: string | undefined
  hostAppSearch: HostAppElementSearchXSCtx
  ontologySearch: OntologySearchXSCtx
}

export interface MainMachineXSCtx {
  host: HostAppXSCtx
  plugin: PluginXSCtx
}

export const mainMachine =
  /** @xstate-layout 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-WXH9Fhf2OAw6e-99hfQdEkOkd1sZFOD0BkRYfMAR7AFHmPceFUKNwBEOvDem+oFj015E7A+7sD0YqFEsvjhxDQhBII5yMKBCrC6Mkcxyz7jLDkNc1eFWkc75HsA0ee8t4pbc9T3xRcJkeKGWAYA+-KBkKzVmShh9QlHx1o7bGc88hKZkQ5Svi8L53Mv6OVfdwJnL0J7ZtEPLfcPHfPfWPcNI-d2ZQdACACAD4M-C-K-C3ToE1G3CQKXPNa1AtO1F-HlNjJke0akVCdCa4R6dCKsMCGpGpbYS4F0RLVkDfEjWvKAxvXfZvOAtpBApAlAsANA1AS-HgJNFNZMCgdNbAnNW3fAm1Igw7Eg3mMglkJfKg7DZ0WggBLINwBg7YByMsLITCR7fLZHSA+vaA3gzteAxBRA5A1A8-UQq-TuNQXBMQVQG-O-B-PgEfZ+QnaxVQsydQygpgmgkafYRKGKUbMSNON0PFXLMAwDTfTgqw7gmAg-LnMAXnEQy-VmJgaJGUNwjwrw2-e-e+Pwp-AIlDFQ-JDiRxXifmL9RKEVAIBeWkWpGkRIKkJIBaBmPIrIoJNvCIIicgZwy-WAHgTuBMcxDNdgKcRDAQVPG+O+TPGEGoozII+wbYKOPZQ4OaLFNYSI+wM0J1LiJISpGsLiDIfo+8QYolEYsYsgCYuAHgCEFEMQMER-Z-ZQonewJkPYzwOkeWJkY4qsLOAsVOIsIpTwETZnNae414uSRoIgD4CAMYwYqY9mJQTQLRR+ciH4zY1+f42YQEhsYEw4sEnQ4vRsXcVOSgsVRwPwO47gB468VE9EzE142AKod2Jw9AngHE4xW3Ak74qo34wIvJBAZwFwUsBIMVKyVCLiKscsJdBIc5C4dYZ0Vk0gdk1aTkyAbk9A3k0wRBAUlwngKEO-CQIkwzEk7YmUkneU64QaCncsOfUaF0AWDUkIN0TIRKW43LAY5Ejk9ANEo0pEk0+gUMKAKAd2QYlREQAQMQdmSQO07PZ0s410pUj0m0YWBCU4Y4HiJYD3XU9AfUyoQ0jEqMlw3kiAWM+MxBRMmQTUMLZMTMuU7MxU90lUr0syGHIs1hWOX9L0EM9AlE8Mrk2syYxEtk14q0m07TEomQTw1uW0iU4k2FECPMGtKCZYTkB6TIfMjXFkOk0yQ8HYf1YMmcoY7Aas40usucvUhc4UzQAHB+EKdgZJZYok2XXcqOGWCsZ0FYesE8vmeIc8xCHIRHG8+cicsMiMms+Cp88cy0lczwjc-w-8pKeLGWN0VkVkOtfMsSBeatQPBIAPRwcsysugB8283ktCsQ1mRUTULC6o2XEsTiJFPmLiddQSL0iOFkIcisIII8Gi0Mg0qcyMlC2cpiq-N823FENw+-J-cU7C4g0kkkOU0bHIGsdwV9I0Qi4SzU44e6B7BEv6Z2VaBmWSZmWqZQKENQKQMxOY9gAQTUP8CQAQBMP2e07cticSQWN0U2Zo8WABSWZk80bwT6TIfILCP4BgeAUYAUKUuFAAWjmBtHSpnnsw8GxmuJWFHgWgIFaHICDDSpAiyqJjrHtC9W1LrHaNMIRNKu4HKFWgYGYCjBaDasqoXFSBSlWF6kggCHaNzDSBKtKHKuvGqDqAaCaB6rKD6q6jqTiCCBWH0qZBdEskGogt-mpFGppHGsdlkj7GWpsUJn2D5hw2OCSEcAyD5gbAVlyysp7G3UlGWnOpmAGqJnMmXGyD8B8COtpFuBeppjes8gUg2n+i+sQFSExi8A0OwzdAek9KurBMWDWESjmkOJnhOs2hVmhrVnsthoOEnijgggGjXB4iSBsnmGthrCZByjmmatcnBrc1vDdnNLj0+tqNJLEpNDxi2HOH5kPF4jpqXWZKmhngcl4nYNoFJuqv2EPH0MYMYOpBJEznlpDHMPrkbkvwgFJp+t-3zHmCSArCn2FvOG1p1z3T105zAFJqFgdCXzJgvL5htBnnzAYMEyODzDqXhNAN1ogPm2PSkUwBkTkWW0VuaPi2WG5FKXNkG0QApxZEMOcEuEPG5FBrMNZwsNDvI1sP4J7VphjXpUx2ZVJujhcCWFdsSndpOIQG5AWGlhniZrQi5BtpRzDsPWW2o1Wxg15q2OlNYRZHQiOHtmMNiAqWuBZH4yOByGFosqDrzu127sLpsoeDwhhEeFQEQUgEVtZBrRMlSEekmkupzDEjLQSlMxxlHI7GSNm1tpAx7u80qz8yUWx3dlJrhwRr6ibGLHlhnlSwXiSnNspBSBlhAIfuDpr111fsqFKwBXK3fuq02wa0Nr5sdJMOPumiyGdHPtSwQh4vMgenWGvNzqPyfvXrAwoz7tPXWxqzqwwcPpJDcDEg+gnsyG91Gmw2MiRUapiq8Ggf-SobZwLtoevAx2+0C0QR-q4r8BgkuGODMgSEuyqSLKyk2GdHvtEYJXEfgY3uyN5350F2F3wFF3kdZGGupA9V8DTgEquqXglTVzqR6K7ssK7x4P3wqqwelJivtGuI1LMjLDSBSkyEWB9tSBpArEQg8bSK8cyMeLIHb23wyObyrvpqCf3FiBqXn3zC-gAOWDQmAPiaeTSe71gKLvVSgBP1wEGJ-tzCdWyGnmnh9TWHyajiXwbWKbXxEZZzEfzvKa4MqbvOSIEMcOENePkZVpXBiDOIKs6cKZ6aAPXySNgdSOGfSNGbkgN0GIKMaAjuMwCuOwxgmgYPOw8EpDmiEj40YJ2HcGLOXpgdXpDq2cSZsINLYCIAab8bhTEph06MYL-i5HnxNC9TLB4mxiXF0ZwHkt8eHv+YvtmDmgXmnwuFQiLDWAkoQs6SePvBeJNKNscfsCPCjjAf2OuBlTgpfNxarOkuQtpbrNJspCrEpBcHRdsfWDcZxZcMnKQsfNnLNI9imfQPkbqpMnljARJA2BIoX19I2DMpXl5cv35enNkrgGDRGKNtejqXd0-zQkuFVP5k4lThjnWHiJzoRPhcQvVaZdnIbNQDjITOmb+YNmxhPNJAVeHPWFhefIrMkvpYFYYv9d+cRZ3N1b6iBq1KNcEsjiMicSWHMnmHityCAA */
  createMachine<MainMachineXSCtx>({
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgPaYBdcAbXKAT2zGQAcDyBiACQHkA1AUQCUB9AEQ4AxAJIA5YQBVhLUTw6iJ3ANoAGALqJQNXLHQF0+TSAAeiAIwBOAGzZLFiwA4zDh-YDMAdhUOANCHKIAKwALBbYIfYWZgBMgW5u9lYAvkl+aFh4hCRklLA0YADG6ABm6AXM7Nz8QmKS0rIcABqSqhpIINq6+obtpgjRZmbYHjHBlsHeVhbRHsF+AQjBcbaRHo4qccHB0cEpaRg4xFgA1pB8qASoAMqXBGDYAK6YR5inEAwAwlwcAIKKPAAZMQAaQ4fH4fx+rSMnT0BkwRj6bjMHnCHkCKhG3ncFg883M3jc2DGVi8KJCHmiDl2qRA6UOJzOF2ut3uTxebwYAFUAAp8P4cHhc0RA0Sg8H8iRQ9QwnRwnqgPqU-EIXHBYkOeITaLTKKBBx7OkHbAcpmXG4Xe6m97fACylUBILBEKl0PasO6CN6iGRqMC6MxZmxFgSeP8BLc0WwUVJGxGMcN9JNjIg53NrOTr0g3L5AsdYudkulbS0cs9iKCS2wVhiUw8LhRKkGKqDbhU0bMVlJuMxJI8ieNRBI+ho2AgYGKqAexAIFU4vC5wjkAI4trkCmUMvdZfhFYQlhsdkczlcIa8vnD-WCqLcoQsIUCVgcHisgTMbgHGSHM-Qo7yhRKMo5yqRdl1XORmgkN1Sy6XdvX6QZhlGcZJmmMMFjMDFo0iYJkWiTEVGsGl9gyAALHQCCuMBiEKT0qFoegKiuCQeDERQuB+D4pBkHgrg4FcuJ4W0uQBKRoI6HcFRMRAtnbW9fSpDxZhUbYVWiaI3BsUlgmpV8vCpaJklpJNyNgSjqNo+FsGQad9AYW0flELkfgBAEAE0eAkFgAHFvJXHhWGYngWB5bjRCucSPTgxUgnsbAdU8BwqU1SkHECFtb3VJYu2sXsdmvT8cFM8yaIKOibJ-JiWL4gSwqFUQfjYH5hABH4ACEOEiySvRi-cVBsesJnfNw33vGJ0MQHYVOwfqu1fNsrBGkJCuwYqqNK8rbPQBgJC4YRfKqXafiuJgutgqS+iDaI1IxQJsAWjw3BcOInpmFa1ossqrIquzApYtjuE4uqao4QSrjEPzOq3GD5R66T9xGhwkNifCXG7ZVL2cCx1XrTsXBDFxYkCd6KPWyz8GsrbsAAJ1QAB3KrWI3DiuPqXj+NBljhNE4QzthvdHFRM8a0sJL1muzH0VRXCUXrGYlkxaISbMsmvopn70Bp+mGBBwTBBYD4uQi6GJPOuGlSUmarEMzTAmmDT0sxp8kYcfqvCmFQm0cZWSvJnANewWAHgAIyo2c-qZ9igbZ3WuZEsSTaii6glcZH-RGlSezmSXKWrCwVEjFxvAL4IjJIorSc+zaf0DkOw8ZgRY758t4NfKNOx2bHHECAZHpbZ8oxGrt42cJSnB91Xq-0WvQ7AWdY54fXDeNktTf5+D31RZ81niJ7kTFx2MJGHHr2mXD-Xwx8J6rqzdEwKAaK4bWI9jtnhUa5rWo65vovhmt2yfCpBIr5xpUjUuiMICQdhXQ2CSa+G1b5YAfmAJ+DMI4AxZsDDmYMIYrh-snRYWx4quCsKXAuIwNI3S8NGfqcQVIYjbFfYyxoPoIIpnfZBqDGYYOjjxBe3ME6ryTubSa954r6msFMXEOxkQtm2DYZ8uo4gzCSs+FaGseSkVprAMAFo7j0ToOQW0W0aBaNQDo2AnwQoeQ+CwW0oVGgsS8jwb4DVbTcA4DyVqHwoZCO6nuHUQxXye1egZBwT4VS7zCJ7R6hFsYX2WswjIGizE6L0fcaghjjE-lMdouADAwSSB4DyJgHE+Ir1lGbAJThqwYgLklMJETLzyTuiNR6AwEiJUxOorami8npOwKUYgNEIDZP0H08x+SBArkUOCVqQUSllN8ZU9evUZhBLqaE1RTSFgjWRMMTE8QqRjE1KQnpP4JlpIzEMkZYz0CXPybtfa3lDplNOonfx8FAm1JCQ07ZF5dk7CjHpHU1JcSknOeM1JujrnoGGZAO5DzYCByQTRB5DBpkcH+PMliizjrLO3FU+CYKZrPh0qXWI1sVAS0BU+cIbsUSLVdtSYiRpkm9OhQMm5CKOV5ORRwtF0KGA-D4OCPF5T8EiIQCS7wsxdKUvwjSn0uEkb+hiLWUkyJWVJhSf02F8LRm8smfy1FYB0WFNxaU-FFTCWrL-jUzEGIYyaRrDsn0il4oDFBd4GYj1IX3M5fq25RqLFjlplAKASD0XfBYFwAQvBxUcBtTDFuvUZVkvlY+RVkSdLRJGIMfU5D7D+oeVyuFwaLnQuRRAcNkb77ov2qIWNBKU2-z6OmuVFKs3UsiXEMIaqmyuG1CyktgbLSDPLTyytfLKbTsmcK0V9VbGiBEFwdxYqrV8UlXuGICRhh1PCVLf0Sxe2GVsLNZwNYe7IjLmy-2IaYXju5YaudobdXzuXautcibt0bxmGEbKkZOylzfKSHN6JqwMopGS29OqH1loNYiqts6oV5IxRxbyxTN0trXqm+GQZtj3ViJ7aYBdYgY12XbdsBF7aYlJP2JJ97X2Pv0c+pDM7306IxRzf4fFl18BxVhpZv7epRGiZ3EDT1+ohkiU9JGgY2z3jbGLUdeqn2Tpfah41KGA1ocxf8ARS4f0fKJb1GIdtsBpWttjWYcslUIFvLEc9T5d3bEMv1VTkyEMVq02+h9BS+BFMTcm3DbbzAJXuiqykSwNKdgsLJqk+7AHYm2BsFamBcC3FvjQVABQmSwFIvkj4TBHIvJ4E2qUYURPwyelvTupDnDXifNnBYrs7r509hsQiml8LauNBlrL7Cct5YgFcYg5jCuWOK6VwUFW-j1Gq0iZ8ln6snKa9SFU6I7oTE6x3GsRN4F+x0zPeu6Dma8NkAvcGohIaLcmmlYYvpIxUlJFMeIalqXqkfP1Ns2xPCkOJox1alc2FMenrTNBLAgo8NZnw7B1VcE4eEXuNKRJIyOHiJ2Jsi0Jr9CbESVL+FHpBjWBYFItIMvjngO0ekKy8N9AALQ7BVEz9UnXqWzBRG2DYIYVr4CIKQCgdOwtXkia+POiRXB21dtjPnWRBeUEyfQYXBCKMySSvFQk+FGvOFiHLgXORA75CKKUAoKupVLH7dbEanYnoxAGCqclBzNTa+pLrwH5dMxvDTCyS05uAktcQGjaMmp4jE-PHroH1ofcDPZCmf3G8Rq2GfHUz2LKzA6RbI6yzu83zKVxJhFa0fmQDOtAn3q0uZqeDoVIz7Vgs-hOJJ2Mk6JrzHJWt+Ec5f4bM8vItYkkRnvohRNeNKHfcDDl-GOCcU4Zzd6VPZ5w1GfWajvBSaw4-J9-mN4BM3tr6cyU8FbFGhz87vjSv3KMGJVG3nsOv2DLCQd+3n8qyzZ4yMbFJOE28LZKXRkfI9EyoyrLkDqwkdkrgsK2gQoMLjjqCGOIl2DMLKv6GcqAU-mrGDugC-tKmENvCGPEJqLrveC2IECEPdLNNMGlBsO+A-mROgVPJrBDtgfYCfIlD3A1oXP3PqMME4F4BsAkFsB+GgSrDfOrFTEHLPAQNgVSEMI+PePEuiOsm4P3NeOeh1uEtsG+D3IdhgSivfI-PTNgRrq4J4B-gAd-mpNbDYBMIgciCRkrEDpxixmANIYHg5oRFGOiMEmlI4NIp5lcuOhAXcrksatgWrg5r6rYM9lZnqOiP4c4ROohg+tTlAVKlYdWBJiqlSIppEkvggTWLjP6HEY4fBkGlOr5nAHocgg8tgVMEMBnvYHKmhFYAXLJi4GiO+IRHQipiUcxt5uUbptphAdgZ0aiEGJ7EsJ4KEG2LjpGKSElpSF4JGP6AaL0RUf0ZpoMaGjWqgBGlGtCrUbMBkaEIITfoRL2oRv6B4Scs9vERsextpk4SMTMeehMXELMCGJiL2jUi0W3OSCiJ2LQTgANhcL-Mjl8m4cPG-pEJiG1vnAxp7iCXRHkLlvlpNmEfZi+DYBjvELlCNNjA4YiZlqCUNqiaNuNgVnANgXbGEHwYRP1NSHCZtlMBqFEi0fidsOTkkEAA */
    context: getInitialXStateContextCopy(),

    schema: {
      context: {} as MainMachineXSCtx,
      events: {} as { type: 'FOO' },
    },

    predictableActionArguments: true,
    type: 'parallel',
    id: 'main',

    states: {
      ontology: {
        initial: "empty",
        states: {
          empty: {
            on: {
              HOVER_DEFINITION_ENTER: {
                actions: 'showDefinition',
                target: "specific",
              },
            },
          },
          specific: {
            on: {
              HOVER_DEFINITION_EXIT: {
                actions: 'resetDefinition',
                target: "empty",
              },
            },
          },
        },
      },

      linkedDataState: {
        initial: 'unlinked',
        states: {
          unlinked: {
            on: {
              CREATE_LINKED_DATA: 'linked',
              UPDATE_UNLINKED_DATA: {
                target: 'unlinked',
                actions: 'assignUnlinkedData',
              },
            },
          },

          linked: {
            on: {
              REMOVE_LINKED_DATA: 'unlinked',

              UPDATE_LINKED_DATA: {
                target: 'linked',
              },
            },
          },
        },
      },

      tooltip: {
        initial: "default",
        states: {
          default: {
            on: {
              HOVER_UI_ELEM_ENTER: {
                actions: 'showTooltip',
                target: "specific",
              },
            },
          },
          specific: {
            on: {
              HOVER_UI_ELEM_EXIT: {
                actions: 'resetTooltip',
                target: "default",
              },
            },
          },
        },
      },

      hostSelection: {
        initial: "empty",

        states: {
          empty: {
            on: {
              HOST_INTERACTION_SELECT_MULTI: {
                target: "multi",
                actions: 'assignHostUserSelection',
              }
            },

            invoke: {
              src: "checkForFigmaDocMessages"
            }
          },

          multi: {
            on: {
              MANUALLY_TOGGLE_HOST_OPTIONS: {
                target: "multi",
                actions: 'toggleHostOptionsVisibility',
              },

              HOST_SELECTION_UNAVAILABE: {
                target: "empty",
                actions: 'clearHostFocus',
              },

              TRIGGER_TRASH: "empty",

              HOST_INTERACTION_SELECT_SINGLE: {
                target: "singleRaw",
                cond: 'isNotSelectionInSubSet',
                actions: "updateSelectionSubSet"
              }
            },

            states: {
              raw: {
                on: {
                  HOST_INTERACTION_SELECT_MULTI: {
                    target: "raw",
                    actions: ['assignHostUserSelection'],
                  },

                  SELECT_FOCUS: {
                    target: "subSet",
                    actions: 'assignFocusSelection',
                  },

                  HOST_INTERACTION_SELECT_SINGLE: {
                    target: "subSet",
                    cond: "isSelectionInSubSet",
                    actions: "updateSelectionSubSet"
                  }
                },

                entry: "clearHostFocus",

                invoke: {
                  src: "checkForFigmaDocMessages"
                }
              },

              subSet: {
                on: {
                  HOST_INTERACTION_SELECT_MULTI: {
                    target: "raw",
                    actions: 'assignHostUserSelection',
                  },

                  HOST_DESELECT: {
                    target: "raw",
                    actions: 'assignFocusSelection',
                  },

                  SELECT_FOCUS: {
                    target: "subSet",
                    actions: 'assignFocusSelection',
                  },

                  HOST_INTERACTION_SELECT_SINGLE: {
                    target: "subSet",
                    internal: true,
                    cond: "isSelectionInSubSet",
                    actions: "updateSelectionSubSet"
                  }
                },

                invoke: {
                  src: "checkForFigmaDocMessages"
                }
              }
            },

            initial: "raw",

            invoke: {
              src: "checkForFigmaDocMessages"
            }
          },

          singleRaw: {
            on: {
              HOST_SELECTION_UNAVAILABE: {
                target: "empty",
                actions: ['toggleHostOptionsVisibility', 'clearHostFocus'],
              },

              HOST_INTERACTION_SELECT_SINGLE: "singleRaw",
              HOST_INTERACTION_SELECT_MULTI: {
                target: "multi",
                actions: "assignHostUserSelection"
              }
            },

            entry: 'assignRawSingleSelect',

            invoke: {
              src: "checkForFigmaDocMessages"
            }
          }
        }
      },

      multiPhraseState: {
        initial: 'emptyMultiphrases',
        states: {
          emptyMultiphrases: {
            on: {
              COPY_COMPTXT_TO_RENAMEREPLACE: {
                target: "filledMultiPhrases",
                actions: 'overwriteMultiPhrase',
              },
              EDIT_PHRASES: {
                target: 'filledMultiPhrases',
                actions: 'editMultiPhrase',
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

                  EDIT_PHRASES: {
                    target: 'singlePhrase',
                    actions: 'editMultiPhrase',
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
                  CONFIRM_PHRASE: {},
                  DRAG_PHRASE: {
                    target: 'draggingPhrase',
                  },

                  DELETE_SECONDLAST_PHRASE: {
                    target: 'singlePhrase',
                  },

                  DELETE_MULTI_PHRASE: {},

                  EDIT_PHRASES: {
                    target: 'multiPhrase',
                    actions: 'editMultiPhrase',
                  },
                },
              },
            },
            on: {
              DELETED_LAST_PHRASE: {
                target: 'emptyMultiphrases',
              },
              TRIGGER_TRASH: { target: "emptyMultiphrases", actions: 'assignTrashReset' }
            },
          },
        },
      },

      notation: {
        states: {
          spacedDashes: {
            on: {
              CHANGE_NOTATION: "spacedSlashes",
            },

            entry: 'assignSpacedDashesNotation',
          },

          spacedSlashes: {
            on: {
              CHANGE_NOTATION: "spacedDashes",
            },

            entry: 'assignSpacedSlashesNotation',
          },
        },

        initial: "spacedDashes",
      },
    },
  }).withConfig({
    actions: {
      showTooltip: (context, event: HoverUIElemEnterEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.tooltip = compIdToTooltip(event.payload)
        assign<MainMachineXSCtx, HoverUIElemEnterEvent>(ctxCopy)
      },
      resetTooltip: context => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.tooltip = i18n.tooltipDefault
        assign<MainMachineXSCtx, HoverUIElemEnterEvent>(ctxCopy)
      },
      showDefinition: (context, event: HoverDefinitionEnterEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.ontologySearch.focusedDefinition =
          event.focusedDefinition
        ctxCopy.plugin.ontologySearch.fullText = getSingleUxiDefinition(
          event.focusedDefinition
        )
        assign<MainMachineXSCtx, HoverDefinitionEnterEvent>(ctxCopy)
      },
      resetDefinition: (context, event: HoverDefinitionEnterEvent) => {
        const ctxCopy = { ...context }
        //ctxCopy.plugin.ontologySearch.focusedDefinition = ""
        assign<MainMachineXSCtx, HoverDefinitionEnterEvent>(ctxCopy)
      },
      assignHostUserSelection: (context, event: HostAppSelectionEvent) => {
        const ctxCopy = { ...context }
        console.log("assignHostUserSelection")
        ctxCopy.host.userSelection = event.userSelection
        if (event.userSelection.length > 1) {
          ctxCopy.plugin.hostAppSearch.isOptionsOpen = true
        }
        assign<MainMachineXSCtx, HostAppSelectionEvent>(ctxCopy)
      },
      assignFocusSelection: (context, event: FocusSelectionEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.host.selectionFocusedElement = event.focusedElement ?? undefined
        ctxCopy.plugin.hostAppSearch.searchValue =
          event.focusedElement?.name ?? undefined
        ctxCopy.plugin.hostAppSearch.isOptionsOpen = false
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
        if (ctxCopy.host.selectionFocusedElement) {
          // send to figma bridge
          const bridgeEvent: PluginSelectionChangedBridgeEvent = {
            selectedNode: ctxCopy.host.selectionFocusedElement,
            type: PluginEventTypes.selectionByPlugin,
          }
          parent.postMessage({ pluginMessage: bridgeEvent }, '*')
        }
      },
      updateSelectionSubSet: (context, event: HostAppSelectionEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.host.selectionFocusedElement = event.focusedElement ?? undefined
        ctxCopy.plugin.hostAppSearch.searchValue =
          event.focusedElement?.name ?? undefined
        ctxCopy.plugin.hostAppSearch.isOptionsOpen = false
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignRawSingleSelect: (context, event: HostAppSelectionEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.host.selectionFocusedElement = event.focusedElement ?? undefined
        ctxCopy.plugin.hostAppSearch.searchValue =
          event.focusedElement?.name ?? undefined
        ctxCopy.plugin.hostAppSearch.isOptionsOpen = false

        ctxCopy.host.userSelection = ctxCopy.host.selectionFocusedElement
          ? [ctxCopy.host.selectionFocusedElement]
          : []
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignSpacedDashesNotation: context => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = handleNotation(
          context,
          AvailableNotations.SpacedDashes
        )
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignSpacedSlashesNotation: context => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = handleNotation(
          context,
          AvailableNotations.SpacedSlashes
        )
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      overwriteMultiPhrase: (context, event: CopyCompTxtToRenameEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = event.copiedText ?? undefined
        ctxCopy.plugin.renameValue = handleNotation(
          context,
          event.targetNotation
        )
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      editMultiPhrase: (context, event: PluginInputTypingEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = event.inputValue ?? undefined
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignUnlinkedData: context => {
        if (
          context.host.selectionFocusedElement &&
          context.plugin.renameValue
        ) {
          const newName = context.plugin.renameValue
          const focusedElement = context.host.selectionFocusedElement
          //change in plugin-statemachine
          const ctxCopy = { ...context }
          ctxCopy.host.selectionFocusedElement = { ...focusedElement, name: newName }
          ctxCopy.host.userSelection.find((val) => val.id === focusedElement?.id)!.name = newName
          ctxCopy.plugin.hostAppSearch.searchValue = newName
          assign<MainMachineXSCtx>(ctxCopy)
          // send to figma bridge
          const bridgeEvent: PluginRenameBridgeEvent = {
            selectedNode: focusedElement,
            type: PluginEventTypes.renameByPlugin,
            newName: newName,
            pluginData: null,
          }
          parent.postMessage({ pluginMessage: bridgeEvent }, '*')
        }
      },
      assignTrashReset: context => {
        const ctxCopy = getInitialXStateContextCopy()
        console.log("assigning trash reset")
        assign<MainMachineXSCtx>(ctxCopy)
      },
      toggleHostOptionsVisibility: context => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.hostAppSearch.isOptionsOpen = !ctxCopy.plugin
          .hostAppSearch.isOptionsOpen
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      clearHostFocus: context => {
        const ctxCopy = {
          ...context,
        }
        ctxCopy.host.selectionFocusedElement = undefined
        ctxCopy.plugin.hostAppSearch.searchValue = undefined
        ctxCopy.host.userSelection
      },
    },
    guards: {
      hasMultiSelection: (context, event) => {
        return (
          context.host.userSelection && context.host.userSelection.length > 1
        )
      },
      hasNoSelection: (context, event) => {
        return (
          context.host.userSelection && context.host.userSelection.length === 1
        )
      },
      isSelectionInSubSet: (context, event) => {
        return !!context.host.userSelection.find(
          val => val.id === (event as HostAppSelectionEvent).userSelection[0].id
        )
      },
      isNotSelectionInSubSet: (context, event) => {
        return context.host.userSelection.every(
          val => val.id !== (event as HostAppSelectionEvent).userSelection[0].id
        )
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
                if (
                  (plMsg as HostSelectionChangedBridgeEvent)
                    .isSelectionUnavailable
                ) {
                  send({
                    type: 'HOST_SELECTION_UNAVAILABE',
                    userSelection: [],
                    focusedElement: undefined,
                  } as HostAppSelectionEvent)
                  console.log('host selection unavailabe')
                  break
                }
                send({
                  type: 'HOST_DESELECT',
                  userSelection: plMsg.selection ?? [],
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
                focusedElement: plMsg.selection[0],
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
