const ontologyConfig = {
  /**
   * the IRI that serves as the base for the json-ld schema
   */
  baseIRI: "https://uxiverse.com/ontology/",
  //baseIRI: 'https://schema.org/',
  /**
   * the terms shown as an intro/example on the main page
   */
  introTerms: [
    "Button",
    "MediaAction",
    "IssueSeverityType",
    "ABTest",
    "UIElementState",
    "OrganismUIElement",
  ],
  /**
   * wich path nextjs should use as base path (entire /src behind this path)
   */
  baseNextJsPath: "/ontology",
  /**
   * The name as it is being used to name the ontology in the html documentation, title and description
   */
  ontologyName: "Uxiverse.com",
  /**
   * a description for the main page to indicate what the ontology is about
   */
  ontologyDescription:
    "Structured Relationships between Digital User Interface Components",
  /**
   * the location where the schema defined as json-ld can be fetched from
   */
  jsonldIRI: "https://uxiverse.com/api/masterdata/uxiverse-flattened",
  //jsonldIRI: 'https://schema.org/version/latest/schemaorg-current-https.jsonld',
};

module.exports = ontologyConfig;
