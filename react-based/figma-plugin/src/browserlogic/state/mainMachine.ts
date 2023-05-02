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
import { getInitialRenamePartCopy, getInitialXStateContextCopy } from './initialValues'
import { getSingleUxiDefinition } from '../naming-recommendations/search'
import { AvailableNotations, NOTATIONS_MAIN_DELIMITER_DICT, handleNotation } from '../notation-handler'
import {
  RtLdGraph,
  createEmptyGraph,
  createGraph,
} from '@uxiverse.com/jsonld-tools'
import { AllMainMachineStateEvents, CopyCompTxtToRenameEvent, FocusSelectionEvent, HostAppSelectionEvent, HostFetchEvent, HoverDefinitionEnterEvent, HoverUIElemEnterEvent, PluginChangeSearchPhrasesEvent, PluginConfirmPhraseEvent, PluginEmptySearchPhrasesEvent, PluginExplorationEvent, PluginInputTypingEvent } from "./stateEvents"
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
  shortForm: string;
  iri: string | null;
}

/**
 * stores syntactic blocks relating to a schema as far as they are known 
 */
export interface RenamePartSemantic {
  type?: string;
  property?: string;
  main: ShortFormAndIRI;
  relativeCursorPos: number;
  lexerStartEnd: LexerStartEnd
}

export interface LexerStartEnd { start: number, end: number }
export interface OntologySearchXSCtx {
  confirmedRenameParts: RenamePartSemantic[];
  ontologySearchValue: string;
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
  descriptionText: string | undefined;
  notation: AvailableNotations;
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
    /** @xstate-layout N4IgpgJg5mDOIC5QFsCGBLAdgOgPaYBdcAbXKAT2zGQAcDyBiACQHkA1AUQCUB9AEQ4AxAJIA5YQBVhLUTw6iJ3ANoAGALqJQNXLHQF0+TSAAeiAIwBOAGzZLF+wFYVZgCxnXAJgAcAGhDlEBxcLbAcnZy8VCxUvAGYVDwBfRL80LDxCEjJKWBowAGN0ADN0fOZ2bn4hMUlpWQ4ADUlVDSQQbV19QzbTBA93bAB2Mw8nDwtBlWCrMys-AIQXB1jsDxV1mNivaMGXK2TUjBxiLABrSD5UAlQAZWuCMGwAV0wTzHOIBgBhLg4AQUUPAAMmIANIcPj8AF-FpGDp6AyYIy9WJmQahQbhdZeJZmWKxOb+cwufrYTaxCxeKzLLxxA4gNLHM4XK63e6PF5vD4MACqAAU+ACODweaIQaJwZDBRIYeo4ToEd1QL1Bh55uZUR5bOEHFZNaMJvTGdguSzrncro9TZ9fgBZCrAsEQqEy2FteFdJE9RCo9EOTEbGK4-GEhZ4yahOIuBJeVxWQb7FIMo4m5kQS7m9mp96QXkCoWOiXO6Wy1paBWe5GBJbYGajKKqhxxFQOdUIPFWLyR-GqyZ66wWI0pogkfQ0bAQMBFVBPYgEcqcXg84RyIEcW1yBTKOXuiuIqvt6y2eyOZxuTy+Il9Fzo2LhDxuFQEqxWKZD9Ijufoce5ArFUoLpUy6ruuchNBIbrlp0+7en0AzDPW4yTNMapXmYDhmGSGyuNGlhmFMDjvjgAAWOgEDcYDEAUnpULQ9DlDcEg8GIihcH8XxSDIPA3Bwa4cTwto8kCUiQe0e5KiYiDRi4thWKM8RrI4FKhogD66mSkzRBYQT+oMsRJEmxqkbA5GUdRiLYMgs76AxTE8XxnGyKKfxsH8whAn8ABCHCiR6MHKlJriyfJCRRNpyltqMDhaiSQbbBYLheIMXhEdgxmmVR+Q0VZX4MBIXDCAA4oVlT5X8NxML54legFixBbMIWKeF1iRVYiVDJpZjbHieGpelFGZdl1noLZzFbmxHF1NxvEcPxNxiIVa5VdBEm9OMNhxEED5dZYCRmG26FeFqmy4VYCUEbEfVkQN5n4JZw3YAATqgADuo0sdw7GOdNDkCUJIk7lBio1ZJCAJjJFixJid4PrsMwqde4zdhhyVuMELhXSZN1ZRZOX6E9r0MPZs1MYILBfDyNzLcDB7uOsQwjLqT7+uhyyRUs6KRDiaIYXsqKYxlt04Hj6AE29rCMWNrFfVNxNzQtS2A2JK0g70dMqAzoyvnewxhLEkVhDJh2Jbs+kJXsAvY0NX7YLATwAEYUfOEtMR9E3fXLTGCcJwjU5WsEjK+tgbIlFjuBzCMeNSGtODiUe0mswSW2ZON3SLtsO07o0CJ7fv+aDeJeA4WHOFEr5F-YLiRQSmFLDiyUqNS0Vtcng24w9duO2A86ezwZMU1TSt+at5i7F2ERHUXcNJahCzyTJcSxG4PZ1q4rdC-dNud1nLtS59k1cb382iItPlD9VtOvsXSUYa4sxhB4S-s1s2CJUvekWB4kxouvqfCx3mdu4MFtH8UQPI-hAiBAATR4BIFgxU1w8F3iwPkjlB5lmVjTAOnYtQUi2NER+R0nz6yvI-Ekth8TSWxJMS6hkUz9RTjRXQmAoBUS4ITXensprOVcu5LyZ8MHD1VlJFs2BtIh2sFMKkD4DpUhCC4Sh7gKRNmcAZQ46QGFtzusw1hYB2HixYJLN2MtD4zXlifRWgiL4BxGAdZKxdjaNxGJSLqiZ1EkWuowiyOi2EcMMa7caJjZC929gDKxKsDyf2riMbAyjIaUn6B4foqURZ8mIs9WAYALQPFonQcgtpho0HSagTJsBvgoJgV8FgtpUENCYnAngvxRB-FtNwDgfIPJfAEfKCJsFxiYTaieU2UNYzaTbApY61hkpbC-k2QcdD0ipOKZk7JjxqB5IKV+IpGS4AMAhJIHgfImBsR4ugnpWDareAGcEewwzkqWFbFeVEXVX57FVPpBMZ0MYLP-l+NJOzVnYBKMQKiEBNn6H+SU3ZAg1yAg8pLI5Jzum7l6ZcsOtYbkTAUSMh5kUJiYQcFM0YUdvDrDccmRZw1IUrKzMC0F4L0DUrgLbLAuimUMD+HwSEiLyocDOSii5oMtKrAfPinCkR0LjP6A4twUY3Bf0pLQ9xm8IXLKybS9AILIAMqZbAFlLCqLsv2UxHlpy84jzBiodEYckrRgTK4eICNUSEtWDEXUgwG7aTCCkqlarAV0u1b6nZeqfFgHZV8JgoCSpgQ6SwNijlzXCIQPGGScksTJW2CSS8CxHVaiLjiCY0i2pqIpb81VAKNVarBUGqFeqlk7I5VykUogqmiBEFwVp3Ljm8sTbTcYIRaQBnGGQhRVcnlrAGR6l8j4w7OB9X8v1lb6U1tKSqxlaryltuEB2w53aeK9oDviEIhKobBH0imiY4z0KYTRB6-ETgXDBBSj8tdTL-WauXQu4Nr6N0wo4ICHira+DwpNXu5FQN-a1QmCEBq0Voi4gSBYKV1IMVomjmiaMMR53lqhe+qtOq1V1pXWABgf7AShJXKa8DmDIMF1RCEewUMZiJXwm1QYV76bxgbt4ew2xdTYfXRWy0QKP2Bq-bWn9DbjW7qRfyiD+c1Z3hWCxx+von20nGesGSHy9LjFjE2Etxp624aXWJnDq7jOZNI2xQqMme3n1RQXfCMU5J7AwlzGY7HSFeuwPmrYVr8SNxvAJt9pnq3idXRAZ6UAoCsvZUVUQcbqNCMiVEEVwRhjiucI8nNZLYlNndaMSIeCQuLuEwG8L5nmVRdQDFuLG7fhxoELwKjcmaMKcQMKpJGXw6JWy1etqqGPVNj6w2VKmBcD3G8TQVA+QWSwGIrsiNUbhSJZlAmhzgqURJV8-WDYSSJ1jKvPFbU6wYYjC-o3cbk2rjTdm5AG4xASmLbKctk+q2WDrbqAeqDMTdRRWcObfpbYTvoTO9FC7fZrtTe0TNubEAvi4GQGgDgABHJ4qBiCvcje9nga2ATfc27R3oYctT-bCIDx9wOryYmLphp8Ny7znlSkUbu+RiIsEyKQCggKsAIkx6NQQ-6I3cR5F8LpNwbiCCEj90GWwjaueiI3MIoyDruHRGDqYckcT+iSalbZUKuAFCR8gMAmAIC3fwHqvn+hMccDoowCqLAADqsDfjJesZc9Cr9AzoSK8lJDTymwrG6kdO8R0uqQ312qo3+QTdm4t56PVBBHpgDAH8c3HBoBwDYOgMAb03vRp4n8LgIvWuy96HJdEJJeY3lfM5wPOamZiJfIMMOlhaS6Wjzs2P8fzeW8wMn1P6fM-Z9gLn-Pm720bioxXn0CjZItlcHBmeJCc1nWtZ-AL2laQjG+cqg3mTe-I4TwPofaeM8QCzzAcfee3rrlQTA4vpemB2f3UTjrCBUQawQkxoMywIonkPUtRXw9I98lgo5yVjRD89FjcT9+8k9sAU8L9R8b8J8C8cdo1GhY141CdwktsfQrUyR+05IFI9YcsfRP5MJ4ozpooMJ+gcRu9Dc4DTcEDEQ9UZwiBEdaAqIHh0Cp9t0Z8wM59k1H5aw2pqQ9Rlgz1s0fQPVj1ZV3Av5cRBgmCj8WDT9EDODcBuCaBeCwB+De5Z8P8LVSDQh+k9QjpcQoknlaQNYrUMIKRG49QoZVCX0YDj9WDE92DsBtDdD9DDCzFQMkUlAzB8DidzAogVgo4CJEpp03BxlqQVg74rDvBCU4goCUwPCNC2CrdfCnguCkc9Du4DC79vhMDhRn8y8wM2sUsbFG5awklP4o5CUbxH1xlootRogi5G4GdXx5kD8Y8cjvC8i-CiiAiyiH8JAn9-gX838PdHNK9SQrV0JIYZggw8REjOxQhR1G4tgnBCU1DYC494CRjB98jCieCSj+D8oioSpeAyoKoRC5ItQepvBaRUQXwohxlP4B1ZUbwpE2MjjPDNCfCxiri+CyjC9hRsCgQ40CcZBniv5QhNhaROwsVdg2xoxUQOpAd4hKRSDkgkwJtJx4A2hGRzkIiEAABaGRK8WkmSX3HYXUKePUVKfAIgbnBYeTC1Ok9fYuM6E8e+BIBMQiF9DkrICgXJegSkz-VULEo6V1KMNvV8foeMdkrnbIW2PIQoEofIWUi1JYY9NNJ8GIRuOIWeKSHEIYE6FUvadUl9a0DMNkS0A0pNPk8wbrWscIPUG8Bg1UVKJ01kQFTkNMN02mO8WwW1CYFGdCeICg9sZeFEslevXCDCQMtMZ0wFa0cM2CdIskKGW+IuVU2xNCEkRkxeAkmkReVKT8McXMy5MdBYPUV+E8CYF8Z5MhWs3AUcb8CcKcGcOcBs0GeUtCSILCTaCkPSFsYlbs3sn8HU-8fUgVKkhRdERuesJsSYXYVUBGLqMnTYZYCYeM2cl9TRIWYclEBeSGPSW85uOSA6dGbseXL1WGX+GidZGUlcz-JKVqKYWJbSSGK5e9QzehTxLRMtdAS8xAYYGwG85YaKNo+GSKNYdEFw-SdwLqCkawd89uG2Z6F6aCsGYYIYBRSIL+WgjDA2eIMRShXXaIdItw5Vc8v+NdDOLuAgIi2YT+WJTERmawG8BSVqAkKMkCo6TozIjRcCjeUNfRIixU7YKGJSzESAy09sHEDWakDSywM6BIfjF9SzdVV0783kps1SBuXzJsVwZwfELqUrITHJT8-JQpQjIi0cueRVWwN5LNfSR+Ji0tSTEzcrUTSrQTWtIiuSGwE09YDNBKbwSKKkLscPGI7FC7JVAKwyvDT9KrENVlQ1NVNytEMRG8x+PUL+Xc5DGOArK1R+MleyoKnJCrAjb9QyrigkdEPy6KQHPSGvKVf0WwD1PYeMBCjDeqmlYK-DYjPVGrOrFhJlNyogywU9HXCQ747zEiwlTsZYA7Ak-y40CbGHEGOoxstsVvMRDYBSKYfCf0aHAfbU+7dMZ7OANytSqkDWVTJS7wB8Ya26phOHB7J7BbZ6kypNQlEISYfbaYawfSEHBMU7BnWYUUluF9A6u63IB67glHdHTHMknkpNJQmSNch+F8MOeDEHBKMkVvGytEbqMwFnNnDnTUnndkIij0hARjb0s7JYK1GYOyl9VnAgdnTnTk7IXnTAfnYgF6g6GIG9cICkJCKYAM-mhm4WyU8gbM3AVAScCACK6KXzQsp8V8JuLYaWimzXNGcGR+UC9IbIk4rws-Vmsyr-BROnVE-0JeVvYE4Ys-bAG3dAO3B3KWoPRUtqfc5KyPdK6AoYu20EvI5AkfK-MfdAoix8XzF8eMI6FU2gjokO2VWqnokYParI6OvvM4jggonQ8Y64u-Ii5o2sDchKTEL1NapvXOsOt1VRNw5IIAA */
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
            },
            entry: 'assignCommaEqualsNotation'
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

      phraseRecommendations: {
        states: {
          initialEmpty: {
            on: {
              SHOW_TREE: "treeAndEdgesView"
            }
          },

          treeAndEdgesView: {
            on: {
              CHANGE_SEARCH_PHRASES: {
                target: "autoCompleteView",
                actions: "changePhrasesAndReplaceVal"
              },

              CONFIRM_PHRASE: {
                target: "treeAndEdgesView",
                internal: false,
                actions: "confirmAutoCompletePhrase"
              },

              EMPTY_SEARCH_PHRASE: {
                target: "treeAndEdgesView",
                actions: "assignEmptySearchPhrases"
              },

              CHANGE_EXPLORATION: {
                target: "treeAndEdgesView",
                internal: true,
                actions: "changeExploration"
              }
            }
          },

          autoCompleteView: {
            on: {
              CONFIRM_PHRASE: {
                target: "treeAndEdgesView",
                actions: "confirmAutoCompletePhrase"
              },

              SELECT_PHRASE: [{
                target: "treeAndEdgesView",
                cond: "isPhraseWithIRI"
              }, {
                target: "autoCompleteView",
                internal: true
              }],

              CHANGE_SEARCH_PHRASES: {
                target: "autoCompleteView",
                internal: false,
                actions: "changePhrasesAndReplaceVal"
              },

              EMPTY_SEARCH_PHRASE: {
                target: "treeAndEdgesView",
                actions: "assignEmptySearchPhrases"
              },

              TRIGGER_TRASH: {
                target: 'treeAndEdgesView',
                actions: 'assignTrashReset',
              },

              CHANGE_EXPLORATION: {
                target: "treeAndEdgesView",
                actions: "changeExploration"
              }
            }
          }
        },

        initial: "initialEmpty"
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
        ctxCopy.plugin.ontologySearch.notation = AvailableNotations.SpacedDashes;
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignSpacedSlashesNotation: context => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = handleNotation(
          context,
          AvailableNotations.SpacedSlashes
        )
        ctxCopy.plugin.ontologySearch.notation = AvailableNotations.SpacedSlashes;
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignCommaEqualsNotation: context => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = handleNotation(
          context,
          AvailableNotations.SpacedCommaEquals
        )
        ctxCopy.plugin.ontologySearch.notation = AvailableNotations.SpacedCommaEquals;
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },

      changePhrasesAndReplaceVal: (context, event: PluginChangeSearchPhrasesEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = event.inputValue;
        ctxCopy.plugin.ontologySearch.ontologySearchValue = event.ontologySearchValue;
        ctxCopy.plugin.ontologySearch.confirmedRenameParts = event.confirmedRenameParts;
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      assignEmptySearchPhrases: (context, event: PluginEmptySearchPhrasesEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.renameValue = event.inputValue;
        ctxCopy.plugin.ontologySearch.exploredIRI = event.exploredIRI;
        if (!ctxCopy.plugin.graph) {
          return;
        }
        const isIriProp = isIRIaProperty(ctxCopy.plugin.graph, event.exploredIRI);
        ctxCopy.plugin.ontologySearch.isPropSearch = isIriProp;
        ctxCopy.plugin.ontologySearch.ontologySearchValue = event.ontologySearchValue;
        ctxCopy.plugin.ontologySearch.confirmedRenameParts = event.confirmedRenameParts;
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      confirmAutoCompletePhrase: (context, event: PluginConfirmPhraseEvent) => {
        const { displayFullValue, iri } = event;
        const ctxCopy = { ...context };
        const { confirmedRenameParts, notation } = ctxCopy.plugin.ontologySearch;
        const foundRenamePartIdx = confirmedRenameParts.findIndex((val) => val.relativeCursorPos !== -1);
        if (foundRenamePartIdx === -1) {
          console.error("error finding RenamePartSemantic")
          return;
        }
        const foundRenamePart = confirmedRenameParts[foundRenamePartIdx];
        foundRenamePart.main = { iri, shortForm: displayFullValue };
        foundRenamePart.relativeCursorPos = -1;
        const newEmptyPart = getInitialRenamePartCopy();
        newEmptyPart.relativeCursorPos = 0;
        newEmptyPart.lexerStartEnd = { start: foundRenamePart.lexerStartEnd.end, end: foundRenamePart.lexerStartEnd.end };
        confirmedRenameParts.splice(foundRenamePartIdx + 1, 0, newEmptyPart);
        const joinerStr = match(notation)
          .with(AvailableNotations.SpacedDashes, () => ` ${NOTATIONS_MAIN_DELIMITER_DICT[notation]} `)
          .with(AvailableNotations.SpacedSlashes, () => ` ${NOTATIONS_MAIN_DELIMITER_DICT[notation]} `)
          .with(AvailableNotations.SpacedCommaEquals, () => `${NOTATIONS_MAIN_DELIMITER_DICT[notation]} `)
          .exhaustive()
        ctxCopy.plugin.renameValue = confirmedRenameParts.map((val, idx) => {
          /*if (idx === foundRenamePartIdx) {
            return val.main.shortForm + joinerStr
          }*/
          return val.main.shortForm
        }).join(joinerStr)
        if (!ctxCopy.plugin.graph) {
          return;
        }
        const isIriProp = isIRIaProperty(ctxCopy.plugin.graph, iri);
        ctxCopy.plugin.ontologySearch.isPropSearch = isIriProp;
        ctxCopy.plugin.ontologySearch.exploredIRI = iri;
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
        //ctxCopy.plugin.renameValue = event.inputValue ?? undefined
        assign<MainMachineXSCtx, FocusSelectionEvent>(ctxCopy)
      },
      changeExploration: (context, event: PluginExplorationEvent) => {
        const ctxCopy = { ...context }
        ctxCopy.plugin.ontologySearch.exploredIRI = event.explorationValue;
        if (!ctxCopy.plugin.graph) {
          return;
        }
        const isIriProp = isIRIaProperty(ctxCopy.plugin.graph, event.explorationValue);
        ctxCopy.plugin.ontologySearch.isPropSearch = isIriProp;
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