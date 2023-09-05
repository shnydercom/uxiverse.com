import * as typeIcons from "./type-icons";

export const typeIconsDict = typeIcons;

export type typeIconsDictKey = keyof typeof typeIconsDict;

export const guardTypeIconsDictKey = (input: string): input is typeIconsDictKey => {
    if (Object.keys(typeIconsDict).includes(input)) {
        return true
    }
    return false;
}