import { match } from 'ts-pattern';
import { RenamePartSemantic } from './state/mainMachine';

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

export function determineJoinerTokens(notation: AvailableNotations, confirmedRenameParts: RenamePartSemantic[], prevRenameValue: string | undefined): string[] {
  let result: string[] = [""];
  //determine start token used when secondary is available
  if (notation === AvailableNotations.SpacedCommaEquals) {
    if (!prevRenameValue) {
      return result;
    }
    const joinerTokens = confirmedRenameParts.map((rps, idx) => {
      if (idx === 0) {
        return "";
      }
      return prevRenameValue[rps.lexerStartEnd.start];
    })
    result = joinerTokens;
  }
  return result;
}