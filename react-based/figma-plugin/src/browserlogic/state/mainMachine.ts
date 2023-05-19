import { assign, createMachine } from 'xstate'
import { compIdToTooltip } from '../../mappers/compIdToTooltip'
import { getI18n } from './../../i18n'
import {
  HostAppElement,
  HostEventTypes,
  HostSelectionChangedBridgeEvent,
  PluginChangeFindCompBridgeEvent,
  PluginDeselectionBridgeEvent,
  PluginEventTypes,
  PluginFetchBridgeEvent,
  PluginRenameBridgeEvent,
  PluginSelectionChangedBridgeEvent,
} from './../../communicationInterfaces'
import {
  getInitialRenamePartCopy,
  getInitialXStateContextCopy,
} from './initialValues'
import { getSingleUxiDefinition } from '../naming-recommendations/search'
import {
  AvailableNotations,
  NOTATIONS_MAIN_DICT,
  determineJoinerTokens,
  handleNotation,
} from '../notation-handler'
import {
  RtLdGraph,
  createEmptyGraph,
  createGraph,
} from '@uxiverse.com/jsonld-tools'
import {
  AllMainMachineStateEvents,
  CopyCompTxtToRenameEvent,
  FocusSelectionEvent,
  HostAppSelectionEvent,
  HostFetchEvent,
  HoverDefinitionEnterEvent,
  HoverUIElemEnterEvent,
  PluginChangeCompSearchEvent,
  PluginChangeSearchPhrasesEvent,
  PluginConfirmPhraseEvent,
  PluginEmptySearchPhrasesEvent,
  PluginExplorationEvent,
  PluginInputTypingEvent,
  PluginNotationTogglePreviewEvent,
  PluginSelectPhraseEvent,
} from './stateEvents'
import { match } from 'ts-pattern'
import { isIRIaProperty } from '../naming-recommendations/exploration'
import { evalAndSendNotationChange, evalPluginConfirm } from './generalSenders'
import {
  isComponentNotInVariantGuard,
  isComponentSetOrInstanceOfVariant,
} from './generalGuards'

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
  shortForm: string
  iri: string | null
}

/**
 * stores syntactic blocks relating to a schema as far as they are known
 */
export interface RenamePartSemantic {
  value?: string
  property?: string
  main: ShortFormAndIRI
  relativeCursorPos: number
  lexerStartEnd: LexerStartEnd
}

export interface LexerStartEnd {
  start: number
  end: number
}
export interface OntologySearchXSCtx {
  confirmedRenameParts: RenamePartSemantic[]
  ontologySearchValue: string
  /**
   * the IRI for showing documentation when hovering over an ontology-entry
   */
  focusedDefinition: string | undefined
  /**
   * the IRI that the user investigates by clicking on an "explore"-button
   */
  exploredIRI: string
  /**
   * is searching by sub-property or by sub-class
   */
  isPropSearch: boolean
  /**
   * the description text shown as documentation
   */
  descriptionText: string | undefined
  notation: AvailableNotations
}

export interface PluginXSCtx {
  /**
   * text at the bottom bar to guide the user. Changed when hovering interactive UI elements
   */
  tooltip: string
  renameValue: string | undefined
  previewValue: string | undefined
  hostAppSearch: HostAppElementSearchXSCtx
  ontologySearch: OntologySearchXSCtx
  graph: RtLdGraph | undefined
}

export interface MainMachineXSCtx {
  host: HostAppXSCtx
  plugin: PluginXSCtx
}

export const mainMachine =
  /** @xstate-layout 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-WXH9Fhf2OAw6e-99hfQdEkOkd1sZFOD0BkRYfMAR7AFHmPceFUKNwBEOvDem+oFj015E7A+7sD0YqFEsvjhxDQhBII5yMKBCrC6Mkcxyz7jLDkNc1eFWkc75HsA0ee8t4pbc9T3xRcJkeKGWAYA+-KBkKzVmShh9QlHx1o7bGc88hKZkQ5Svi8L53Mv6OVfdwJnL0J7ZtEPLfcPHfPfWPcNI-d2ZQdACACAD4M-C-K-C3ToE1G3CQKXPNa1AtO1F-HlNjJke0akVCdCa4R6dCKsMCGpGpbYS4F0RLVkDfEjWvKAxvXfZvOAtpBApAlAsANA1AS-HgJNFNZMCgdNbAnNW3fAm1Igw7Eg3mMglkJfKg7DZ0WggBLINwBg7YByMsLITCR7fLZHSA+vaA3gzteAxBRA5A1A8-UQq-TuNQXBMQVQG-O-B-PgEfZ+QnaxVQsydQygpgmgkafYRKGKUbMSNON0PFXLMAwDTfTgqw7gmAg-LnMAXnEQy-VmJgaJGUNwjwrw2-e-e+Pwp-AIlDFQ-JDiRxXifmL9RKEVAIBeWkWpGkRIKkJIBaBmPIrIoJNvCIIicgZwy-WAHgTuBMcxDNdgKcRDAQVPG+O+TPGEGoozII+wbYKOPZQ4OaLFNYSI+wM0J1LiJISpGsLiDIfo+8QYolEYsYsgCYuAHgCEFEMQMER-Z-ZQonewJkPYzwOkeWJkY4qsLOAsVOIsIpTwETZnNae414uSRoIgD4CAMYwYqY9mJQTQLRR+ciH4zY1+f42YQEhsYEw4sEnQ4vRsXcVOSgsVRwPwO47gB468VE9EzE142AKod2Jw9AngHE4xW3Ak74qo34wIvJBAZwFwUsBIMVKyVCLiKscsJdBIc5C4dYZ0Vk0gdk1aTkyAbk9A3k0wRBAUlwngKEO-CQIkwzEk7YmUkneU64QaCncsOfUaF0AWDUkIN0TIRKW43LAY5Ejk9ANEo0pEk0+gUMKAKAd2QYlREQAQMQdmSQO07PZ0s410pUj0m0YWBCU4Y4HiJYD3XU9AfUyoQ0jEqMlw3kiAWM+MxBRMmQTUMLZMTMuU7MxU90lUr0syGHIs1hWOX9L0EM9AlE8Mrk2syYxEtk14q0m07TEomQTw1uW0iU4k2FECPMGtKCZYTkB6TIfMjXFkOk0yQ8HYf1YMmcoY7Aas40usucvUhc4UzQAHB+EKdgZJZYok2XXcqOGWCsZ0FYesE8vmeIc8xCHIRHG8+cicsMiMms+Cp88cy0lczwjc-w-8pKeLGWN0VkVkOtfMsSBeatQPBIAPRwcsysugB8283ktCsQ1mRUTULC6o2XEsTiJFPmLiddQSL0iOFkIcisIII8Gi0Mg0qcyMlC2cpiq-N823FENw+-J-cU7C4g0kkkOU0bHIGsdwV9I0Qi4SzU44e6B7BEv6Z2VaBmWSZmWqZQKENQKQMxOY9gAQTUP8CQAQBMP2e07cticSQWN0U2Zo8WABSWZk80bwT6TIfILCP4BgeAUYAUKUuFAAWjmBtHSpnnsw8GxmuJWFHgWgIFaHICDDSpAiyqJjrHtC9W1LrHaNMIRNKu4HKFWgYGYCjBaDasqoXFSBSlWF6kggCHaNzDSBKtKHKuvGqDqAaCaB6rKD6q6jqTiCCBWH0qZBdEskGogt-mpFGppHGsdlkj7GWpsUJn2D5hw2OCSEcAyD5gbAVlyysp7G3UlGWnOpmAGqJnMmXGyD8B8COtpFuBeppjes8gUg2n+i+sQFSExi8A0OwzdAek9KurBMWDWESjmkOJnhOs2hVmhrVnsthoOEnijgggGjXB4iSBsnmGthrCZByjmmatcnBrc1vDdnNLj0+tqNJLEpNDxi2HOH5kPF4jpqXWZKmhngcl4nYNoFJuqv2EPH0MYMYOpBJEznlpDHMPrkbkvwgFJp+t-3zHmCSArCn2FvOG1p1z3T105zAFJqFgdCXzJgvL5htBnnzAYMEyODzDqXhNAN1ogPm2PSkUwBkTkWW0VuaPi2WG5FKXNkG0QApxZEMOcEuEPG5FBrMNZwsNDvI1sP4J7VphjXpUx2ZVJujhcCWFdsSndpOIQG5AWGlhniZrQi5BtpRzDsPWW2o1Wxg15q2OlNYRZHQiOHtmMNiAqWuBZH4yOByGFosqDrzu127sLpsoeDwhhEeFQEQUgEVtZBrRMlSEekmkupzDEjLQSlMxxlHI7GSNm1tpAx7u80qz8yUWx3dlJrhwRr6ibGLHlhnlSwXiSnNspBSBlhAIfuDpr111fsqFKwBXK3fuq02wa0Nr5sdJMOPumiyGdHPtSwQh4vMgenWGvNzqPyfvXrAwoz7tPXWxqzqwwcPpJDcDEg+gnsyG91Gmw2MiRUapiq8Ggf-SobZwLtoevAx2+0C0QR-q4r8BgkuGODMgSEuyqSLKyk2GdHvtEYJXEfgY3uyN5350F2F3wFF3kdZGGupA9V8DTgEquqXglTVzqR6K7ssK7x4P3wqqwelJivtGuI1LMjLDSBSkyEWB9tSBpArEQg8bSK8cyMeLIHb23wyObyrvpqCf3FiBqXn3zC-gAOWDQmAPiaeTSe71gKLvVSgBP1wEGJ-tzCdWyGnmnh9TWHyajiXwbWKbXxEZZzEfzvKa4MqbvOSIEMcOENePkZVpXBiDOIKs6cKZ6aAPXySNgdSOGfSNGbkgN0GIKMaAjuMwCuOwxgmgYPOw8EpDmiEj40YJ2HcGLOXpgdXpDq2cSZsINLYCIAab8bhTEph06MYL-i5HnxNC9TLB4mxiXF0ZwHkt8eHv+YvtmDmgXmnwuFQiLDWAkoQs6SePvBeJNKNscfsCPCjjAf2OuBlTgpfNxarOkuQtpbrNJspCrEpBcHRdsfWDcZxZcMnKQsfNnLNI9imfQPkbqpMnljARJA2BIoX19I2DMpXl5cv35enNkrgGDRGKNtejqXd0-zQkuFVP5k4lThjnWHiJzoRPhcQvVaZdnIbNQDjITOmb+YNmxhPNJAVeHPWFhefIrMkvpYFYYv9d+cRZ3N1b6iBq1KNcEsjiMicSWHMnmHityCAA */
  createMachine<MainMachineXSCtx, AllMainMachineStateEvents>({
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgPaYBdcAbXKAT2zGQAcDyBiACQHkA1AUQCUB9AEQ4AxAJIA5YQBVhLUTw6iJ3ANoAGALqJQNXLHQF0+TSAAeiAIwBOAGzZLF+xbMAWAOxmArJ-cAaEOUTuThbYnioq7mZWFi5O7hYAvvG+aFh4hCRklLA0YADG6ABm6LnM7Nz8QmKS0rIcABqSqhpIINq6+oYtpggATGZm2G49rpZWKh4q1r7+CLEAzNg9YSpzFuFWri7DickYOMRYANaQfKgEqADK5wRg2ACumAeYxxAMAMJcHACCijwAMmIANIcPj8H5fJpGNp6AyYIzdOZmFwhFzuFQ9DY9HoADjmUWm5gsgVsuKskTMiLmcxcCSSIBS+yOJzOl2utweTxeDAAqgAFPg-Dg8bmiAGiYGggUSCHqKE6GGdUDdLbYZZq9XjAkIMzY2KLNGWFZmMLRJw7el7bCc5nnK5nW7W16fACyZX+QJBYOlkJa0I6cK6iERyPcqPRmJxeIsWsNCyspPRsTiVg25oZVqZEFOtrZGeekB5-MF7vFnqlMuaWnl-vhAT1ZJ67iWSP68asMbWA3jeMTnmsqbp6aIJH0NGwEDABVQd2IBFKnF43OEcj+HGdcgUyllvursNr2ustgc9mcbi8Pj8iGGyLmaPG1mxuLcsTTluHs-QY+yeUKxXn5SXFc1zkBoJB9Kt2j3QNen6QYzGvUZxjRCwnBjCJVWWSIYipCJsVfVIAAsdAIC4wGIPJ-SoWh6FKC4JB4MRFC4L43ikGQeAuDhV1YnhnW5P4pHA1pd0VExECcSZbCsRt+ncR8rECbEXC1YY8WwaJ+kRSZYl1fCcCI2ASLIijYSouhGFYOiGM3ZjWJqDiuI4HiLjEABxVchL9KClSDewpJkjx5MU5TL16Fw1IU7EFPClwVFiwI9OwAyjPI3JKOQGd9Fo+jOO4tjZBFL42C+YQ-i+AAhDhPJEgMfNmSx-IiQKouClS5gk7BpNkrZqVicJEuS0jUvSzL0AYCQuGEVzXPKCavguJhqsg0TuicBrIgCuSWqcJSVJ6NZbD6DE3GxPsrAG4ihpM-BsAyj9suspiWPyhy8o4tyPO3CCFVqsSEAsHotSpJZ1LkqI5gxCxsW0i7DKutLTLu-RsAAJ1QAB3B7GO4Z77Nypz6L4gThCWn79xcKJ1N61FGzJFRsTa9acNvKKkVvWGUuunAkfQVGMYYfGeMEFg3m5C5SZraD+nCODVOxAHbwbNrXGwFnwpTKlIrmDn4ZGj8+cxyz6Ox2yXsFnKPqqr7hOW37uml9xZacOZ5Z6RX4JUpxncGem3BUII4scM1B0tQbjIRm6eewWA7gAI1IucjcenG7PY83eP4wTra8lbzAxR3jTCQIH2iFwQpmRsOvCKLdXamlGx18O9eRmP47AROWCsgRzYl7y-opA61ViLFQmjUKR4GMIlOksuFIbkPCMupvEdG6O44TgXHKFkWxd73PtVRBZxiUr2+mienUPHpxhlVp8cUr+Xncb4aV-11uN6Tk3cbTreLdEdyraVhtmTKWdNsBKQNFFPEzsPbjwhtiVUVJUTO1LmSZ+XNbqr3fu3BgzoviiG5F8P4fwACaPAJAsGmquHgScWC8nyuLbONV9yRCUqrCwvVsTwWvjqcuV43ZdifNDQIKgZ7nQXvpJeL8bq6EwFAciXB+ZJ3NvZQqxVSoVUAXKW2+4XbBA2k1LaCkdp8N6KdZEEkWrYiWGiOI6CI44FkfIsAijDad2NjZb+sh04uX-p9IBOc7aIBTMieWDhEQcLxIDUKENwrYCcCmE8CTwg0m1hIpKUiMFOIUUo9xydTZ41-hnYme8gnanREDLEThOq+0sGtY60lEqYFwNcUy2RUC5GZLAAicB3hMHwTNHgogWDSnyqU-cElQmNiNDqPRoYgYA2CEhZ2XCrBbHRE0lpZw2k0A6V0npsAGDCy4G8IUFxeQsU9G8Fgzo8FyAAIqEL+IwgJzDoKTPAdMxEsz5bzJiaiBBcRToKU8FidELhNmtJkbszpEALjEFQN03pbx+n-yFMM0ZNRxnQTklMtE7VTr0xQpfGYLtETgJ2lYYGyEn7pOaVCxxMLIDwsRQcvpAz0UjJ+FiswrydFSxsRhXUp5hVeCBqdAYBKIjLDLvTHokLtnQr2XChFSLDnHNORxC5pzQTXNuV8B5TyXnaJAXVeCKxOphi4dfPEcQ5gLP2hSqKrglKxV4Qqyi7TYVvFwMgNAHAACOdxUDEEOSijlQyuVjKYfys1SChVrRiOFHENIgZUv0VwokLsoplyRIlAo7dcgERYOkUgFA7Q3GwFgGEIaHqCA4BIFFHFuRvFORcC4gh+LYrqi7apG0ghnzWXMOKWoaQDAkmEbs1Ji4QvSTQAiaNYAuLyL65AYBMAQEVZgWAVbMA1uIBwaijAFosAAOrkM+Foncsa-p9ElQ4XUupJ3DpJYgKGNgJ2iLWF7SYA5dipHnYu5duRV3rs3f6Hd1b9AhsPeZdlaKHJfBOUwHgvImDMU4sa69prb2wVWPYR9E6qX+xjGSBB1gehbBBdYpsZhEqAcRcB0DG6t07oICjMAYAvgbo4NAOAbB0BgExuGhDnEkNNrQxhjgWHvqSzqjSYISxljxibLXUxkRVjxLCEsExLhTpRXowuxjXAV1+rA6x7A7HOPcYgLxmAsABNCfeDIEQXB1ySfmle2Tfd7bwQWGp+miTM0xkRAgyj0rr40egYZoDJmQNmZYxByzHGuM8b4w5wTmM1z0LIWJ5DqH0Oee7f3SYCDJgEddRSVwr7tRYgGADNEWxhjWBfTF4zpm12JdhGxlLNm7P8cy-BwZ9ReR-BYMxaNfKcO+f9vE3q7gXbHQ4TV-ojYURonBv7Oms7-04AY0uuLzHwPdeS9ZtL9nHOY3TtliQZCPOcWKzNlQ6leFaXRADR8MY4qO2++Edw0kFYAzawdjr5mktWdS7Z9Ll3N5vXu154Bcm-qs06tMjwlKKYQxjMaZEExRHjEbLXPCc6jMg-i5147+Ad3TiID62g5Ebgw+uaIVz7nCsPZjdNxACnFhqhUziZ26mlgLDvKI4dsUoHuGB0xhLlPt3YBp7gOnNAGdgCZ6iwZeWJPs+k498S0NVbLGa+1Kk0Q0I7UWNPCmvykw7YtAB0nMuKcWcV8r1XMObu5e+Pl+HeuEA86U5O06AvqQxn2sEQlkxpXUnBtLw7suXd3Fp76lX7c1eDYmlNGavA5oLT9wHvnwe1MhcPEp+Cbg8RrIW3H0HXWqcK6T0rlP7vBsieG3UUb43uUyHz35QPoii+C5jAOkIBo4iRCJFwtJu3sD7ad2Dk7rvm9p5h9d50OWCtSd74pwvqmh+hWaupMIlhzXDCUnRknsXa9y+p43t3K-Bvp195zpH3QmohHgk2Br8F7Be2H+hDhCmL2KKSuFCejDjAAN0ywkDAGMAIDeAIlQDkTgFn0gMyyYHQAgAnEwGcxZ2EDc03081Q0+DYGEA4FPT9zPlsBinjGNFPDJHtVCmdmklVmGFDB2h2hxHALACgKExgLgIQKQPs1QJ4PQMwOwKG05UxXYl5BILIIoJfx8yvFEVYNWGPziipVWC1FPh6HARQk1najkh1G4N4PRn4PgMQOQJ3RoDQKEywCgGYGEAEGII4FIPIMoKpVVj02kko1bASRq2vnphCChlDHlmhjWWJxn3ixoFIlQBRiLWEEwCYGIl5FQBgEkJ4D1V5EQ2Qz9wN3BlREcERBHnpm0Ir0GFPkcD6CpC9kSDpGaQnHgBaAZBNVf0QAAFphgtROiFgH1PANMWYoY7d0x8AiAy0ZhvN94uiYkFIfYi5K4okQjEpRiMgKAzJ6BWilD-dokZhODecnxoo5ICVljS1Mho4ch8gihchNj95Yhgh-sz83UJcR0mDdQfYnwoY4prEsREpHRsxWR7Qbiykb4NRQTnAYxURkQwxhcaQtg0R5V0k-iWQK12RHhMwgSWFbwSQYh7BJg9FUQzAOwEkal0RhFeEKZfjMx-iUS8wXgMScUoZEEAVeookVgOxQwSQ8RyRKRqRaQZ93xRx6S6ppiZhPDRdoY9MHANgL9+TcARxPxxxJxpxZwhS-otgYwDcp52oog1gYo9NEoBSFTvxLjihVTVpqRVRpImw+gFs-MLwZgdRdC0RcR2CUIog1kESZ8w5pFfpAl9wRTlDJJuxYpqQy5XBqR7FKJqBzIzTucdj+EiRUd+gy5v1QwZT7dJE4Zl5I5RpYztj6tqYmx-tjQGZx5Jhccnw+oqVjRg4vTMkHFMF9Y0Z0Y8zZ4KjqQCciRGt4zehAj4knxaMkQAZRFIzX4W515248yJ8bwwwqRh0UxnB2xx4izBgkF0RVtSTRyZF7CckWzsM2iEAxgEFUkqM5J-s4hTFgZyM1ki4KQ4gIgPU+4-ToIAyEBbx0J4xmxUl2oNNHylVYVTg1VWyeyXY9NVZjFmwiQy554Z96Ut1zjlUWUgL9ytj5ZnsuFGwoYOEa5ERxUAZgiT51Y7A+SMzsA4LPUmUIA6d-Ug0Q0mjJiylIh6xplwgxdQjSzSVdRFN30v0aRPBhjLQC0CAi0S0xjMgUS8zXyQkj8whoKJTYgBLUghKRLTjy1cwoN0AQ1gLR1PAtNn1Uk7V0z0xlLi1VLyAaTSBUAJwIA8y55wFp1nA-sp9TFrc9LRF+LoYPBp9SK5949ncINJKaswiZL3KIj6YHzL92tycF968NKYMj1tKD8qVHYNJA43BdSqQa9oq695cIc+todMspzP8SR4JKN9Nr4Uxh8GorSKRqzAhr5ayfLHc-KYr5cl96cH8hM8zcISTJ0xcggqRSMghOpQyiVIwyQpc51bCzDYCLChC4BArtD4JJ531nZwUIZvL0wbDRC+DZrBCrCRDTCMCsD11ErdilhAV31hFkwgcpqdqZqBDLDhDtrTD7C8yvZqlhh3TYoMRVh4xtCLqCL4w-trBbqoiU9Yj4iCJEjkjDJUiYBFqmCFIBhhhIsth9D6Y6j4ggA */
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

              HOST_INTERACTION_SELECT_SINGLE: 'singleRaw',
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

      notation: {
        states: {
          spacedDashes: {
            on: {
              CHANGE_NOTATION: 'spacedSlashes',
              FORCE_SPACED_COMMA_EQUALS: 'spacedCommaEquals',
            },

            entry: ['assignSpacedDashesNotation', 'changeNotationPreview'],
          },

          spacedSlashes: {
            on: {
              CHANGE_NOTATION: [
                {
                  target: 'spacedDashes',
                  cond: 'isComponentSetOrInstanceOfVariant',
                },
                'spacedCommaEquals',
              ],

              FORCE_SPACED_COMMA_EQUALS: 'spacedCommaEquals',
            },
            entry: ['assignSpacedSlashesNotation', 'changeNotationPreview'],
          },

          spacedCommaEquals: {
            on: {
              CHANGE_NOTATION: {
                target: 'spacedDashes',
                cond: 'isComponentNotInVariantGuard',
              },
            },
            entry: ['assignCommaEqualsNotation', 'changeNotationPreview'],
          },
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

      phraseRecommendations: {
        states: {
          initialEmpty: {
            on: {
              SHOW_TREE: 'treeAndEdgesView',
              CHANGE_SEARCH_PHRASES: {
                target: 'autoCompleteView',
                actions: 'changePhrasesAndReplaceVal',
              },
            },
          },

          treeAndEdgesView: {
            on: {
              CHANGE_SEARCH_PHRASES: {
                target: 'autoCompleteView',
                actions: 'changePhrasesAndReplaceVal',
              },

              CONFIRM_PHRASE: {
                target: 'treeAndEdgesView',
                internal: false,
                actions: 'confirmPhrase',
              },

              EMPTY_SEARCH_PHRASE: {
                target: 'treeAndEdgesView',
                actions: 'assignEmptySearchPhrases',
              },

              CHANGE_EXPLORATION: {
                target: 'treeAndEdgesView',
                internal: false,
                actions: 'changeExploration',
              },

              SELECT_EMPTY_PHRASE: {
                target: 'treeAndEdgesView',
                internal: false,
              },

              SELECT_PHRASE: {
                target: 'autoCompleteView',
                actions: 'assignPhraseSelection',
              },
            },
          },

          autoCompleteView: {
            on: {
              CONFIRM_PHRASE: {
                target: 'treeAndEdgesView',
                actions: 'confirmPhrase',
                internal: false,
              },

              CHANGE_SEARCH_PHRASES: {
                target: 'autoCompleteView',
                internal: false,
                actions: 'changePhrasesAndReplaceVal',
              },

              EMPTY_SEARCH_PHRASE: {
                target: 'treeAndEdgesView',
                actions: 'assignEmptySearchPhrases',
              },

              TRIGGER_TRASH: {
                target: 'treeAndEdgesView',
                actions: 'assignTrashReset',
              },

              CHANGE_EXPLORATION: {
                target: 'treeAndEdgesView',
                actions: 'changeExploration',
              },

              SELECT_EMPTY_PHRASE: 'treeAndEdgesView',

              SELECT_PHRASE: {
                target: 'autoCompleteView',
                internal: true,
                actions: 'assignPhraseSelection',
              },
            },
          },
        },

        initial: 'initialEmpty',
      },

      previewTextChanges: {
        states: {
          previewHidden: {
            on: {
              CONFIRM_PHRASE_PREVIEW: {
                target: 'previewing',
                actions: 'confirmPhrasePreview',
              },
              CHANGE_NOTATION_PREVIEW: {
                target: 'previewing',
                actions: 'changeNotationPreview',
              },
            },
          },

          previewing: {
            on: {
              HIDE_PREVIEW: 'previewHidden',
            },
          },
        },

        initial: 'previewHidden',
      },

      compSearchInHostPage: {
        on: {
          CHANGE_COMP_SEARCH: {
            target: "compSearchInHostPage",
            actions: "assignChangeCompSearch"
          }
        }
      }
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
          event.focusedElement?.name ?? ctxCopy.plugin.hostAppSearch.searchValue
        ctxCopy.plugin.hostAppSearch.isOptionsOpen = false
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignRawSingleSelect: (context, event: HostAppSelectionEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.host.selectionFocusedElement = event.focusedElement ?? undefined
        ctxCopy.plugin.hostAppSearch.searchValue =
          event.focusedElement?.name ?? ctxCopy.plugin.hostAppSearch.searchValue
        ctxCopy.plugin.hostAppSearch.isOptionsOpen = false

        ctxCopy.host.userSelection = ctxCopy.host.selectionFocusedElement
          ? [ctxCopy.host.selectionFocusedElement]
          : []
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignSpacedDashesNotation: context => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = handleNotation(
          ctxCopy.plugin.renameValue,
          AvailableNotations.SpacedDashes
        )
        ctxCopy.plugin.ontologySearch.notation = AvailableNotations.SpacedDashes
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignSpacedSlashesNotation: context => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = handleNotation(
          ctxCopy.plugin.renameValue,
          AvailableNotations.SpacedSlashes
        )
        ctxCopy.plugin.ontologySearch.notation =
          AvailableNotations.SpacedSlashes
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignCommaEqualsNotation: context => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = handleNotation(
          ctxCopy.plugin.renameValue,
          AvailableNotations.SpacedCommaEquals
        )
        ctxCopy.plugin.ontologySearch.notation =
          AvailableNotations.SpacedCommaEquals
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },

      changePhrasesAndReplaceVal: (
        context,
        event: PluginChangeSearchPhrasesEvent
      ) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = event.inputValue
        ctxCopy.plugin.ontologySearch.ontologySearchValue =
          event.ontologySearchValue
        ctxCopy.plugin.ontologySearch.confirmedRenameParts =
          event.confirmedRenameParts
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignEmptySearchPhrases: (
        context,
        event: PluginEmptySearchPhrasesEvent
      ) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = event.inputValue
        ctxCopy.plugin.ontologySearch.exploredIRI = event.exploredIRI
        if (!ctxCopy.plugin.graph) {
          return
        }
        const isIriProp = isIRIaProperty(
          ctxCopy.plugin.graph,
          event.exploredIRI
        )
        ctxCopy.plugin.ontologySearch.isPropSearch = isIriProp
        ctxCopy.plugin.ontologySearch.ontologySearchValue =
          event.ontologySearchValue
        ctxCopy.plugin.ontologySearch.confirmedRenameParts =
          event.confirmedRenameParts
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignPhraseSelection: (context, event: PluginSelectPhraseEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = event.inputValue
        ctxCopy.plugin.ontologySearch.exploredIRI = event.exploredIRI
        if (!ctxCopy.plugin.graph) {
          return
        }
        const isIriProp = isIRIaProperty(
          ctxCopy.plugin.graph,
          event.exploredIRI
        )
        ctxCopy.plugin.ontologySearch.isPropSearch = isIriProp
        ctxCopy.plugin.ontologySearch.ontologySearchValue =
          event.ontologySearchValue
        ctxCopy.plugin.ontologySearch.confirmedRenameParts =
          event.confirmedRenameParts
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      confirmPhrase: assign((context, event: PluginConfirmPhraseEvent) => {
        const ctxCopy = evalPluginConfirm(context, event)
        return ctxCopy
      }),

      confirmPhrasePreview: (context, event: PluginConfirmPhraseEvent) => {
        const ctxPreview = evalPluginConfirm(context, event)
        const previewValue = ctxPreview.plugin.renameValue
        const ctxCopy = { ...context }
        ctxCopy.plugin.previewValue = previewValue
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      changeNotationPreview: (
        context,
        event: PluginNotationTogglePreviewEvent
      ) => {
        const renameValue = context.plugin.renameValue ?? ''
        const previewValue = match(context.plugin.ontologySearch.notation)
          .with(AvailableNotations.SpacedCommaEquals, () => {
            if (isComponentNotInVariantGuard(context)) {
              return handleNotation(
                renameValue,
                AvailableNotations.SpacedDashes
              )
            }
            return renameValue
          })
          .with(AvailableNotations.SpacedDashes, () =>
            handleNotation(renameValue, AvailableNotations.SpacedSlashes)
          )
          .with(AvailableNotations.SpacedSlashes, () => {
            if (isComponentSetOrInstanceOfVariant(context)) {
              return handleNotation(
                renameValue,
                AvailableNotations.SpacedDashes
              )
            }
            return handleNotation(
              renameValue,
              AvailableNotations.SpacedCommaEquals
            )
          })
          .exhaustive()
        const ctxCopy = { ...context }
        ctxCopy.plugin.previewValue = previewValue
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },

      changeExploration: (context, event: PluginExplorationEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.ontologySearch.exploredIRI = event.explorationValue
        if (!ctxCopy.plugin.graph) {
          return
        }
        const isIriProp = isIRIaProperty(
          ctxCopy.plugin.graph,
          event.explorationValue
        )
        ctxCopy.plugin.ontologySearch.isPropSearch = isIriProp
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignUnlinkedData: context => {
        if (
          context.host.selectionFocusedElement &&
          context.plugin.renameValue
        ) {
          const { notation } = context.plugin.ontologySearch
          const delimiter = NOTATIONS_MAIN_DICT[notation].mainDelimiter
          let newName = context.plugin.renameValue
          // use case: cleans up delimiters at the end and start
          newName = newName.replace(new RegExp(`^(\\s*${delimiter}\\s*)*`), '')
          newName = newName.replace(new RegExp(`(\\s*${delimiter}\\s*)*$`), '')
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
      assignChangeCompSearch: assign((context, event: PluginChangeCompSearchEvent) => {
        const ctxCopy = {
          ...context
        }
        ctxCopy.plugin.hostAppSearch.searchValue = event.searchVal;
        if (event.searchVal) {
          const bridgeEvent: PluginChangeFindCompBridgeEvent = {
            type: PluginEventTypes.changeFindCompByPlugin,
            searchText: event.searchVal
          }
          parent.postMessage({ pluginMessage: bridgeEvent }, '*')
        }
        return ctxCopy
      }),
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
        ctxCopy.plugin.hostAppSearch.searchValue = ctxCopy.plugin.hostAppSearch.searchValue
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
      isComponentNotInVariantGuard: isComponentNotInVariantGuard,
      isComponentSetOrInstanceOfVariant: isComponentSetOrInstanceOfVariant,
    },
    services: {
      checkForFigmaDocMessages: (context, event) => send => {
        const pfn = (resolve, reject) => { }
        const result = new Promise(pfn)
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
              evalAndSendNotationChange(
                send,
                plMsg.selection[0],
                undefined,
                context
              )
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
