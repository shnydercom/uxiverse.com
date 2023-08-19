export const i18nEN = {
    APP_HEADING: "Uxiverse.com",
    ONTOLOGY_TYPE_SUBTITLE: "An uxiverse.com type"
} as const;

export type i18nMicroCopy = typeof i18nEN;
export type i18nMicroCopyKey = keyof i18nMicroCopy;