import { getI18n } from "../i18n";
import { HoverableElements } from "../identifiable/HoverableElements";

const i18n = getI18n();

const mappingMap: Map<HoverableElements, string> = new Map([
  [HoverableElements.btnPrevComponent, i18n.tooltipPrev],
  [HoverableElements.btnNextComponent, i18n.toooltipNext],
  [HoverableElements.inputChangeReplace, i18n.tooltipNewName],
  [HoverableElements.inputCompName, i18n.tooltipSearchInCanvasByName],
  [HoverableElements.btnCompTxtToReplace, i18n.tooltipAppendOrigName],
  [HoverableElements.btnExecReplace, i18n.tooltipReplaceInCanvas],
  [HoverableElements.btnClear, i18n.tooltipClearName],
])

export function compIdToTooltip(compId: HoverableElements): string {
   let rv = mappingMap.get(compId);
   if(!rv){
    rv = i18n.tooltipDefault;
   }
   return rv;
}
