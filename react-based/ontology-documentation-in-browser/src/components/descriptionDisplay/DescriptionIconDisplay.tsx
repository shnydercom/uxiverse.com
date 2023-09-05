import { getWellKnownIriSubPath } from "@uxiverse.com/jsonld-tools";
import { typeIconsDict, guardTypeIconsDictKey } from "@uxiverse.com/visualassets";
import { FunctionComponent } from "react";
import { i18nEN } from "@/i18n";

interface DescriptionIconDisplayProps {
    termToDisplay: string;
}

export const DescriptionIconDisplay: FunctionComponent<DescriptionIconDisplayProps> = ({ termToDisplay }) => {
    const iriSubPath = getWellKnownIriSubPath(
        termToDisplay
    )
    if (!guardTypeIconsDictKey(iriSubPath)) {
        return null;
    }
    const SVGTypeIcon = typeIconsDict[iriSubPath]

    return (
        <SVGTypeIcon aria-description={i18nEN.ONTOLOGY_DESCRIPTION_ICON_ALT} />
    )
}