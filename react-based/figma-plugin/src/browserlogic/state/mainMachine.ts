import { assign, createMachine } from 'xstate'
import { HoverableElements } from '../../identifiable/HoverableElements'
import { compIdToTooltip } from '../../mappers/compIdToTooltip'
import { getI18n } from './../../i18n'
import {
  HostAppElement,
  HostEventTypes,
  PluginEventTypes,
  PluginRenameBridgeEvent,
  PluginSelectionChangedBridgeEvent,
} from './../../communicationInterfaces'
import { getRandomTip } from './initialValues'
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
  userSelection: HostAppElement[]
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
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgPaYBdcAbXKATwGUDUCxsIwAzVAV2IIBFmt0D18AYgASAeQBqAUQBKAfU6SAYgEkAcsoAqy0atmTVGmQG0ADAF1EoAA65YfAZksgAHogBMAVjfYPARk8mbgDsbgAsHn5BHgA0IOSIHqEAnD4eJiYAbBmhJgAcHkmhoQC+xbFoWHiEJGRUNHTYsFZgAMboTOgt3B2Y9kJiUnIKKupaOnoAGpqmFkggNnb8+E6uCG4ZudiByUkeAMxBuW4mQUF7sfEI4XvYx+kmu7kbEXul5Rg4xFgA1pCctKhqLR6KxMF9ML8IIIAMLSSQAQUMsgAMmoANKSTjyRHwmZOBZ9RxzVZ7XwebCkzy+PZuNxJLJ7E4XRC5XybUK5PY03wmLlRJJJN4gCqfH5-AFAhqg8GQwQAVQACpxEZJZHLVKjVBiscqNLjzPjbISVogQsyEFFyXsBUlcvk3Ht9g8hSLsDLxTRJfR3VC4QBZCSqzXa7F6vFzAlLImgElkin+Pw0ukMplxU0ZILYW1c2lRPa5ExeF0fN1iiD-T31b1l+VKlUo9GY0P62bWI1Rk0IRI3R3pbKk3lsmJpi0ZcnZpN5gseYuVIgkfhWL0MZhsDgaXAL9BWESBuRy5R6ZGSP16AzGA0R9sOTsO3zYHLpXxs62OtJBc1hTN7HbBfIZAVPCCWccHnDht2XJpWnaToNy3HcBhkNVD0kY9T0kKYNHDNtFhvYl3FCDIswTEwiiSRlnzyc0yXve4+yCUJ-BMXwSjKYUSwAC1sAhKDAYhWijZdMFwXj+JaKNd0oDRZDUQxpHhaExl0ShUMkRTZD9OVkS0bD5mvZZ8IQfNQmwXwMk8RlSOfQjfA-EcaPvcJOUSCJQnWNxchA7AuNgHi+IEhwhJE-zxIcSTpNkmQFKU2QVOPdTKDUABxY9dMjPCY0QYzTPMp0rJYjJbPNJIghSDkcx5YIPCOQU2NdHy-LEwSq2wAAnVAAHc-XYfhRICoQ4rU6SFThcQ0v06MXEQHkzmwO0gnMhk-Hpc57NCPYiIyPJHRCarbS8hq+tC-Bl3arqevQI6JMG9TVAwrDLxw41DJmm55sWjJHV8FbqP2bxHh-XJCjZbI3AO7irsClqzu68DIf6UQpJk895MU7RlNUhLktSx69NwgzMoQV65tyBb1k+5bPuo8yUkZTkcnM0IGM5cHfPhzBTs62HepCiSxCRyLUZim7pMS1QUskIxfFbPHnsJ4n3vJr6fvsjyUiiTkzKyMdTjBurOIh3moeBNquYu9nwuRuTovR2LMekzTtOUcb8cm1YgjZUyEwYzJtfpai3PJZ8M3SQimb8Tz9cqQ6jZO6Gzbh2PMEEEXZEUURoTlSgXblqaiZON7SY+5WqfsjMUgLZyAOyTlyNZxr+o5lrkHNpPKFYAAjXiCEtwWbfGVOxYlnOOxejN73Iha-t5VlTmprxTLyDzcr5JI9feaPDaa42GhbxPt5Ozvu97lH+4x+LRexyXpcNV3b1szMeUCIIThKx0Mmo04iKcnaPC2kJ1j13ZsuPePMD4cyPmAHu-MIqnzRgPe2GktI6VxulAmedqSZByuTDwpxGKEVWpcB+REyT0yeEzEIP4gFt2bq3cB7cu5QMtgoEWI8MoYPWrRRaf1Dh+AeNRH8JhbjVS5JZbWuRWIbxwDHehtD96NwYcfVO6dM7Z1QRNTsbIwhbFZIRY4BxyJcl+hEbAGs6ThBfskGcUdpFbwUXIsBCjIE9z9PCVQcp4TImRAATVkBoUQSUJayBgbIUQColJqJlmgt200NYPj-jkd8VlUxEPCGVbagR3rPmobIk2Z1KBYCgPxC2IS+7wPPkNJBTs2HoNWGEB4FI8xRBOH4Qq1F-A3FIaIskBx8wZC8qA9ACoOLtVgGAZcYBkBWAIOQbm24RmoDGbAGEYTfHQlEH6cJExpL+NkHCVQ8I-QyEkAqZEClJbqLvoZYI95sgCmcrSDauxhyXFpE8LYAF1h4MKBTAZF1hmjPGS1SZ0zZkXSsAspZghMSaFkAqYQ8kVKRNvrnOpHtsB3OzF4B0AEIifjMpmAUmRqQSNIhZP54EAWLKBSbDoxB+IQDmVSqFChjyGCxGcpG8LEUXKiRo656LMUPJxc8z8LSKQHDyN9VpHtgI2OwIM5lNKGh0oZUyyFcBGiFP4kqwQrLJBIk5cNBF8IVI1JiQgGqOiojhCKG5PISQxUL08BItefS3BmQpfwJVy5VWQHVYC2AWrMBFLALq+EnAsTctNZIZFV4rmEytXkG1iQijHCBp+Wk3hJzrVwRyD1rx5WKo1b69A9L-X-I1UGuwIadUauhZwWF0akXms7FkWizSPWGMKEkXwYqX5ZhCGcI4Y56RFC9UMktLU-WMsrYGhg7UoBQEKbquEohpAKDkM22NrbDJJtJi5O16bHUjlzN4I46w17EvIpHKRCq53UtLeW2dlKq0LtQEuld9blBJVUOu3lKLR6JrpNaw9aaHWfhpD2XMhx6S9seROn106y1qofUs+9r7AWCAjVidU6zVAqGkEcqNJqzWXNRdNLtpi0gnHyOQuyrzGQV2qrm7af5ENTtpShitmHqVBuLVh-DhHTzbt3fLTwZU-4bS5E8QoGbT0SYpCxp4BRCqFQ44Cp9qHePoYE9SvV8kkpwtIwB+NFH860gpAEBitp7gAUg7NC9Q7wjmWtP0otaHlX0BnQGvjGHvX1v1UiFS+HOBGuMzysTecgYpECGkZIzMzJM3xeipzuxk2WI04+5Dz7fO6c83q1SSJHZaAizGqLqwOnMc+pKk4-g7SZryHNaq+xWQPFIutLLYytM8YC-OvTYyG1NpM3Gp6QGMHBB7OtEdZl9g-g-qe583g0gSNZB5M4hYvKqFwPUHe9BKBWFQC0cUsAOJwBhMINxSVVR-r1EpKLryKamRKlkHIlokiZFiCSTwWxKTWLvdt3bccTYHaO5ASgxBFlneWdCS74sbuiDu+jB77gnvfQWprZIJw7Lu3SBigIJwabWnCKUNiwlGDwDmCKQD7DVgAFowjmgZzcG0RLSQv1pKRdzd78BEFIBQL0NPakEXNBtckAEBQew2MxdaZwvK85qALlqjAWA9W6Lwcb0TOxmhHPm24207RpGON9Mk8vqj87qCbKCbQOhdB4L0TX-LCZ+HJAezJ61BzycuByEyL96Y4u+vSW97FKg+grICKsQuLWM5HFkTMMX0tqdZHXeVYeJQtWlGWKPmjPZPCpEBDy+Q8Ujja3NG0TwCyA1wV5NPlYTY+mz4ZF4FJcpeESHSaquRzRHEcpybkvIDgFFqnesCi5BdmfG3U0I5pPo+HuAWgxf8PJeVHxBZXq4epwXAlYRvhMddEILFsJeUuasbBTyPzc2-ILNBt7BS-i5d95yZt4dyERsgLR-EY+yRw5+a0OAP+DbnEPWxNmGhYER-KfbvXtLMPvO0fwf-RiHJexE2YSdmCA00NwAOEqUyURDMB0OkPsJA46JuPJBORxYg9Ai0bRXtO0R0LkXkBbIhLwb+P2D1JmT6IA+qOxYgkBOhJxRhAgSg2yDYB8A4auWzZiA4T+fYeJemRkKIZ8J4Ig5qUgjqApWtcZJOSg4ILaUyeLHQ9aDYLveyIdCkA3AoR0HILkLrLzbQ6fb-BaX-aqQqEIDYDYGwiZKZGZOZCFQNSg-fdwNkTYXtP+aXbHaTDwnLbTPrPjSgraTaAIAcIIhiBjaaMdI-CRFiTIF4QBDzHTLzbAHzTzatbVMNDVOI9FMkdID1PwDkFTFLbNXMdLUmTLPImI7rKI3rSdedEFGZIQ9bReZiHkFiAoPMJ1e8FbcIdHWkcdNo7o7LLjXLYo99T9ENJVOIxIfHNIJI+aZLU9GkIiScB4fkB1SIxY6I+Y-LfI-o0mQYyiEYkqfYSDMcJTe0QPLnXIgHHbWgPbbQ13KIT8RITMACQ4DaLRBif7YA7AQHH44HBoUHY7csKHOAfwt6AE09NHF7bIFpAoTILbb4lQ+Ew7REiHZEynMbWnRAIoTYMkXKMmciQoJ4jEx0Z7DHUkLHU4UnYoIAA */
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
          searchValue: '',
          isOptionsOpen: false,
        },
        ontologySearch: {
          confirmedRenameParts: [],
          focusedDefinition: '',
          fullText: getRandomTip(),
        },
        renameValue: '',
        tooltip: i18n.tooltipDefault,
      },
    },

    schema: {
      context: {} as MainMachineXSCtx,
      events: {} as { type: 'FOO' },
    },

    predictableActionArguments: true,
    type: 'parallel',
    id: 'main',

    states: {
      ontologyState: {
        initial: 'defaultDefinition',
        states: {
          defaultDefinition: {
            on: {
              HOVER_DEFINITION_ENTER: {
                actions: 'showDefinition',
                target: 'specificDefinition',
              },
            },
          },
          specificDefinition: {
            on: {
              HOVER_DEFINITION_EXIT: {
                actions: 'resetDefinition',
                target: 'defaultDefinition',
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
                actions: 'assignHostUserSelection',
              },

              HOST_INTERACTION_SELECT_SINGLE: {
                target: 'rawSingleSelection',
                actions: 'assignHostUserSelection',
              },
            },
          },

          rawMultiSelection: {
            invoke: {
              src: 'checkForFigmaDocMessages',
            },
            on: {
              SELECT_PREV: {
                target: 'multiSelectionSubSet',
                actions: 'assignPluginSingleSelect',
              },

              SELECT_NEXT: {
                target: 'multiSelectionSubSet',
                actions: 'assignPluginSingleSelect',
              },

              HOST_INTERACTION_SELECT_SINGLE: [
                {
                  cond: 'isSelectionInSubSet',
                  target: 'multiSelectionSubSet',
                },
                {
                  target: 'rawSingleSelection',
                  cond: 'isNotSelectionInSubSet',
                },
              ],

              HOST_INTERACTION_SELECT_MULTI: {
                target: 'rawMultiSelection',
                internal: false,
                actions: 'assignHostUserSelection',
              },
              SELECT_FOCUS: {
                target: 'multiSelectionSubSet',
                actions: 'assignFocusSelection',
              },
            },
          },

          multiSelectionSubSet: {
            on: {
              HOST_INTERACTION_SELECT_SINGLE: [
                {
                  target: 'multiSelectionSubSet',
                  cond: 'isSelectionInSubSet',
                  actions: 'updateSelectionSubSet',
                },
                {
                  cond: 'isNotSelectionInSubSet',
                  target: 'rawSingleSelection',
                },
              ],

              HOST_INTERACTION_SELECT_MULTI: {
                target: 'rawMultiSelection',
                actions: 'assignHostUserSelection',
              },

              HOST_DESELECT: {
                target: 'rawMultiSelection',
                actions: 'assignFocusSelection',
              },

              SELECT_FOCUS: {
                target: 'multiSelectionSubSet',
                actions: 'assignFocusSelection',
              },
              MANUALLY_TOGGLE_HOST_OPTIONS: {
                target: 'multiSelectionSubSet',
                actions: 'toggleHostOptionsVisibility',
              },
            },

            invoke: {
              src: 'checkForFigmaDocMessages',
            },
          },

          rawSingleSelection: {
            invoke: {
              src: 'checkForFigmaDocMessages',
            },

            on: {
              HOST_INTERACTION_SELECT_MULTI: {
                target: 'rawMultiSelection',
                actions: 'assignHostUserSelection',
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
            },
          },
        },
      },

      NotationState: {
        states: {
          SpacedDashes: {
            on: {
              CHANGE_NOTATION: 'SpacedSlashes',
            },

            entry: 'assignSpacedDashesNotation',
          },

          SpacedSlashes: {
            on: {
              CHANGE_NOTATION: 'SpacedDashes',
            },

            entry: 'assignSpacedSlashesNotation',
          },
        },

        initial: 'SpacedDashes',
      },
    },
  }).withConfig({
    actions: {
      showTooltip: (context, event: HoverUIElemEnterEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.tooltip = compIdToTooltip(event.payload)
        assign<MainMachineXSCtx, HoverUIElemEnterEvent>(ctxCopy)
      },
      resetTooltip: (context, event: HoverUIElemEnterEvent) => {
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
      assignUnlinkedData: (context, event: PluginUnlinkedDataUpdateEvent) => {
        if (
          context.host.selectionFocusedElement &&
          context.plugin.renameValue
        ) {
          // send to figma bridge
          const bridgeEvent: PluginRenameBridgeEvent = {
            selectedNode: context.host.selectionFocusedElement,
            type: PluginEventTypes.renameByPlugin,
            newName: context.plugin.renameValue,
            pluginData: null,
          }
          parent.postMessage({ pluginMessage: bridgeEvent }, '*')
        }
      },
      toggleHostOptionsVisibility: (
        context,
        event: CopyCompTxtToRenameEvent
      ) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.hostAppSearch.isOptionsOpen = !ctxCopy.plugin
          .hostAppSearch.isOptionsOpen
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
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
