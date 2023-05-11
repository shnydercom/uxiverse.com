import { HostAppElement } from "../../communicationInterfaces";
import { AvailableNotations } from "../notation-handler";
import { MainMachineXSCtx } from "./mainMachine";
import { MainMachineSelectorArg } from "./moreTypes";
import { AllMainMachineStateEvents } from "./stateEvents";

export function evalAndSendNotationChange(
    send: (eventObj: AllMainMachineStateEvents) => void,
    focusedElement: HostAppElement,
    state: MainMachineSelectorArg | undefined,
    context: MainMachineXSCtx | undefined,
) {
    const { elementFigmaContext: ctx } = focusedElement;
    if (!ctx) {
        return;
    }
    if (ctx.isComponentInVariant) {
        send({
            type: "FORCE_SPACED_COMMA_EQUALS"
        })
        return;
    }
    if (
        (ctx.isAComponentSet || ctx.isInstanceOfAVariant)
        && (
            state?.matches("notation.spacedCommaEquals")
            || context?.plugin.ontologySearch.notation === AvailableNotations.SpacedCommaEquals)
    ) {
        send({
            type: "CHANGE_NOTATION"
        })
        return;
    }
}