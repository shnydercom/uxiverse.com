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
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgPaYBdcAbXKATwGUDUCxsIwAzVAV2IIBFmt0D18AYgASAeQBqAUQBKAfU6SAYgEkAcsoAqy0atmTVGmQG0ADAF1EoAA65YfAZksgAHogBMAVjfYPARg8AbG4BXiaBAOwAHB4ANCDkiB4ALJHYAMweAJxJSQEpHl6Z4QC+xXFoWHiEJGRUNHTYsFZgAMboTOgt3B2Y9kJiUnIKKupaOnoAGpqmFkggNnb8+E6uCMGpJv55JpFp4QGZbmFxCQhJXthJJgFpvmkZvpl7peUYOMRYANaQnLSo1LR6KxMB9MN8IIIAMLSSQAQUMsgAMmoANKSTjyeGwmZOBZ9RxzVa3cI+KL+DLBA73E6IXw7XyXNJuNLZDzhNxucLnF4gCrvL4-P4AhrA0HgwQAVQACpx4ZJZBLVMjVGiMbKNNjzLjbPiVoh2TSEEVvJFMlk3Ls0iZwiYkiUyry3tgxYKaML6C6ITCALISeXK1WYjU4uZ4pYE0BE3wktmRcleAJUtKGulW7BPZlmw45Exmnl850CiC-N31D1FyUyuVI1HooOa2bWHXhvUIZIebBBDzWyKRHYWlMmC3ppks805zKRfNOogkfhWd0MZhsDgaXBz9BWER+uQS5R6RGSb16AzGLWh5sOVvMhlXIJJOl+fbkw1uXLpjy3XyPVNpO1JadKlnDhN0XJpWnaTo1w3LcBhkBV90kQ9j0kKYNBDJtFivQl3HfTJrjcfx8PwxNPxTbt00yKionCfYuSOe1XkqAALWwCEoMBiFacNF0wXAOK4lpw23SgNFkNRDGkWFITGXRKCQyQZNkb0JURLQMPmS9lhwhB-GtdJ8LZW1vz-NIAhTLt0jSaIDjNAIwnZQCcFY2B2M47iHF4-j3KEhwRLEiSZGk2TZHkw8lMoNQAHFDw0sNsMjWluxJFkHOMu4kjMlM328TLmRMMze0icJfCnB0CxctzBJ4stsAAJ1QAB3b12H4ASPP6URRPE08pJk7Q5IUiLoti89MN1HS9JSwybQfDKsviWkng7TZdiSQ4vH8ZknOwSr2t8-BFwa5rWvQfbhLEbrAr6kKwsUsTItUGLJCMXxG00rDtMStYzJJSdMipXwDmjFNIk5bAbQOfZPBtMGPB2vafJqwF6qalqQPOvzLoC3rgoG0KhrElS1OUOKtIjFx3AK7xAjfPJskyb8ogsi4dkiG5mUidbvwRtjMcO2rjvRtqkb8u6lMUURIQlSgyc+inVlK79O2K9ab08Q43BTScOz8ON8Oua0APKp1EeqzzBbR07+cwfyCfCkLFVhcRYWURFYQAIResaPom77o0eTtAlKnJ7jcDbyPD9JokygIwbp7kTZYvnRYFlHkGt1PMEoVgACMOIIO3rrx8ZxYekbvfe+KvsphADUW3SqI7PsWSuK09jfXnXJtxcM4xrOc-zsBC+xnrJJLwaHdCivXqr8nWwCaNsAD01zj2WjMtffwGXZXwrk5A2WS7qqOuz2q+5F83Drzgui9x-rS8J5TVPUn3q4VxBF5JFfWXXrlkwbncaI6Y2Y2k8IEOOx8e7n0zlfbON9h52wUGXOWfta5f2XiVVen5aL-xTPsVIcY-BmS8BaT8xsmLORTnA3usDT6D1vmXWQktpayzfvPHSHIkjLxSLkXM3Z7zUkAaaTI2Bog7GtNGTYtw3BQIHjA-uNCEGF29LCVQEpYSIkRAATVkBoUQUVnqyFHqIKUsk2Fz3lq2fwqQvB-kTFzYIEQtbCIKmIooAQuQFRCNZeGScqHd3kenOhB14FDxHl1B6hN8ZOxdm7T2ldtRWJ0hgn+a9cGb0AfZbwJUMh9lDlkChjpk6BJoZbRqlAsBQC4jbO+48H6T3us-EmqCWycKuKIyctpwhGW-Gacik5LhBDovZO4UQAhyLKSjY6lTMDVLALU0eZcYmqGdq7d2XtWkJVrvlXKuZwhMkTN+QIKZMq6xDlkWiyRO7+N2tQ+h5TZnzMWZEseQUGn2yaY9Z6Wya6rHDoHXhhEgb7DCJkSOJhKLRnZskay+w-GUOwBfdAUpmINVgAs2qYBkBWAIOQYWm40WoAxbAKEpjdGQlEN6MxEwxL6NkDCVZ3oZCSClO7SEiSLzJO+pyBkIRBEcmuY8V8WQ0hBzjpsPK9wek7WRai9FmKUbYtxfi06VgiUksEOiTQsgpTCCkvJCxSS0H-LjOKt8TJPBJEIuChub4igQ28XHcOqsEXFJwHKjViqGgdGIFxCABL5XErgIIBQh5DAYndt1PVBrOXjTaTys1-KLWCutcKu1OQSRHAeErIGBVZWnSDRixcvr-WBq9bARoVSuJFrAKGhSCIo1iRjbCeSvyP4IDBqIns34dhcnZDkV81kGRFD3p4i0k5giMXdUiwtXqS3oD9ZActCrK12DmTWr1ghYScAxC2w17bWxduwD2ukqsB1JBFX4TsLImR0nZMEMyBaQK1oXUugNc7V1Vo3WAWtWrOA6v3ZII1XKTWf0XiewRuQ9jsyZK+K4kK472VuOcLamRn38FfbVUty7P3BsrRABqUAoBVL-TCUQ0gFByCAyB+N2zVjHtPX2u0b5L12uycvVuVzCnXAwyi+d2HF1lrwyShgRGSNzL-coKKqgKNxt9gm2ujGyRnv7ax18IRvA3CeKVX6VE-x8awyjHDH6X0VtnWZhV27d0KlUJS1QKhpDMr3fq1t8n37WJtRDbsxlmSfmtBplkmDzieGyYzadBZPUKrfcJyz+GLOYa3fZxzx4gOHsmhrS4-n8LRD2IEABpxPC9k7P-YG-grlpEMwJ4zQncNxdE1F4NoapJRV1a5tt7DuW1zpBydIFprT-zNNGW1hWbRiruIzLI0YQhxiKZFkT3r6AmZXfFxrGL63hvlPJeznAm1tdjel76IiT0yJsZsIbI33DdgZBNoG5xoi+EImVRFa3FvYGWwtytr2NuSARMTLQ+23OHe65mMRoqAbdhg-sEV1lgteF2JI4qz2Z2vZi3VxLX7vvaube14DwPFacjFaZA5eQHy2gK7ha12AOQTafBkM0lXbmqFwPUC2KNKBWFQC0QUsBmIhshMINRUV5SyY1LJfHiA4ViItI97ehFrjhENPk9Ij28ghC5FRTxO1mes7Tg0DnXPICUGIMSvnpKBdC5F6IMXA0JcICl2DOMhE-Dy88bEBuPSxVO7yOEQ4uTHilAdHxRg8A5h8mNYp1YABaN8hoY-cJMInzYNiObnAmbc-ARBSAUHdBH+juFDRmW4SRGRRRrsRadJnmoOfaqMBYK1bovBFMeZ0vXU4KQGSESCGMoctEuY7Sr9nuoKNwJtA6F0HgvRm8cO+n4ZuGung7DsQ+Q0KQxUlW73sXvUQ5tOk9CWf4ZY89-ILw3XsHYxzZAyCybIdodr76FLVUURZj8druB2Cd9ImTeLtIrwB1ovd1prgx1rVjR78iwD9FxPRX9WwshUg94Y47QhsqRBwuZGRMxzgH0uQ3UCxgJ5xc9QNI9T9TgbhLgqJ9MdZJ0gYdo8DQJa9lxWpoIQIrAYDW8XFThhsxFcxipGZOQPA1p0NblaCFxapR9IIWgmD5xWDvoWNqd+VSoQgeNB1hFvArRJxfdHsekBDJkHlARpCdk2MOD-Bi9LUMhaJHg3xkcKp7lQkvIbZ9DFZSpIVmRMpUxJUzR3cOCOMcwQUdZchE5EUzZdCGghYQlp8ut-kCpRE9gUhipJFrJch8FPwT0Hx4U9ZIcrDTYbDkYGhkUe5lEHDaQ44fABsO9zRfdEi7VcwAhvMbQDlMoDkgZ09Ajsi2cQimonkaks5Ci1gwZbxDYchQsGYUxfEyCpFsDNgGIqtosj9CD881hDD3AjgaiacycbgZFmiUcFtFxlU8UCV1VV0ei29cJAgT1xkXV-NORpjg00dTMMd8Mej7Iaj7wqIXDrh45Xxw519CIZFw59h1Drji1BN30VtRN115la1HiSoeEwUdg8h+DggRVNgb1GZ4SHsntAS3sPt6s4BsBdjTg6MT9dILRv5NhAhe8QhGYKcfozUadrIhwQC2RMTbjQTcTCNUBiNSMvVHjkhOx7VDg-x3iOQNMCgUS814cN9GcXttjgTYt7iGsFsejHtipl4yTsl4UqSNNsgStcgwZcxE9CltcWdaA2iwAejY8G5EwaiNjncDlOR+8mdjScj6ADdudixTc4Ajj2D9QQgDIshzt2RHFBDEUdcTS9cXTOc3TjcPTQ9CSO0shRExsmY-A7g4TDQ6J3F-THhAzQDA9iggA */
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
              HOST_INTERACTION_SELECT_SINGLE: [
                {
                  cond: 'isSelectionInSubSet',
                  target: 'multiSelectionSubSet',
                  actions: 'updateSelectionSubSet',
                },
                {
                  target: 'rawSingleSelection',
                  cond: 'isNotSelectionInSubSet',
                },
              ],

              HOST_INTERACTION_SELECT_MULTI: {
                target: 'rawMultiSelection',
                internal: false,
                actions: ['assignHostUserSelection'],
              },

              SELECT_FOCUS: {
                target: 'multiSelectionSubSet',
                actions: 'assignFocusSelection',
              },

              HOST_SELECTION_UNAVAILABE: {
                target: 'noSelection',
                actions: ['toggleHostOptionsVisibility'],
              },
            },

            entry: 'clearHostFocus',
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

              HOST_SELECTION_UNAVAILABE: {
                target: 'noSelection',
                actions: 'clearHostFocus',
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

              HOST_SELECTION_UNAVAILABE: {
                target: 'noSelection',
                actions: ['toggleHostOptionsVisibility', 'clearHostFocus'],
              },

              HOST_INTERACTION_SELECT_SINGLE: 'rawSingleSelection',
            },
            entry: 'assignRawSingleSelect',
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
                console.log(event)
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
                console.log('host deselect')
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
