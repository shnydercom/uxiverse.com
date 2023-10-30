export const i18nEN = {
    APP_HEADING: "Uxiverse.com",
    APP_ONTOLOGY_LINK: "back to overview",
    ONTOLOGY_CLASS_SUBTITLE: "An uxiverse.com type",
    ONTOLOGY_PROPERTY_SUBTITLE: "An uxiverse.com property",
    ONTOLOGY_TYPE_UNDEFINED: "A term of unknown type",
    ONTOLOGY_OTHER_TYPE: "A term of this type: ",
    ONTOLOGY_DESCRIPTION_ICON_ALT: "An icon for the full description text",
    ONTOLOGY_MAIN_HEADING: "An Ontology for User Interface Components",
    ONTOLOGY_MAIN_INTRO: `We can show living organisms's evolutionary pathways with taxonomy-trees,
     but for the question of 'who eats whom?' we would need to show many more connections. Luckily the elements
     that make up modern User Interfaces don't eat each other, but they evolve with every design iteration,
     with changes in our users' hardware, software and the habits of our Apps' users. To show and make use of 
     these evolving relationships in the evolving realm of User Interface creation, this ontology was started.`,
    ONTOLOGY_MAIN_A_SELECTION_OF_TERMS: "A selection of terms",
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