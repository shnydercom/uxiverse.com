import { match } from 'ts-pattern'
import { AvailableNotations, NOTATIONS_MAIN_DICT } from '../notation-handler'
import { RenamePartSemantic, LexerStartEnd } from '../state/mainMachine'

export const lexLine = (
  textValue: string,
  textCursorPos: number,
  notation: AvailableNotations,
  previousRenameSemantics: RenamePartSemantic[]
): RenamePartSemantic[] => {
  const lexByMainDelimiter = (
    tokenWSyntaxRegex: RegExp,
    replaceRegex: RegExp
  ): RenamePartSemantic[] => {
    //extra handling for initial state
    if (previousRenameSemantics.length === 0) {
      previousRenameSemantics = [
        {
          lexerStartEnd: { start: 0, end: textValue.length },
          relativeCursorPos: textCursorPos,
          main: {
            shortForm: textValue.replace(replaceRegex, ''),
            iri: null,
          },
        },
      ]
    }

    // operation on the whole string including whitespaces from delimiter to delimiter [" asöädf345 /","  fßd.sa/", "q_wer"]
    const tokensWSyntax = textValue.match(tokenWSyntaxRegex) ?? [textValue]

    const lexerStartEnd: LexerStartEnd[] = tokensWSyntax.map(
      (token, idx, array) => {
        const previousLineLength = array
          .slice(0, idx)
          .map(str => {
            return str.length
          })
          .reduce((prev, cur) => prev + cur, 0)
        return {
          start: previousLineLength,
          end: previousLineLength + token.length,
        }
      }
    )
    return tokensWSyntax.map((token, idx, array) => {
      // remove whitespace and delimiter
      const cleanedToken = token.replace(replaceRegex, '')
      let foundRenameSemantics = previousRenameSemantics.find(
        value =>
          value.value === cleanedToken ||
          value.property === cleanedToken ||
          value.main.shortForm === cleanedToken
      )
      //find cursor in uncleaned string
      let matchingCursorPosition =
        textCursorPos <= lexerStartEnd[idx].end &&
        textCursorPos > lexerStartEnd[idx].start
          ? textCursorPos
          : -1
      let localMatchingCursorPosition =
        matchingCursorPosition === -1
          ? -1
          : matchingCursorPosition - lexerStartEnd[idx].start
      if (matchingCursorPosition !== -1) {
        //find cursor in cleaned string
        let lookAhead: string = token.slice(
          localMatchingCursorPosition,
          localMatchingCursorPosition + 3
        )
        lookAhead = lookAhead.replace(replaceRegex, '')
        if (lookAhead) {
          localMatchingCursorPosition = cleanedToken.lastIndexOf(lookAhead)
        } else {
          let lookBehind = token.slice(
            localMatchingCursorPosition - 3,
            localMatchingCursorPosition
          )
          lookBehind = lookBehind.replace(replaceRegex, '')
          if (lookBehind) {
            localMatchingCursorPosition =
              cleanedToken.indexOf(lookBehind) + lookBehind.length
          }
        }
      }
      let result: RenamePartSemantic = {
        relativeCursorPos: localMatchingCursorPosition,
        lexerStartEnd: lexerStartEnd[idx],
        main: { iri: null, shortForm: '' },
      }
      if (foundRenameSemantics) {
        const { property, value, main } = foundRenameSemantics
        result = {
          ...result,
          property,
          value,
          main,
        }
      } else {
        result = {
          ...result,
          main: { iri: null, shortForm: cleanedToken },
        }
      }
      return result
    })
  }

  const lexBySecondaryDelimiter = (
    input: RenamePartSemantic[]
  ): RenamePartSemantic[] => {
    const secondaryDelimiter = '='
    const rv: RenamePartSemantic[] = []
    input.forEach(rpsVal => {
      const splitShortForm = rpsVal.main.shortForm.split(secondaryDelimiter)
      //use case: ignore both no secondary delimiters and more than 1 secondary delimiter
      if (splitShortForm.length !== 2) {
        rv.push(rpsVal)
        return
      }
      const frontRPS: RenamePartSemantic = JSON.parse(JSON.stringify(rpsVal))
      const rearRPS: RenamePartSemantic = JSON.parse(JSON.stringify(rpsVal))
      const rearStrLength: number =
        splitShortForm[1].length + secondaryDelimiter.length
      frontRPS.lexerStartEnd.end = rearRPS.lexerStartEnd.start =
        rearRPS.lexerStartEnd.end - rearStrLength
      frontRPS.property = frontRPS.main.shortForm = splitShortForm[0]
      rearRPS.value = rearRPS.main.shortForm = splitShortForm[1]
      if (rpsVal.relativeCursorPos !== -1) {
        if (
          rpsVal.relativeCursorPos <
          rearRPS.lexerStartEnd.end - rearStrLength
        ) {
          rearRPS.relativeCursorPos = -1
        } else {
          frontRPS.relativeCursorPos = -1
          rearRPS.relativeCursorPos += rearRPS.lexerStartEnd.end - rearStrLength
        }
      }
      rv.push(frontRPS, rearRPS)
    })
    return rv
  }

  return match(notation)
    .with(AvailableNotations.SpacedDashes, sel => {
      return lexByMainDelimiter(
        /-[^-]*|^[^-]+/g,
        NOTATIONS_MAIN_DICT[sel].syntaxRemover
      )
    })
    .with(AvailableNotations.SpacedSlashes, sel => {
      return lexByMainDelimiter(
        /\/[^\/]*|^[^\/]+/g,
        NOTATIONS_MAIN_DICT[sel].syntaxRemover
      )
    })
    .with(AvailableNotations.SpacedCommaEquals, sel => {
      return lexBySecondaryDelimiter(
        lexByMainDelimiter(
          /[,=][^,=]*|^[^,=]+/g,
          NOTATIONS_MAIN_DICT[sel].syntaxRemover
        )
      )
    })
    .exhaustive()
}
