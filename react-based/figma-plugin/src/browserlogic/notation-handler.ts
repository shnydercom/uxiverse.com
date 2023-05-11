import { match } from 'ts-pattern';

export enum AvailableNotations {
  SpacedDashes = 'spaced-dashes',
  SpacedSlashes = 'spaced-slashes',
  SpacedCommaEquals = 'spaced-comma-equals'
}

export const NOTATIONS_MAIN_DICT: {
  [s: string]: { mainDelimiter: string, syntaxRemover: RegExp, syntaxReplacer: RegExp }
} = {
  [AvailableNotations.SpacedDashes]: {
    mainDelimiter: "-", syntaxRemover: /[\s-]*/g, syntaxReplacer: /(\s*[,\/]\s*)+/g
  },
  [AvailableNotations.SpacedSlashes]: {
    mainDelimiter: "/",
    syntaxRemover: /[\s\/]*/g, syntaxReplacer: /(\s*[,-]\s*)+ /g
  },
  [AvailableNotations.SpacedCommaEquals]: {
    mainDelimiter: ",",
    syntaxRemover: /[\s,]*/g, syntaxReplacer: /(\s*[-\/]\s*)+/g
  },
} as const;

export function handleNotation(
  inputStr: string | undefined,
  changeTo: AvailableNotations
): string | undefined {
  const replacerVal = match(changeTo)
    .with(AvailableNotations.SpacedDashes, (sel) => ` ${NOTATIONS_MAIN_DICT[sel].mainDelimiter} `)
    .with(AvailableNotations.SpacedSlashes, (sel) => ` ${NOTATIONS_MAIN_DICT[sel].mainDelimiter} `)
    .with(AvailableNotations.SpacedCommaEquals, (sel) => `${NOTATIONS_MAIN_DICT[sel].mainDelimiter} `)
    .exhaustive();
  return inputStr?.replace(
    NOTATIONS_MAIN_DICT[changeTo].syntaxReplacer,
    replacerVal
  )
}
