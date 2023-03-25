import { getI18n } from "../../i18n"

const i18n = getI18n()

const generalFigmaUserTips: string[] = [
  i18n.figmaTip001,
  i18n.figmaTip002
]

export function getRandomTip(): string {
  return generalFigmaUserTips[
    Math.round(Math.random() * generalFigmaUserTips.length)
  ]
}
