import { AllMainMachineStateEvents, HoverUIElemEnterEvent } from "../../browserlogic/state/stateEvents";
import { HoverableElements } from "../../identifiable/HoverableElements";

export interface MouseEnterExitHandlers {
    onAddToInputMouseEnter: () => void;
    onMouseLeave: () => void;
    onExploreMouseEnter: () => void;
    onCopyMouseEnter: () => void;
}

export const onMouseEnterExitHandlerFactory = (/** takes the "send" function from xstate, narrowed down for usage */
    send: (eventObj: AllMainMachineStateEvents) => void,): MouseEnterExitHandlers => {
    const onAddToInputMouseEnter = () => {
        send({
            type: 'HOVER_UI_ELEM_ENTER',
            payload: HoverableElements.addTerm,
        } as HoverUIElemEnterEvent)
    };
    const onMouseLeave = () => {
        send({
            type: 'HOVER_UI_ELEM_EXIT'
        })
    }
    const onExploreMouseEnter = () => {
        send({
            type: 'HOVER_UI_ELEM_ENTER',
            payload: HoverableElements.foundTerm,
        } as HoverUIElemEnterEvent)
    }
    const onCopyMouseEnter = () => {
        send({
            type: 'HOVER_UI_ELEM_ENTER',
            payload: HoverableElements.copyTerm,
        } as HoverUIElemEnterEvent)
    }
    return {
        onAddToInputMouseEnter,
        onMouseLeave,
        onExploreMouseEnter,
        onCopyMouseEnter,
    }
}