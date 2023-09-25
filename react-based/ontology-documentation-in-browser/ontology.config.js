const ontologyConfig = {
    /**
     * the IRI that serves as the base for the json-ld schema
     */
    baseIRI: 'https://uxiverse.com/ontology/',
    //baseIRI: 'https://schema.org/',
    /**
     * wich path nextjs should use as base path (entire /src behind this path)
     */
    baseNextJsPath: '/ontology',
    /**
     * the location where the schema defined as json-ld can be fetched from
     */
    jsonldIRI: 'https://uxiverse.com/api/masterdata/uxiverse-flattened'
    //jsonldIRI: 'https://schema.org/version/latest/schemaorg-current-https.jsonld',
}

module.exports = ontologyConfig
