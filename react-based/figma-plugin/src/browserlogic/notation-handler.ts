import { MainMachineXSCtx } from './state/mainMachine'

export enum AvailableNotations {
  SpacedDashes = 'spaced-dashes',
  SpacedSlashes = 'spaced-slashes',
}

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
