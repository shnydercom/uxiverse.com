export const i18nEN = {
    APP_HEADING: "Uxiverse.com",
    ONTOLOGY_CLASS_SUBTITLE: "An uxiverse.com type",
    ONTOLOGY_PROPERTY_SUBTITLE: "An uxiverse.com property",
    ONTOLOGY_TYPE_UNDEFINED: "A term of unknown type",
    ONTOLOGY_OTHER_TYPE: "A term of this type: ",
    ONTOLOGY_DESCRIPTION_ICON_ALT: "An icon for the full description text",
    ARIA_LABEL_BREADCRUMB: "breadcrumb",
    TABLEHEADING_PROPERTY: "Property",
    TABLEHEADING_EXPECTED_TYPE: "Expected Type",
    TABLEHEADING_APPEARS_ON_TYPE: "On Type",
    TABLEHEADING_DESCRIPTION: "Description",
    COMPONENT_DESCRIPTION_EXPECTED_TYPES_OF_VALUES: "Values expected to be one of these types",
    COMPONENT_DESCRIPTION_USED_ON_TYPES: "Used on these types",
    COMPONENT_PROPERTY_EMPTY: "This property is not used directly, please refer to its related types",
    fn_TYPE_IN_HIERARCHY_POSITION: (typeName: string) => `Types with close relationship to "${typeName}":`,
    fn_TABLEDOCUMENTATION_TYPE_APPEARS_AS_PROP:
        (typeName: string) => `Instances of "${typeName}" may appear as a value for the following properties`
} as const;

export type i18nMicroCopy = typeof i18nEN;
export type i18nMicroCopyKey = keyof i18nMicroCopy;