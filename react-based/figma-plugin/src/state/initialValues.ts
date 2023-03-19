const generalFigmaUserTips: string[] = [
  'TIP: use "⌘ + ⏎" to select all child-layers of your current selection (AltGr + ⏎ on Windows)',
  'TIP: use "Shift + ⏎ to select the parents of all selected layers" ',
]

export function getRandomTip(): string {
  return generalFigmaUserTips[
    Math.round(Math.random() * generalFigmaUserTips.length)
  ]
}
