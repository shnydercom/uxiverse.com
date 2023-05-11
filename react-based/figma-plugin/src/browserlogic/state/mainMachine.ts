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
import {
  getInitialRenamePartCopy,
  getInitialXStateContextCopy,
} from './initialValues'
import { getSingleUxiDefinition } from '../naming-recommendations/search'
import {
  AvailableNotations,
  NOTATIONS_MAIN_DICT,
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
  PluginChangeSearchPhrasesEvent,
  PluginConfirmPhraseEvent,
  PluginEmptySearchPhrasesEvent,
  PluginExplorationEvent,
  PluginInputTypingEvent,
  PluginSelectPhraseEvent,
} from './stateEvents'
import { match } from 'ts-pattern'
import { isIRIaProperty } from '../naming-recommendations/exploration'

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
  type?: string
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
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgPaYBdcAbXKAT2zGQAcDyBiACQHkA1AUQCUB9AEQ4AxAJIA5YQBVhLUTw6iJ3ANoAGALqJQNXLHQF0+TSAAeiAIwBOAGzYATCpVmVAVhdXbZgCwqrAGhDkiM6eFtjBFta2VlYWLgDsZgC+if5oWHiEJGSUsDRgAMboAGbo+czs3PxCYpLSshwAGpKqGkgg2rr6hm2mCB5m2Am2znFxFl7OABzOAMz+gQies9iWEc72thbOsc7JqRg4xFgA1pB8qASoAMqXBGDYAK6YR5inEAwAwlwcAIKKPAAZMQAaQ4fH4fx+LSMHT0BkwRl6MzMcTCcVcKkmDk8Vji7mc83MW08K0mMxGZOcZisMzinj2IDShxOZwu11u9yeLzeDAAqgAFPh-Dg8XmiIGiUHgoUSKHqGE6OHdUC9OK2QkIMyTJZ2Vy2ZGjCyTKyTOIMpnYbmsy43C73K3vb4AWQqgJBYIhsuhbVhXQRPUQBrRGKxKhxeOGGssKhm2BN5MmFjxPjMwXNB0tLIg5xtHMzr0gfMFwrdko9MrlrS0ir9iKCOqsZiiFhmFk2tk8Mz8ASJjjjlPc6Lik2GM3T6SIJH0NGwEDARVQD2IBHKnF4vOEcgBHCdcgUynlPpr8LrmusdgcTlczncXh8Go7qJmISTVk8dPfI-HOEny-QM9yApilKVdKg3LcdzkJoJG9atOhPAM+jMAYhhGMYJmmGZJijKlsAcfCtSwuJkWNb9sAACx0AgrjAYgCj9KhaHocorgkHgxEULgfg+KQZB4K4OG3HieCdXkASkWD2mPZUTEQbwSWpKIcWRFRhnvHs+iNUIUWQiIX07aIyMo2BqNo+j4WwZAl30Fi2IEoTeNkMUfjYH5hABH4ACEOEk30EJVOSvBWdw3xpJw1O7BYZkxZwwn6OkzHJQijKomi6PyBirL-BgJC4YQAHF8sqXKfiuJhfOk-0AsWILFNClSIo1EiBlNZDPFNOIVDbCwUpMtLzPwSzrPQWz2P3LieLqfjBI4YSrjEfLtwq+CZN6TYbEpLDbEmJt1jxB9kNiwjtnat8dt2FJGQzYzTPSzLhuwAAnVAAHdRo47huMc6aHJEsSJMPOClSq2SEDxEkW2HRLFK7RsH0iftaWsI13ExXrboGnAsv0J7XoYezZrYwQWA+XkrmW4HT2QhxBibI1L08dqUXh2JsFiSYdvxfD0XR-qMos7H0Fxt7WFYsbOK+qaCbmhalsBqSVpB3pqZUWnNlDLwmbiJrMVRYZTXZ6Z0XpS6LRuvn7r-bBYAeAAjGiV1FtiPom77pbY0TxOECna0QpsrFVpwXGmHxTWi9UNJI2MA9NKxnHWVMHCsXmzP5wbBetu2HdGgR3Z9-zQcS6Y8KTvF3DbPaH0TEl445zxqS8KJbBTu6BYem37bAFd3Z4YnSfJ+W-NW8w6UmPDLCiBIWx26wddxNmZlpfFtkcMdTeu1LU8tnGO+zp3xc+ya+J7+bREWnzB8qqmA9i0144TI11nfeGEjCMlhzGfUohpFvMaGq3d5dwYE6H4oheQ-ABACAAmjwCQLBCrbh4PvFg-JHIDyrArSmfsTS2GwK2TsMx9SNhGEsKu6I7CLxiIOYImw177HSObLeFldCYCgHRLgeN97uyms5Vy7kvIXwwUPJWckXBsxfJYdYswpgEg0h2VSYRKGENcJ1NUv8044BYWwsAHCRYsDFi7SWx8ZoyzPnLIRV8-ZNgfCRXUrUwwGh2pMdRDEtHsM4fo5240jGyB7p7AGFjFanjbFXHUIRbweHOjSE29CsbDX5ORZ6sAwC2juNgEoxA6IQCdPExJqBkmwAYAIbc-wPJi35EwLiAl84yQWAAWlNGEfwvQljJ3XukQWCSkkpLzBkrJOS-xdPyXAWcz0oBQCwFAIZySGAFVECwb4NSQYLH1ImUk5JhxJRpNrUGUQBhSIcOMeOthiKMzIp0vJyTUn3D6ZAAZ+hpkjIgGMiZrDHkMG+AsgQvAKlVI4OghUQTEJ7LihiI5e1nyeAfEsAY8YKRbNpOc3J3TrnpPQJku5yLhmwH-g8y5YAikzX+AJD4Mg+BlLYr80qgjAVYOqvqEkjY1LRSpEObCciqQKUpJsqk2ykWDPxai252SsUFNxegd5Pw+DgjFKS0QIguBOg9FS6pl8gX0ufHGXaMYXAogpA+EYNg4U8upIi9pcSBUot6ei-poqRkXO6Z8GQCrdwqppUedVuzNVMtcCyvVw4Hw0m0tyykpqzTmvFY8oVNrMWWuxZG-FhKSkin8ZuN1SzTwMq1cy3VbKHydVhSGhF4bYkJqtXaNFGKRVxrFQ64ZDAwSSB4G6gFHq6VesZdqv1ea5HPgGMdE1fKI11qudaqt9yJX4pxSOglfAuL5WbZU6lGbgXeq7bm-VcjwbrPhbys1paZ3RvHXanFbiwCSulYuv5raga+w1aEIirglijBpLiCOKyRxGqLXuktV0Ol2qPbamtIyz3vMbZSpdAkb2YLvV6h9d8wxoVfWqKuayB2hqHQegDY6gN4u6aeyZdF3kfCYKAoqUF+QAgWX8OoK7714IQ8+vEXYUNyK2IWjZGH91-otXh4ZqLqB0HIBOmgU6nX8hgaSp0qCGhsTgTwb4ogfhKu+JR7i7rb0FzWrSOw6JDmpghYzOeuD0PFv5Xx0dFbBP0BE2J8DV7qXQeEZmnTJywUGZOZCpqTZGXfrDWRTAuBbjMJoKgfIrJYDkTgJ8UjZ8RTzNlI5OjoNWyohHJy+uQdogWCaivQYutGYeHWFhOhPHsCBeC4NXIYXIBXGIPkqLhSSNkfiywRLtG1XtqREmbA6XNYq2y7l7wF5TSeA8LYbaHgAtBYuCFmrEA6sNei81uLPAEs0ZkEoMwgSuvmEsNHdEWon4hFbLIqKaE7BthUGXWkapnERoq7NqroXwsQA+LgZAaAOAAEcHioGIE12L5H1tJc67B5W+24yHemB2E7Wwmr11CEsUbTgy7+zIkULu+RyIsEyKQCgqKsBwn+6NQQHAJAkf4ryD4Hx-lXEEGJZLSJtTBVHCOCIXVHAanQngiIWlxhDmQmRUT3SuAFA+8gMAmAIBPcwDion+h-scCYowMqLAADqsDvgaZg1pxA-RsDeH03sm+rGFgo15xEQhyFkLRRiWVkXwyxf5Al1LmXfp5eYGJ8QZXQmYstemj8LglOW1M-18hQ3+Fxgm-iO+8wjYx6RCxGNjwjMwzC-xc7130vZc4oII9MAYAfjS44NAOAbB0BgDeit8jAkg8h8g-8sPYMIgXh1XSPSMR2ULFNUjhwXYxvknGIZCNjvklZ8+273P2B8+F+LxAUvMBYAV6r06+VwhFUOdVTt8He39S9bT++Gkj45gaWhmPNzbmIj61Uhn0X4vJ8549zPgvReS9l+X5Xt6O5UEwLr8HpgLfHXZzP2LqMeIOeuG8LUbwZmM-CbAYCubwFsXEPSX9C0MfHRB-SXJ-eEPPV-efRfcvL-f3VbRoSjajUHHfPXTUJwEkTsKGD8ckN8HZHvXaYMA0NURwKYZuUfTPLAqfZ-WfN-BfD-FfN6HuH-CQGBdNMHaglWNmaMUedwewQhKMa7WKdQ+uZSMYBIe7UtDAifbA93XAl-Ofd-JfMQ-GExCDP5ZvY0WFUcVsGIKkVwSKPba7FYF8I0LQzELwO-J3fgnA-AHFRcIgd7WgOiO4SwuVF1IA5vMYUIewdvfSLvKMFQsIKPJOSwaA-w8fQI4w4I7AUI3AcImgSIsAaIoHEUf-Bva9ZvdqVWaKRwK3LEWYANM-YIC-DqWITqZ8bYNAjMAw-I6fYo0o8oywyQv-X4AAuI2Q4eFvRI-va7FIo0NI1vEOLUFELqdEC6fQvgl3R-AouXIoh4MIj7MoruCo4g3KAqIqXgEqMqeI1vJI6KDvCwHEVYs-JwtvTzDZbYSwXIzAg4owkY04ko848Y4gmvEUMgqjLiSg2lXfBYtvV4lY7vcwEIXBeOGMOOBwGhbUQEwwgQkw0YiEy4ywiQ6TKQ2Yqg+YhIlE5YzvT4nvKYRPBwfUU1BmUrdA-Y7PI4kIsEsY8k4gnuGQ2kkRBAKkfZJsBIYITZKGKMGFBeT+bwYcMOcNS6QLOceANoJkRE6gupTWDUOpJuDIxwUcMYG8HEsifAIgfHBYTTeYjsJqOOOMPnM6QheuRsG0vHbIRiITfUukuPRYEcEbbaTo98SwPQsrW0rICga2PIQoEofIQMiUpYUIG8YYWIckPo8kDUdqEkTqdnRmaYN8JMbkjMB0HMdkO0VMzNKFM-IcQYPUTYYcVSCbXYsrKstkVFLkLMOsv2ckUkOkTlOkDkswKMd4o1dksbRHRedYMibs3MCtB0Ac6qbYMeGMPEMkbUR+dqSckYHdQdWke3C0X8acNc3ZBshYGkM0xwHESAkYLCMic8-8WcecRcZcS81UYMrUVWBwMkckWhewpICNV8gCRM4CFMttJE+gvCEKBlJMBInLM-UM1wMkFEdsS8FxAuEA6qTVRMLsWIRsZEZ8YMjYVEOFRMWIcMeuHCwaazB03XeY00bzHTcJIuawcGbaei3jdAb8xABIGwSGHaZEdwWGCcrdYbYiWkaRMbSwU8jePqJhdOB6Z6F6ASsGV+D8a7Z8RedWFgwMHwEkGMW7RSSRd8Xi8VTOTuAgTS6kNsPBdEAOPEJMKU68wMByuwd+WkBS9EHqCNRhVuKrQjHRV6TS0MwimIFMUisbGxYiZs40TgpIxKRS-9YDa5TSupWeDSQ08hAiLCLUVZVk8zSdctNJYVCdR5HUx0iUupfcuRUcRGf41MRmH+YdbDCtSqk9UZVAcZSZR5TSlQGxNDPzTDMrQ9HDWNCze1O1Iag1ffY1LjAY9KmawDaasq+NUDfFeauROOcAsa7jC0SaqzFXWzfDLKhqj9YbJaszB7GbWDPCq8pqReBAqYdEIid458+6yrTRF7CLRrTSs3QMYIWMQChKOqTsi0R7Vxf6hberSLOACKrEXrGU58fEHK87YIS7ewDvTlFwabX6hM+bcIr7X7f7Gq5iiUxSWKLmYIIq7YM7EG4bO+VU2kLCKcjHLHHHX0gnDkTS50jSaINLPnPVLUEcPwiNTHAgbHXHO07IQnL3RXYgIG4MnYy3JMU0backJYLmmWnm+Wvmlc3AVAOcCATSuOXBd+EYFwJuDm7nE0DWtUd8SINGXg+-YE4k4IgWjyhARMMeai94kIRKLYbYQk4Y5-BXdAJXFXVWqMGkWKJMHzBItwaMnkj2vk6fIQgg0Qr-eytgzYuOYcTsHaQyzURHOMUcXEN8MMTC8Oz2oI440kiI4UqvTSqkMeAOVSAC5Y4GzUMsuMWkDmfUKkdaNpZIIAA */
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
              CHANGE_NOTATION: [{
                target: "spacedDashes",
                cond: "isComponentSetOrInstanceOfVariant"
              }, "spacedCommaEquals"]
            },
            entry: 'assignSpacedSlashesNotation',
          },

          spacedCommaEquals: {
            on: {
              CHANGE_NOTATION: {
                target: 'spacedDashes',
                cond: "isComponentNotInVariantGuard"
              },
            },
            entry: 'assignCommaEqualsNotation',
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
      confirmPhrase: (context, event: PluginConfirmPhraseEvent) => {
        const { displayFullValue, iri } = event
        const ctxCopy = { ...context }
        const { confirmedRenameParts, notation } = ctxCopy.plugin.ontologySearch
        const foundRenamePartIdx = confirmedRenameParts.findIndex(
          val => val.relativeCursorPos !== -1
        )
        if (foundRenamePartIdx === -1) {
          console.log(context)
          console.error('error finding RenamePartSemantic')
          return
        }
        const foundRenamePart = confirmedRenameParts[foundRenamePartIdx]
        const isCursorAtLastPart =
          foundRenamePartIdx === confirmedRenameParts.length - 1
        foundRenamePart.main = { iri, shortForm: displayFullValue }
        const joinerStr = match(notation)
          .with(
            AvailableNotations.SpacedDashes,
            () => ` ${NOTATIONS_MAIN_DICT[notation].mainDelimiter} `
          )
          .with(
            AvailableNotations.SpacedSlashes,
            () => ` ${NOTATIONS_MAIN_DICT[notation].mainDelimiter} `
          )
          .with(
            AvailableNotations.SpacedCommaEquals,
            () => `${NOTATIONS_MAIN_DICT[notation].mainDelimiter} `
          )
          .exhaustive()
        if (isCursorAtLastPart) {
          foundRenamePart.relativeCursorPos = -1
          const newEmptyPart = getInitialRenamePartCopy()
          newEmptyPart.lexerStartEnd = {
            start: foundRenamePart.lexerStartEnd.end,
            end: foundRenamePart.lexerStartEnd.end,
          }
          const spliceLength = confirmedRenameParts.filter(
            val => val.relativeCursorPos !== -1
          ).length
          confirmedRenameParts.splice(
            foundRenamePartIdx + spliceLength + 1,
            0,
            newEmptyPart
          )
          newEmptyPart.relativeCursorPos = joinerStr.length
        } else {
          foundRenamePart.relativeCursorPos =
            foundRenamePart.lexerStartEnd.end -
            foundRenamePart.lexerStartEnd.start
        }
        const newRenameValueParts = confirmedRenameParts.map((val, idx) => {
          /*if (idx === foundRenamePartIdx) {
            return val.main.shortForm + joinerStr
          }*/
          return val.main.shortForm
        })
        const newRenameValue = newRenameValueParts.join(joinerStr)
        ctxCopy.plugin.renameValue = newRenameValue
        if (!ctxCopy.plugin.graph) {
          return
        }
        const isIriProp = isIRIaProperty(ctxCopy.plugin.graph, iri)
        ctxCopy.plugin.ontologySearch.isPropSearch = isIriProp
        ctxCopy.plugin.ontologySearch.exploredIRI = iri
        // mutate to set correct token start and end values
        newRenameValueParts.forEach((val, idx) => {
          const prevStrLength = newRenameValueParts
            .slice(0, idx)
            .join(joinerStr).length
          confirmedRenameParts[idx].lexerStartEnd = {
            start: prevStrLength,
            end: prevStrLength + val.length + joinerStr.length,
          }
          if (idx === 0) {
            confirmedRenameParts[idx].lexerStartEnd.end =
              prevStrLength + val.length
          }
          if (idx === foundRenamePartIdx) {
            confirmedRenameParts[idx].relativeCursorPos =
              confirmedRenameParts[idx].lexerStartEnd.end -
              confirmedRenameParts[idx].lexerStartEnd.start
          }
        })
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },

      overwriteMultiPhrase: (context, event: CopyCompTxtToRenameEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = event.copiedText ?? undefined
        ctxCopy.plugin.renameValue = handleNotation(
          ctxCopy.plugin.renameValue,
          event.targetNotation
        )
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      editMultiPhrase: (context, event: PluginInputTypingEvent) => {
        const ctxCopy = { ...context }
        //ctxCopy.plugin.renameValue = event.inputValue ?? undefined
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
      isComponentNotInVariantGuard: (context, event) => {
        return (
          !(context.host.selectionFocusedElement?.elementFigmaContext?.isComponentInVariant ?? false)
        )
      },
      isComponentSetOrInstanceOfVariant: (context, event) => {
        const figmaContext = context.host.selectionFocusedElement?.elementFigmaContext;
        if (!figmaContext) {
          return false;
        }
        return (
          figmaContext.isAComponentSet || figmaContext.isInstanceOfAVariant
        )
      },
    },
    services: {
      checkForFigmaDocMessages: (context, event) => send => {
        const pfn = (resolve, reject) => { }
        const result = new Promise(pfn)
        /** that's "onmessage" on the figma api: */
        onmessage = event => {
          const plMsg = event.data.pluginMessage
          console.log(plMsg)
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
