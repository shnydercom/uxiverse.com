import { MainMachineXSCtx } from './state/mainMachine'

export enum AvailableNotations {
  SpacedDashes = 'spaced-dashes',
  SpacedSlashes = 'spaced-slashes',
  SpacedCommaEquals = 'spaced-comma-equals'
}

export const NOTATIONS_MAIN_DELIMITER_DICT = {
  [AvailableNotations.SpacedDashes]: "-",
  [AvailableNotations.SpacedSlashes]: "/",
  [AvailableNotations.SpacedCommaEquals]: ",",
} as const;

export function handleNotation(
  xStateContext: MainMachineXSCtx,
  changeTo: AvailableNotations
): string | undefined {
  const replacerVal =
    changeTo === AvailableNotations.SpacedDashes ? ' / ' : ' - '
  return xStateContext.plugin.renameValue?.replace(
    /[\s/\s\s-\s]+/g,
    replacerVal
  )
}
