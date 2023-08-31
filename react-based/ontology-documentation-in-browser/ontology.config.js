const ontologyConfig = {
    /**
     * the IRI that serves as the base for the json-ld schema
     */
    baseIRI: 'https://uxiverse.com/ontology/',
    /**
     * wich path nextjs should use as base path (entire /src behind this path)
     */
    baseNextJsPath: '/ontology',
    /**
     * the location where the schema defined as json-ld can be fetched from
     */
    jsonldIRI: 'https://uxiverse.com/api/masterdata/uxiverse-flattened'
}

module.exports = ontologyConfig
