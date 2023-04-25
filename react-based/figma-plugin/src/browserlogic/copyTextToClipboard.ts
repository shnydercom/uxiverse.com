export function copyTextToClipboard(copyText: string) {
    console.log("entering clipboard")
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

    } else {
        navigator.clipboard.writeText(copyText).then(
            function () {
                console.log(copyText + "copied to clipboard")
            })
            .catch(
                function () {
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