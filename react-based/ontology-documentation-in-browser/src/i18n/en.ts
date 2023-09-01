export const i18nEN = {
    APP_HEADING: "Uxiverse.com",
    ONTOLOGY_CLASS_SUBTITLE: "An uxiverse.com type",
    ONTOLOGY_PROPERTY_SUBTITLE: "An uxiverse.com property",
    ONTOLOGY_TYPE_UNDEFINED: "A term of unknown type",
    ONTOLOGY_OTHER_TYPE: "A term of this type: "
} as const;

export type i18nMicroCopy = typeof i18nEN;
export type i18nMicroCopyKey = keyof i18nMicroCopy;