import { PluginEventTypes, PluginNotifyUserBridgeEvent } from "../communicationInterfaces";

export function copyTextToClipboard(copyText: string) {
    /**
     * telling the code.ts to show a toast in the main figma interface. 
     * External effect without consequences for the plugin
     */
    const notifyUserOutsidePlugin = () => {
        const bridgeEvent: PluginNotifyUserBridgeEvent = {
            type: PluginEventTypes.notifyUserOutsidePlugin,
            messageText: `"${copyText}" copied`
        }
        parent.postMessage({ pluginMessage: bridgeEvent }, '*');
    }
    if (!navigator?.clipboard) {
        //this is a deprecated and hacky method as a fallback
        let range: Range = document.createRange();
        var copyDummy = document.getElementById("doc-exec-dummy");
        if (!copyDummy) {
            console.error("couldn't access copy dummy")
            return;
        }
        if (copyDummy?.innerText) {
            copyDummy.innerText = copyText
        }
        range.selectNodeContents(copyDummy);
        const selection = window.getSelection();
        if (!selection) {
            console.error("couldn't access copy dummy selection")
            return;
        }
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        notifyUserOutsidePlugin()
    } else {
        navigator.clipboard.writeText(copyText).then(
            () => {
                notifyUserOutsidePlugin()
            })
            .catch(
                () => {
                    console.log("couldn't copy " + copyText)
                });
    }
}

/**
 * copy depends either on the allow-part of the surrounding iframe, or the deprecated document.execCommand to be available
 * @returns 
 */
export function isCopyAvailable(): boolean {
    return !!navigator?.clipboard?.writeText || !!document.execCommand
}