import { MainMachineXSCtx } from './mainMachine'

export const isComponentNotInVariantGuard = (context: MainMachineXSCtx) => {
  return !(
    context.host.selectionFocusedElement?.elementFigmaContext
      ?.isComponentInVariant ?? false
  )
}
export const isComponentSetOrInstanceOfVariant = (
  context: MainMachineXSCtx
) => {
  const figmaContext = context.host.selectionFocusedElement?.elementFigmaContext
  if (!figmaContext) {
    return false
  }
  return figmaContext.isAComponentSet || figmaContext.isInstanceOfAVariant
}
