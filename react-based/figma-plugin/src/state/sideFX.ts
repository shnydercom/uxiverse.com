import { HostEventTypes } from "../communicationInterfaces"

(parent as Window)!.onmessage((msg) => {
	if (
		msg.type === HostEventTypes.selectionChanged) {
		handleHostSelectionChange();
	}
})

export function handleHostSelectionChange() {

}