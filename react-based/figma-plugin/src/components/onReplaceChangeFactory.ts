import { AvailableNotations } from "../browserlogic/notation-handler"
import { AllMainMachineStateEvents } from "../browserlogic/state/stateEvents"

export const onReplaceChangeFactory = (
    notation: AvailableNotations,
    /** takes the "send" function from xstate, narrowed down for usage */
    send: (eventObj: AllMainMachineStateEvents) => void) => (
        value: string,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log(event)
        console.log(event.currentTarget.selectionEnd)
        console.log(event.currentTarget.selectionStart)
        if (value === "") {
            send({
                type: "DELETE_LAST_PHRASE",
            })
            return;
        }
        if ((event.currentTarget.selectionStart === null)
            || (event.currentTarget.selectionStart !== event.currentTarget.selectionEnd)) {
            //only handle if cursor position is clear
            return;
        }
        send({
            type: 'EDIT_PHRASES',
            inputValue: value,
            textCursorPosition: event.currentTarget.selectionStart
        })
    }