import { assign, createMachine } from 'xstate'
import { compIdToTooltip } from '../../mappers/compIdToTooltip'
import { getI18n } from './../../i18n'
import {
  HostAppElement,
  HostEventTypes,
  HostSelectionChangedBridgeEvent,
  PluginDeselectionBridgeEvent,
  PluginEventTypes,
  PluginFetchBridgeEvent,
  PluginRenameBridgeEvent,
  PluginSelectionChangedBridgeEvent,
} from './../../communicationInterfaces'
import { getInitialXStateContextCopy } from './initialValues'
import { getSingleUxiDefinition } from '../naming-recommendations/search'
import { AvailableNotations, handleNotation } from '../notation-handler'
import {
  RtLdGraph,
  createEmptyGraph,
  createGraph,
} from '@uxiverse.com/jsonld-tools'
import { AllMainMachineStateEvents, CopyCompTxtToRenameEvent, FocusSelectionEvent, HostAppSelectionEvent, HostFetchEvent, HoverDefinitionEnterEvent, HoverUIElemEnterEvent, PluginExplorationEvent, PluginInputTypingEvent } from "./stateEvents"

const i18n = getI18n()

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

/**
 * stores a full iri along with a shortened or custom version/alias of it,
 * or if no iri is associatable, stores that as null
 */
export interface ShortFormAndIRI {
  shortForm: string;
  iri: string | null;
}

/**
 * stores syntactic blocks relating to a schema as far as they are known 
 */
export interface RenamePartSemantic {
  type?: ShortFormAndIRI;
  property?: ShortFormAndIRI;
  value?: ShortFormAndIRI;
}

export interface OntologySearchXSCtx {
  confirmedRenameParts: RenamePartSemantic[]
  /**
   * the IRI for showing documentation when hovering over an ontology-entry
   */
  focusedDefinition: string | undefined
  /**
   * the IRI that the user investigates by clicking on an "explore"-button
   */
  exploredIRI: string;
  /**
   * is searching by sub-property or by sub-class
   */
  isPropSearch: boolean;
  /**
   * the description text shown as documentation
   */
  descriptionText: string | undefined
}

export interface PluginXSCtx {
  /**
   * text at the bottom bar to guide the user. Changed when hovering interactive UI elements
   */
  tooltip: string
  renameValue: string | undefined
  hostAppSearch: HostAppElementSearchXSCtx
  ontologySearch: OntologySearchXSCtx
  graph: RtLdGraph | undefined
}

export interface MainMachineXSCtx {
  host: HostAppXSCtx
  plugin: PluginXSCtx
}

export const mainMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgC4Ht8AbXdABwGVdVcxsIwAzVAVxIBVCTyBiACQDyANQCiAJQD6AVQCSEkQBkRAWXkA5duIDaABgC6iUGXyx0pfJkMgAHogBMAZgCM2ACw6PTpwFYHvu3YAbAAcADQgAJ6IPsF22N5OgYEA7EEAnA52OsGuAL654WhYeFyklNS02LBkYADG6IzotZzEZfzC4tJyiiryABoy7LoGSCDGpuaWo7YIdq6B2GlOdgnewcHe3sk+yeFRCE6uwQuJKTq+aSlOaXb5hRg4ABYmuBRgRHWTVDR0mPhvH1qk3aFHYEhkGnEAEEAMLsGQCNQSCg9OESZRSBTw4ZWcZmdAWKwzBw5bCJObBG46OzJVx0vbRYKJbA6Bxs2JzbyBDLJO4gIpPF4Az4EzDfSp-YVA0UgsEQzRiWHwxHI1FgigQgDiShxozxkyJiBJrjJgQpVJpdNcDNmzmCi0SqScDnOgT8Dj5Auwz1gr3eIos4roACdUAB3ZRsUhS4EopRogAKYhEQl1RhM+MJ02iOmSOmwNO81KL8zsaWSDhtWTs9ocS0C3jsPhCl28noe3qF-ulgYqIfDke4MZlcZEaLUIj6Q30uIzBuzB1z+cLxZ0pfLlci9mWJtpiWurl8JN87eKPr9gK+fewoYjUfQw4ssvBkMVcIRSNHaI1am1IjTYxzqKhqLnmBbJEWKxrmaG5VgELg6EsawpK4aTBLSHoFPyHbno+YrXreg7Rt2wKCKCL4KkqH6qvG6pajqTgjOmEzAQuPgZNgyQhMkaR0hka52HBpJ+HSOhJAJGynoKvp4UGN4DveeHPvK0LviqX5ghiWIyAB+qsaAMybHEHg6E4wTOOc8zrFW1K1vWqHcuyJ5YV6uEkaKcmEYp7lPhpEgAGICDCUgULpQFZgZ0RePaXIrF4XgOK40U2mZZpkgkiVOIha68W2Lk4V2l4edeyDeUVgYsAARm8uDKa+VHqWqyL0f+M56uFUyRQcyFkhBuZeN4dJmbsW4HLl2AkpkHhcUEriJVJnYyT5+E-NgpVDstFBVTVdWUWpn5NT+f5aIxs4sRFNj2IhLhshBmzBKZmRujZ3KcWyLq8U2GxbAtbnlStlTrcR-1bdVYC1WRcr1ftNFjppmLYm1zGZp1l0HGZDiLA4yQQSSTpltao3XFl6XOkl2WoYev2FQGAN0EDD6bdt4PPgAIiIGlhedqMzE4yQPZxXLOIlOPoSsVbNgW73OFkmwOIE1NLSDJVlbToM7X5gXBaFSOAdzIHXBWBZC2ToupN4EvrG9H3rHWvFOIrF5qwR4YUFgUAfEpkMUapyoHbR6IIzput6RdMyOI42CBMsayxHNaxBCl-O1kkgRJWZNxbHl9zFMGdT4MgyBgJgEA0MVq157UBdFyXZcWDCRAmJAPAiKzgwSDCAjKAmKJQmIMJ8FzKMgS6JqXBSIRBBBriODaOPJBN5xcmsWW0usC2V9Xxel1eFf54X2915gDdNxALdt2CyZqFCyjiCICYKLCrVMXrw8LpkY9mkck8pINs+jekNwjpqQZDThWBsG9941x3uXSokB8SYCgDCAulAwCoGDLUR4QYeD+QhDICgfB5AXw7l3HuIg+4DyHvOLqzhP4T1iL-Gem59ipAWA9TYawkoMIdvlXOUDD67zgRABBSCUFvHQZguSWB8SoCIMg5AqCJGPB4MmTuyhb5qFZhIKECgEx8ChAAIREPCGEOiFAAE0qH6TRhHBevg7qpHcGZMIRMywnFTuZaOdZsaQKrgfWugi6DwNIIg+RiiMFYOvNI0gsiwniIiTwAhAgADqJDu6937oQ+EPcrFh3sNjBe8sViNkbFlI4Noiz2lQmkGprhaSHjrLyXhOBN7+Jgb2VawT3ZxLQREzy-CS7uzwnwdAUBHhEFGY8P0Sj2BgGsLVPyaiyEUMIaoruyhck8xzBsCaRZPCmXQvLZhUUIJAKSOZEkS8aS+K3gE2BQThEhNEQo+JkiCIDOEYg4ZkyJljOmRE2Z8zEnkMyS+CQj9zHiB1i-UOWzFw7L8CZLKw0jk2g2PmU4IRlgPUQiEG5bSj5yS6aEsRvS3l7z8dAoZy0RljN+VM15jxAULJBQPMFmgpzQrOm-LqWUEV7NMgc8BxyEBpASKac58EjlBHxdAwl15iXPPCeSyorSqVfJpT8yZ-zMHMvaKISQSyJAGLECklEEg1nqJEJoqEftNkG2yN4XZSKhWoqJllOIqcQjy2dKA4IsqBH3OwIqnpSj+mUu3tS-6tLxnasZXqgA0iIcxSYOYUDSQmY1prknmstRo1mtqPz2rYo651+yUXPSJucOImLzKHG2NyANdyOlCJEaGvp7yI2DI1dGrVfz41zNqq3duRqMkDw5dOGFHUHX8pdRWkVKQ0iCxMjcS4zofBNvaXTYNjzumkrDdePxyqmXkFgGof4y1gUrLBRCqFxbeWlsReWw5laWE1KjqnfmJY7rZ2wnwrtW6iW7pJS8slkTVpHvjae89Skx2EIhBICdXL2r6xLbO59wqbRpA8B+85fMrJgM3fKzpwGlWMrkpBsD7BoMXv+ufEdpDVQrInfetGfKnVPsFfOm0MECzVN4uWHijgmk5xaR84jranntpVXQIgqAIhgGDIyhQ+BUCfKgDggQUhNE3qhJCsQyHkbULY9sFw6KxJiRyDcJwWHGwsiRZseYlxo5EcCTutt+6O2rTkwppTYGVNqfdjwW9kg1ACDBIFbTrNWO81M9gczgRLOoSbGinDArEKNjFT4PIzSbzibcyGzzMnsCUZmaehQ8nFNnvwLgfy+AWAl3o2CUdrK+AsZDtOhctj4jY02I4g5Lj9g4viCZDLZZVg5dE3lgDEmHkedAweiDRWT1kFgMy89tX6uNeHc1xjcH2tTtQ11br9i+tzAG1h0yI3PCVNMmhHhU21WBpbXNqTy25K0Hmcp1T6meATokGFiLWnNExeiHFhLSXrOXZcAKnw2Q7tMlc0GwrC2vOVE+zqx4AXfuRZ0whg73LjOxa8PFvZiWQjJZs1W6k13TKJedBWSbf6xMzYK6R6T4HKg1DAAAazCUIdAYAwzGGDCygOSy4MWrHOs0HBxwdk8hylqtg1cPevrYkdCSOXvube6j4r3O+coIF0LkXtVtOCANRmrNZqRBS7UfmwtiJZd8qXQzosfNfB1PLClTwquGEPXcNkLX27FViGLqgIuYeyBydqGAbBuC1D4MITtqX19b7Jgfk-WXH9Fhf2OAw6e-99hfQdEkOkd1sZFOD0BkRYfMAR7AFHmPceFUKNwBEOvDem+oFj015E7A+7sD0YqFEsvjhxDQhBII5yMKBCrC6Mkcxyz7jLDkNc1eFWkc75HsA0ee8t4pbc9T3xRcJkeKGWAYA+-KBkKzVmShh9QlHx1o7bGc88hKZkQ5Svi8L53Mv6OVfdwJnL0J7ZtEPLfcPHfPfWPcNI-d2ZQdACACAD4M-C-K-C3ToE1G3CQKXPNa1AtO1F-HlNjJke0akVCdCa4R6dCKsMCGpGpbYS4F0RLVkDfEjWvKAxvXfZvOAtpBApAlAsANA1AS-HgJNFNZMCgdNbAnNW3fAm1Igw7Eg3mMglkJfKg7DZ0WggBLINwBg7YByMsLITCR7fLZHSA+vaA3gzteAxBRA5A1A8-UQq-TuNQXBMQVQG-O-B-PgEfZ+QnaxVQsydQygpgmgkafYRKGKUbMSNON0PFXLMAwDTfTgqw7gmAg-LnMAXnEQy-VmJgaJGUNwjwrw2-e-e+Pwp-AIlDFQ-JDiRxXifmL9RKEVAIBeWkWpGkRIKkJIBaBmPIrIoJNvCIIicgZwy-WAHgTuBMcxDNdgKcRDAQVPG+O+TPGEGoozII+wbYKOPZQ4OaLFNYSI+wM0J1LiJISpGsLiDIfo+8QYolEYsYsgCYuAHgCEFEMQMER-Z-ZQonewJkPYzwOkeWJkY4qsLOAsVOIsIpTwETZnNae414uSRoIgD4CAMYwYqY9mJQTQLRR+ciH4zY1+f42YQEhsYEw4sEnQ4vRsXcVOSgsVRwPwO47gB468VE9EzE142AKod2Jw9AngHE4xW3Ak74qo34wIvJBAZwFwUsBIMVKyVCLiKscsJdBIc5C4dYZ0Vk0gdk1aTkyAbk9A3k0wRBAUlwngKEO-CQIkwzEk7YmUkneU64QaCncsOfUaF0AWDUkIN0TIRKW43LAY5Ejk9ANEo0pEk0+gUMKAKAd2QYlREQAQMQdmSQO07PZ0s410pUj0m0YWBCU4Y4HiJYD3XU9AfUyoQ0jEqMlw3kiAWM+MxBRMmQTUMLZMTMuU7MxU90lUr0syGHIs1hWOX9L0EM9AlE8Mrk2syYxEtk14q0m07TEomQTw1uW0iU4k2FECPMGtKCZYTkB6TIfMjXFkOk0yQ8HYf1YMmcoY7Aas40usucvUhc4UzQAHB+EKdgZJZYok2XXcqOGWCsZ0FYesE8vmeIc8xCHIRHG8+cicsMiMms+Cp88cy0lczwjc-w-8pKeLGWN0VkVkOtfMsSBeatQPBIAPRwcsysugB8283ktCsQ1mRUTULC6o2XEsTiJFPmLiddQSL0iOFkIcisIII8Gi0Mg0qcyMlC2cpiq-N823FENw+-J-cU7C4g0kkkOU0bHIGsdwV9I0Qi4SzU44e6B7BEv6Z2VaBmWSZmWqZQKENQKQMxOY9gAQTUP8CQAQBMP2e07cticSQWN0U2Zo8WABSWZk80bwT6TIfILCP4BgeAUYAUKUuFAAWjmBtHSpnnsw8GxmuJWFHgWgIFaHICDDSpAiyqJjrHtC9W1LrHaNMIRNKu4HKFWgYGYCjBaDasqoXFSBSlWF6kggCHaNzDSBKtKHKuvGqDqAaCaB6rKD6q6jqTiCCBWH0qZBdEskGogt-mpFGppHGsdlkj7GWpsUJn2D5hw2OCSEcAyD5gbAVlyysp7G3UlGWnOpmAGqJnMmXGyD8B8COtpFuBeppjes8gUg2n+i+sQFSExi8A0OwzdAek9KurBMWDWESjmkOJnhOs2hVmhrVnsthoOEnijgggGjXB4iSBsnmGthrCZByjmmatcnBrc1vDdnNLj0+tqNJLEpNDxi2HOH5kPF4jpqXWZKmhngcl4nYNoFJuqv2EPH0MYMYOpBJEznlpDHMPrkbkvwgFJp+t-3zHmCSArCn2FvOG1p1z3T105zAFJqFgdCXzJgvL5htBnnzAYMEyODzDqXhNAN1ogPm2PSkUwBkTkWW0VuaPi2WG5FKXNkG0QApxZEMOcEuEPG5FBrMNZwsNDvI1sP4J7VphjXpUx2ZVJujhcCWFdsSndpOIQG5AWGlhniZrQi5BtpRzDsPWW2o1Wxg15q2OlNYRZHQiOHtmMNiAqWuBZH4yOByGFosqDrzu127sLpsoeDwhhEeFQEQUgEVtZBrRMlSEekmkupzDEjLQSlMxxlHI7GSNm1tpAx7u80qz8yUWx3dlJrhwRr6ibGLHlhnlSwXiSnNspBSBlhAIfuDpr111fsqFKwBXK3fuq02wa0Nr5sdJMOPumiyGdHPtSwQh4vMgenWGvNzqPyfvXrAwoz7tPXWxqzqwwcPpJDcDEg+gnsyG91Gmw2MiRUapiq8Ggf-SobZwLtoevAx2+0C0QR-q4r8BgkuGODMgSEuyqSLKyk2GdHvtEYJXEfgY3uyN5350F2F3wFF3kdZGGupA9V8DTgEquqXglTVzqR6K7ssK7x4P3wqqwelJivtGuI1LMjLDSBSkyEWB9tSBpArEQg8bSK8cyMeLIHb23wyObyrvpqCf3FiBqXn3zC-gAOWDQmAPiaeTSe71gKLvVSgBP1wEGJ-tzCdWyGnmnh9TWHyajiXwbWKbXxEZZzEfzvKa4MqbvOSIEMcOENePkZVpXBiDOIKs6cKZ6aAPXySNgdSOGfSNGbkgN0GIKMaAjuMwCuOwxgmgYPOw8EpDmiEj40YJ2HcGLOXpgdXpDq2cSZsINLYCIAab8bhTEph06MYL-i5HnxNC9TLB4mxiXF0ZwHkt8eHv+YvtmDmgXmnwuFQiLDWAkoQs6SePvBeJNKNscfsCPCjjAf2OuBlTgpfNxarOkuQtpbrNJspCrEpBcHRdsfWDcZxZcMnKQsfNnLNI9imfQPkbqpMnljARJA2BIoX19I2DMpXl5cv35enNkrgGDRGKNtejqXd0-zQkuFVP5k4lThjnWHiJzoRPhcQvVaZdnIbNQDjITOmb+YNmxhPNJAVeHPWFhefIrMkvpYFYYv9d+cRZ3N1b6iBq1KNcEsjiMicSWHMnmHityCAA */
  createMachine<MainMachineXSCtx, AllMainMachineStateEvents>({
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgPaYBdcAbXKAT2zGQAcDyBiACQHkA1AUQCUB9AEQ4AxAJIA5YQBVhLUTw6iJ3ANoAGALqJQNXLHQF0+TSAAeiAIwBOAGzZLF+wFYAHCoDMFgCwWnVgDQhyRAcvbGD7ACYrTxVwn3CAX3j-NCw8QhIySlgaMABjdAAzdFzmdm5+ITFJaVkOAA1JVQ0kEG1dfUMW0wRwszNsAHYzcIcVGI8zD3dwgf9AhA8HV1t7CzMBlUmVCxjE5IwcYiwAa0g+VAJUAGVLgjBsAFdMI8xTiAYAYS4OAEFFHgAMmIANIcPj8P4-JpGNp6AyYIzdVzrUIDUbhDxOcLeZEWVxzczIjzYCZWKzIoYxAZWBx7EApQ4nM4Xa63e5PF5vBgAVQACnw-hweNzREDRKDwQKJFD1DCdHDOqBugNwtgxuqNRqzASEMMVA4SU5XK43FYPOFtrE6QzsJzmZcbhd7nb3t8ALJlQEgsEQ6XQlqwjoIrqICmo9GY7FGyz4gLmSLLNY0pw+DbuCzWg62pkQc4OtnZ16QHn8wVe8U+qUy5paeVBxFBRbYKzDBx9XoqKy9WPzYYt7BJ8nOdZtgauTOpIgkfQ0bAQMAFVAPYgEUqcXjc4RyAEcN1yBTKWUBuvwhu66wrVbONyebx+OM9DwDbCuLx4sxRFsY1wDCc4Kcrugs7ZHkhTFGu5Sbtuu5yA0Ej+rW7SniGPR9IMrZjBikzuD25ijAOqyuF21Jjq4WJ-tgAAWOgEFcYDEHkQZULQ9ClFcEg8GIihcD8HxSDIPBXBwO58TwbrcgCUgIa0J6KiYiAeCoxIfiMZgxM4HhmrhPSvhYJJKSoPhkhawQeBR1GwLR9GMfC2DIMu+hsRxQkifxsgij8bA-MIAI-AAQhw0mBshSoKZMthdm26lOJpUw6hiTZohMrixA4DiRE+5k0XRDG5Ex9mAQwEhcMIADipXlMVPxXEwQWycGoULOFKlRSMMVafFwSqmpEwDDsmJPrSST0lmFlWbl+UOegTmcQePF8TUgnCRwolXGIpU7nVSFyd02I2EawSTK2GxPh4OqTGiJIfuSFiRGYTiWEN+ypGNOU2fgdlTdgABOqAAO4zVx3C8W5S2uWJElSUeiEKg18kINSxJ4miVhxGp2wWPFKWqkmAwuAMb5OA4v7DTar3WXltkFfoP3-QwLkrRxggsB83JXFtsNnn0YzoZEkQ4mlaVY22ti9W4Qx4-qWWWW9lMfdT6C0wDrDsbN3Eg4tDOretm3QzJ21w903MqLzXZRAdgvxR4T4kkmaUtlYAx41Y0vje9OAK9gsAPAARnRq4qxxQPzaDWsceJknCBz9YoX2Jvo30OxmA4OKYw+IxTNgMXrJsLj2E4Gak6N2UU5NgFe77-szQIYfRyF8NmGRBrqpMqOWJYnbxRngx22iGIp4sruy2XNPe37YCrmHPDM6z7N68FO3mATThqvdRPqWljdW7EEVknjCZuJMQ+l1TX1j1Xgdq8DC0CVPa2iBtgXz-VXNWPqWdotsbg-lEDj3vM4RjT9Aeo7BMZp9TUmPhNU+5dz4TwYG6H4ohuQ-ABACAAmjwCQLByo7h4JfFgvI3JzxrPrTmsdUaqhwnEIiqMpizHToAg0mkyQuBzjFJ2UD3ZeywFABiXA6aXzDotDyXkfL+SfqQhehsFLv1vPYSY3hnB9X-kvLsgwyTkk0g9XoXC5Y4F0JgPhYABHKxYKrYOGtb7LW1g-XWUiX6xzQqsFxriLAMN7I7FeXhk7EyWDeW6eimKGOMaYwGc0rGyCnhHKGDiDZnlul3d+Ko1hqSGCMR2T0RqpAVrySiv1YBgEdHcZidByBuimjQfJqBCmwE+IQzBHwWBuiIXUDi2CeDfFED8N03AOC8l8h8SRcp4koWxP0GkYxk6PWxMEeKaw9LW0ASlLwxkXZFxyVNPJBSikFmoGUipgEqk7LqWCSQPBeRMB4kJEhIzyGNViBM0Ymw2wWHSm8s6D4TTJx7r0JOmwiLGgork6phTin3CKMQBiEBDn6G2TUuADABA7n+L5VWlzrnDOPKMh5QxmzPOmW82Znz5jImGKLcIgCuyeGJuODZHstmgt2U6bAkLoWwvQPC2pRUSrlUqtc2qz8cXw3GfiqZrz3lzPTliZYlpYjkjcBMYmwLGU7PBay9AULIAcq5XAHhRiGK6oYD8Pg4IMXVQ4Lc7F9z4YxT0oZZeLC0S3W1Onawz4xjDglq+DOKrAK6vVWy7VqqEWwH1cYo1ZyOLmpuXXReCBMkvkJpEJYXZJjxRiivW65pnZ4xSX6uFTLA2avZSG2p4bDVMs+EwJBFVYIDJYDxNycaZEIxUB6nRxpXw3WsDqE0KVQj6geiaMk91NIFs5UWgsQaYVlr1SCnZxrTXClEE00QIguC9LNVci1LauaAL0gTfOBclJ2A8aGNJoQlUWk2ElNwE6A3TpLcG-1TKw0LoRfU9dwhN0XJ3UJPdscZiLL-h+Ay1tvB9ogWqa9EwMR4zMA+qdLKZ06rfZ9V9i7kUcH+EJNdfA0XRv-VimGMdGoLLVBiPE7rrDbFUQgb5z5RjDhHS2dqSG1VPq1bOzDoaMOFqw8tf4MStwxpI2QsjDcRh6SJl2RS6xYidicFBzsV7k6xEARaSlHGEXFu42hk5-HJ2LqjX+zFVrSP1yNtiZYr4iJpUcFELebq1IrEmFiNwKZhg6bBVx0tvHy0fsKUinipUzO7qFTao2SkqFUfcWRftMUoOozVEOwybyC7Wx88ykpqG51hogL9KAUBeFGrKqIRt4npFnjtWqJwjq94p16H2voK9mMuExKOe99KjOPpQ8+njAm+OFdQMV0rVbviNoELwMTFmJNWcQLVh1A1Gsupa1EVL1523W00tpnrmBcC3FstkVAuRmSwEooij4NaH5Cgq9KZtkXJNInq1nEYmx1i3TeTSHULgDQF3sIpPqjcsIUQO0dj6J2zsQCuMQGpl26nXdrXdlgD2aiAcamRZ8WJRh9D6rMn7D40QGnTHieT7VOxg8OxcY7NBTuQA+LgZAaAOAAEcHioGIIjm7db7t-HR09hbPR3HNk-m4fUI48a-epIaFKQwuxKcHj1goE9ciURYOkUgFB1VYDhJzmaggcPXcEtyD4QyrhXEEBJDH8MyLKUimpNqsVXAOHOpsE2mIVnaJ2PqQuw0DvzngC0BkdznuIAALS9ofOHjEqWxgPTGGSUcCQev4CIFr+Yln40Yj7TSZsqxDI-gPQTOlz0cBp4yBQUp9BQ9C5VDqSM2ALQ4+CBsDYR9U+a8yF7HI+Qii5Fr-GxYek-4jEAfdYYg1z0LBioMQyIxW-ts2GZHrLo8ysidIP1tsfNS76mSS8weOBxGlmeqFfZfCxvHX+qjkOYt9cxd7YerbZFjDE8I786I6s7GmxDsFsnvS9slGQixcwWR1UXR78UIU4V5xZ0oHoCZPNwhP8URSRyR1hHdqQskbQAIZxICHkD8E1lg3xbpqQXdT19Rz8gDsAcCgI5wFwlwVw8D4Z68Hx7oTZ49IgfAUwYoZgKIaDgJe8wIB9rUw8Fgfw1Q5NrBjJ0CktWCsRB0sRUZUYUwc0gl65qsUJXws5kZFIFdOx7pXxP9XtBwR0LQ+x1kL9yZoEPp9ka8RChd6srYRcUlODrAdhPA1D5YpomDlQPwBwfw-40Yxh7B4p0YBxNEaRegyRDJPCGVy5fo-ofDEAnZ+gS8UwWwydMlt5iRIhHYUozQC4U4sDi4ZYT4vDYFK4J4kjdQogqE0RuZFIiiYhOpsRQhrpvk9DiiXoS5rCDFeF+F-pqj5CC4fxdCb02NtJ1hjQCIPxrYv4ogiJstwVqic9048iBwMQ7p3Algpgli9kWJylKk31qiWCAEiYmM8jHdehtESYL8gscsIUBsDNQ1qizZmwqMT8PMXdlN05qR+hzQc0xgfxTQ9j+t9N8sK0wBdVXi1hRZVhMR1J9RXc3UNhNt4CpjzRghQTcsniIT7jqjG521bANQtIVQOF1tZUlVk41gYhHBsTHjwSAs9URsxsjFoT7D41HZiRJDPiLRviWs-D2slIiYc5ACbRwcac5INDGpw9MQdQ95tCIglgSIvEqcIcDE6dodzgLs4ATikCicyRj85cVJFcuicAJTglNTIBYd4ddSOTW0U5D0W4iJGi3kdRqRFkT95cLQ6EzTsALTad6cIBGdmdUA2cOcudqiVAdQMsjSZgTTfSKIVcCA1cNd09Mhlj7SzxVj5h0i4yvAUxxYzQkzVd1cu9tcCxdd9BOc9SYyCZZcYxYgCYuwU8L9kzUzyzyBwDcBUB5wIBXj0pv80QiR9QD0YzXtPdNjsRqRdFEh4ggA */
    context: getInitialXStateContextCopy(),

    schema: {
      context: {} as MainMachineXSCtx,
      events: {} as AllMainMachineStateEvents,
    },

    predictableActionArguments: true,
    type: 'parallel',
    id: 'main',

    states: {
      ontology: {
        initial: 'empty',
        states: {
          empty: {
            on: {
              HOVER_DEFINITION_ENTER: {
                actions: 'showDefinition',
                target: 'specific',
              },
            },
          },
          specific: {
            on: {
              HOVER_DEFINITION_EXIT: {
                actions: 'resetDefinition',
                target: 'empty',
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
        initial: 'default',
        states: {
          default: {
            on: {
              HOVER_UI_ELEM_ENTER: {
                actions: 'showTooltip',
                target: 'specific',
              },
            },
          },
          specific: {
            on: {
              HOVER_UI_ELEM_EXIT: {
                actions: 'resetTooltip',
                target: 'default',
              },
            },
          },
        },
      },

      hostSelection: {
        initial: 'empty',

        states: {
          empty: {
            on: {
              HOST_INTERACTION_SELECT_MULTI: {
                target: 'multi',
                actions: 'assignHostUserSelection',
              },
            },

            invoke: {
              src: 'checkForFigmaDocMessages',
            },
          },

          multi: {
            on: {
              HOST_SELECTION_UNAVAILABE: {
                target: 'empty',
                actions: 'clearHostFocus',
              },

              TRIGGER_TRASH: 'empty',

              HOST_INTERACTION_SELECT_SINGLE: {
                target: 'singleRaw',
                cond: 'isNotSelectionInSubSet',
                actions: 'updateSelectionSubSet',
              },
            },

            states: {
              raw: {
                on: {
                  HOST_INTERACTION_SELECT_MULTI: {
                    target: 'raw',
                    actions: ['assignHostUserSelection'],
                  },

                  SELECT_FOCUS: {
                    target: 'subSet',
                    actions: 'assignFocusSelection',
                  },

                  HOST_INTERACTION_SELECT_SINGLE: {
                    target: 'subSet',
                    cond: 'isSelectionInSubSet',
                    actions: 'updateSelectionSubSet',
                  },
                },

                entry: 'clearHostFocus',

                invoke: {
                  src: 'checkForFigmaDocMessages',
                },
              },

              subSet: {
                on: {
                  HOST_INTERACTION_SELECT_MULTI: {
                    target: 'raw',
                    actions: 'assignHostUserSelection',
                  },

                  HOST_DESELECT: {
                    target: 'raw',
                    actions: 'assignFocusSelection',
                  },

                  SELECT_FOCUS: {
                    target: 'subSet',
                    actions: 'assignFocusSelection',
                  },

                  HOST_INTERACTION_SELECT_SINGLE: {
                    target: 'subSet',
                    internal: true,
                    cond: 'isSelectionInSubSet',
                    actions: 'updateSelectionSubSet',
                  },

                  MANUALLY_TOGGLE_HOST_OPTIONS: {
                    target: 'subSet',
                    actions: 'toggleHostOptionsVisibility',
                    internal: true,
                  },
                },

                invoke: {
                  src: 'checkForFigmaDocMessages',
                },
              },
            },

            initial: 'raw',

            invoke: {
              src: 'checkForFigmaDocMessages',
            },
          },

          singleRaw: {
            on: {
              HOST_SELECTION_UNAVAILABE: {
                target: 'empty',
                actions: ['toggleHostOptionsVisibility', 'clearHostFocus'],
              },

              HOST_INTERACTION_SELECT_SINGLE: 'singleRaw',
              HOST_INTERACTION_SELECT_MULTI: {
                target: 'multi',
                actions: 'assignHostUserSelection',
              },
            },

            entry: 'assignRawSingleSelect',

            invoke: {
              src: 'checkForFigmaDocMessages',
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
                  ADD_PHRASES: {
                    target: 'multiPhrase',
                  },

                  EDIT_PHRASES: {
                    target: 'singlePhrase',
                    actions: 'editMultiPhrase',
                  },

                  CHANGE_EXPLORATION: {
                    target: "singlePhrase",
                    actions: "changeExploration"
                  }
                },
              },

              multiPhrase: {
                on: {
                  ADD_UNCONFIRMED_PHRASE: {},
                  CONFIRM_PHRASE: {},

                  DELETE_SECONDLAST_PHRASE: {
                    target: 'singlePhrase',
                  },

                  DELETE_MULTI_PHRASE: {},

                  EDIT_PHRASES: {
                    target: 'multiPhrase',
                    actions: 'editMultiPhrase',
                  },

                  DRAG_PHRASE: {
                    target: 'draggingPhrase',
                  }
                },
              },

              draggingPhrase: {
                on: {
                  IGNORE: {
                    cond: 'INVALID_DROPTARGET',
                    target: 'multiPhrase',
                  },

                  REORDER_PHRASES: {
                    cond: 'VALID_DROPTARGET',
                    target: 'multiPhrase',
                  }
                },
              }
            },
            on: {
              TRIGGER_TRASH: {
                target: 'emptyMultiphrases',
                actions: 'assignTrashReset',
              },
              DELETE_LAST_PHRASE: {
                target: 'emptyMultiphrases',
              },
            },
          },
        },
      },

      notation: {
        states: {
          spacedDashes: {
            on: {
              CHANGE_NOTATION: 'spacedSlashes',
            },

            entry: 'assignSpacedDashesNotation',
          },

          spacedSlashes: {
            on: {
              CHANGE_NOTATION: 'spacedCommaEquals',
            },
            entry: 'assignSpacedSlashesNotation',
          },

          spacedCommaEquals: {
            on: {
              CHANGE_NOTATION: 'spacedDashes',
            }
          }
        },

        initial: 'spacedDashes',
      },

      fetchOntologyState: {
        states: {
          initial: {
            on: {
              HOST_FETCH_SUCCESSFUL: 'loaded',
            },

            invoke: {
              src: 'checkForFigmaDocMessages',
            },

            entry: 'initOntologyFetch',
          },

          loaded: {
            entry: 'assignRtGraph',
          },
        },

        initial: 'initial',
      },
    },
  }).withConfig({
    actions: {
      initOntologyFetch: () => {
        const fetchLocation: string =
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:4321/ontology/uxiverse.com-flattened.json'
            : 'https://uxiverse.com/ontology?format=jsonld-flattened'
        const bridgeEvent: PluginFetchBridgeEvent = {
          type: PluginEventTypes.fetchByPlugin,
          url: fetchLocation,
        }
        parent.postMessage({ pluginMessage: bridgeEvent }, '*')
      },
      assignRtGraph: (context, event: HostFetchEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.graph = createGraph(event.result as any)
        assign<MainMachineXSCtx, HoverUIElemEnterEvent>(ctxCopy)
      },
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
        ctxCopy.plugin.ontologySearch.descriptionText = getSingleUxiDefinition(
          event.focusedDefinition,
          context.plugin.graph ?? createEmptyGraph()
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
      changeExploration: (context, event: PluginExplorationEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.ontologySearch.exploredIRI = event.explorationValue
        if (event.changePropClassSearch) {
          ctxCopy.plugin.ontologySearch.isPropSearch = !ctxCopy.plugin.ontologySearch.isPropSearch;
        }
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
          ctxCopy.host.selectionFocusedElement = {
            ...focusedElement,
            name: newName,
          }
          ctxCopy.host.userSelection.find(
            val => val.id === focusedElement?.id
          )!.name = newName
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
      assignTrashReset: assign(context => {
        const ctxCopy: Partial<MainMachineXSCtx> = {
          ...getInitialXStateContextCopy(),
        }
        ctxCopy.plugin!.graph = context.plugin.graph
        // send to figma bridge
        const bridgeEvent: PluginDeselectionBridgeEvent = {
          type: PluginEventTypes.deselectByPlugin,
        }
        parent.postMessage({ pluginMessage: bridgeEvent }, '*')
        return ctxCopy
      }),
      toggleHostOptionsVisibility: assign(context => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.hostAppSearch.isOptionsOpen = !ctxCopy.plugin
          .hostAppSearch.isOptionsOpen
        return ctxCopy
      }),
      clearHostFocus: assign(context => {
        const ctxCopy = {
          ...context,
        }
        ctxCopy.host.selectionFocusedElement = undefined
        ctxCopy.plugin.hostAppSearch.searchValue = undefined
        ctxCopy.host.userSelection
        return ctxCopy
      }),
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
        const pfn = (resolve, reject) => { }
        const result = new Promise(pfn);
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
            case HostEventTypes.fetchSuccessful:
              if (plMsg.result) {
                send({
                  type: 'HOST_FETCH_SUCCESSFUL',
                  result: plMsg.result,
                } as HostFetchEvent)
              }
              break
            default:
              break
          }
        }
        return result
      },
    },
  })

// external effects from figma page py parent.onMessage(HostEventTypes.selectionChanged)