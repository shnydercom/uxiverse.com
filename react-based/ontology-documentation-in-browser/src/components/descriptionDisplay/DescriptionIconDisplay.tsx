import { getWellKnownIriSubPath } from "@uxiverse.com/jsonld-tools";
import { FunctionComponent } from "react";
import { i18nEN } from "@/i18n";

interface DescriptionIconDisplayProps {
    termToDisplay: string;
}

export const DescriptionIconDisplay: FunctionComponent<DescriptionIconDisplayProps> = async ({ termToDisplay }) => {
    let visualizationDataURL: string | undefined = ''
    let importedIcon: string | undefined = ""
    const effectFn = async () => {
        visualizationDataURL = `@uxiverse.com/visualassets/type-icons/${getWellKnownIriSubPath(
            termToDisplay
        )}.svg`
        try {
            importedIcon = await import(visualizationDataURL);
        } catch (error) {
            visualizationDataURL = undefined
        }
    }
    await effectFn()


    const classNameAddition = !visualizationDataURL && 'gone'
    return (
        <div className={`iri-visualization ${classNameAddition}`}>
            <div className="iri-visualization--inner">
                <img src={importedIcon} alt={i18nEN.ONTOLOGY_DESCRIPTION_ICON_ALT} />
            </div>
        </div>
    )
}