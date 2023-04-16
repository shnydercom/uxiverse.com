import { JsonLdProcessor, NodeObject } from "jsonld";
import { createGraph } from "./createGraph";
import * as uxiverseOntologyJSONLDfile from "@uxiverse.com/ontology/ontology/uxiverse.com.json";
import { RtLdGraph } from "./graphInterfaces";
import { getAncestorsSiblingsAndChildren, getEdgesOfAncestorsOnly } from "./hierarchy";

describe("should get all ancestors, siblings and direct children as an object of IRIs", () => {
    const RDFS_CLASS = "http://www.w3.org/2000/01/rdf-schema#Class";
    const RDFS_SUBCLASS_OF = "http://www.w3.org/2000/01/rdf-schema#subClassOf";
    const RDFS_SUBPROP_OF = "http://www.w3.org/2000/01/rdf-schema#subPropertyOf";
    const RDF_PROP = "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property";
    // test initialization variables
    let uxiverseRootIRI: string;
    let uxiverseFlattened: NodeObject;
    let runtimeGraph: RtLdGraph;

    beforeEach(async () => {
        uxiverseRootIRI = "https://uxiverse.com/ontology/";
        uxiverseFlattened = await JsonLdProcessor.flatten(
            uxiverseOntologyJSONLDfile as any,
            {}
        );
        runtimeGraph = createGraph(uxiverseFlattened);
    });

    test("should get all ancestors on class Button", async () => {
        const buttonIRI = uxiverseRootIRI + "Button";
        const strHierarchy = getAncestorsSiblingsAndChildren(runtimeGraph, buttonIRI, RDFS_SUBCLASS_OF, false)
        expect(strHierarchy).not.toBeNull();
        const atomUIElementIRI = uxiverseRootIRI + "AtomUIElement";
        const uiElementIRI = uxiverseRootIRI + "UIElement";
        const elementIRI = uxiverseRootIRI + "Element";
        const schemaThing = "https://schema.org/Thing";
        expect(strHierarchy).toEqual(expect.objectContaining(
            {
                iris: [RDFS_CLASS, schemaThing],
                descendants: [{
                    iris: [RDFS_CLASS, elementIRI],
                    descendants: [{
                        iris: [RDFS_CLASS, uiElementIRI],
                        descendants: [{
                            iris: [RDFS_CLASS, atomUIElementIRI],
                            descendants: expect.arrayContaining([{
                                iris: [buttonIRI, RDFS_CLASS],
                                descendants: expect.any(Array)
                            }])
                        }]
                    }]
                }]
            }
        ))
    });
    test("should get all children on class UIElement, not ignoring the @type", async () => {
        const uiElementIRI = uxiverseRootIRI + "UIElement";
        const strHierarchy = getAncestorsSiblingsAndChildren(runtimeGraph, uiElementIRI, RDFS_SUBCLASS_OF, false)
        expect(strHierarchy).not.toBeNull();
        const atomUIElementIRI = uxiverseRootIRI + "AtomUIElement";
        const elementIRI = uxiverseRootIRI + "Element";
        const schemaThing = "https://schema.org/Thing";
        expect(strHierarchy).toEqual(expect.objectContaining(
            {
                iris: [RDFS_CLASS, schemaThing],
                descendants: [{
                    iris: [RDFS_CLASS, elementIRI],
                    descendants: expect.arrayContaining([{
                        iris: [uiElementIRI, RDFS_CLASS],
                        descendants: expect.arrayContaining([
                            { iris: [atomUIElementIRI], descendants: [] },
                            { iris: ["https://uxiverse.com/ontology/ContainerUIElement"], descendants: [] },
                            { iris: ["https://uxiverse.com/ontology/MoleculeUIElement"], descendants: [] },
                            { iris: ["https://uxiverse.com/ontology/OrganismUIElement"], descendants: [] },
                        ]),

                    }])
                }]
            }
        ))
    });

    test("should get all children on class UIElement, but ignoring the @type", async () => {
        const uiElementIRI = uxiverseRootIRI + "UIElement";
        const strHierarchy = getAncestorsSiblingsAndChildren(runtimeGraph, uiElementIRI, RDFS_SUBCLASS_OF, true)
        expect(strHierarchy).not.toBeNull();
        const atomUIElementIRI = uxiverseRootIRI + "AtomUIElement";
        const elementIRI = uxiverseRootIRI + "Element";
        const schemaThing = "https://schema.org/Thing";
        expect(strHierarchy).toEqual(expect.objectContaining(
            {
                iris: [schemaThing],
                descendants: [{
                    iris: [elementIRI],
                    descendants: expect.arrayContaining([{
                        iris: [uiElementIRI],
                        descendants: expect.arrayContaining([
                            { iris: [atomUIElementIRI], descendants: [] },
                            { iris: ["https://uxiverse.com/ontology/ContainerUIElement"], descendants: [] },
                            { iris: ["https://uxiverse.com/ontology/MoleculeUIElement"], descendants: [] },
                            { iris: ["https://uxiverse.com/ontology/OrganismUIElement"], descendants: [] },
                        ]),
                    }])
                }]
            }
        ))
    });

    test("should get all ancestors on Property 'isProminent', it is a sub-property", async () => {
        const isProminentIri = uxiverseRootIRI + "isProminent";
        const strHierarchy = getAncestorsSiblingsAndChildren(runtimeGraph, isProminentIri, RDFS_SUBPROP_OF, true)
        expect(strHierarchy).not.toBeNull();
        expect(strHierarchy?.iris).not.toContain(isProminentIri)
    });
    test("should get no ancestors on Property 'settings', as it is not a sub-property", async () => {
        const settingsIri = uxiverseRootIRI + "settings";
        const strHierarchy = getAncestorsSiblingsAndChildren(runtimeGraph, settingsIri, RDFS_SUBPROP_OF, true)
        expect(strHierarchy).not.toBeNull();
        expect(strHierarchy?.iris).toContain(settingsIri)
    });
    test("should get all siblings on a class", async () => {
        /*runtimeGraph.identifiableNodes.forEach((node) => {
            expect(node["@id"]).toMatch(new RegExp("http(s)?://"));
        });*/
    });
    test("should get all siblings on a property", async () => {
        /*runtimeGraph.identifiableNodes.forEach((node) => {
            expect(node["@id"]).toMatch(new RegExp("http(s)?://"));
        });*/
    });
    test("should get all children on a class", async () => {
        /*runtimeGraph.identifiableNodes.forEach((node) => {
            expect(node["@id"]).toMatch(new RegExp("http(s)?://"));
        });*/
    });
    test("should get all children on a property", async () => {
        /*runtimeGraph.identifiableNodes.forEach((node) => {
            expect(node["@id"]).toMatch(new RegExp("http(s)?://"));
        });*/
    });
})


describe("should get edges of all ancestors that are not the ancestors themselves as an object of string-arrays", () => {
    const RDFS_CLASS = "http://www.w3.org/2000/01/rdf-schema#Class";
    const RDFS_SUBCLASS_OF = "http://www.w3.org/2000/01/rdf-schema#subClassOf";
    const RDFS_SUBPROP_OF = "http://www.w3.org/2000/01/rdf-schema#subPropertyOf";
    const RDF_PROP = "http://www.w3.org/1999/02/22-rdf-syntax-ns#Property";

    const DOMAIN_INCLUDES = "https://schema.org/domainIncludes";
    const RANGE_INCLUDES = "https://schema.org/rangeIncludes";
    // test initialization variables
    let uxiverseRootIRI: string;
    let uxiverseFlattened: NodeObject;
    let runtimeGraph: RtLdGraph;

    beforeEach(async () => {
        uxiverseRootIRI = "https://uxiverse.com/ontology/";
        uxiverseFlattened = await JsonLdProcessor.flatten(
            uxiverseOntologyJSONLDfile as any,
            {}
        );
        runtimeGraph = createGraph(uxiverseFlattened);
    });

    test("should write categories and edges for class Button and its ancestors", async () => {
        const buttonIRI = uxiverseRootIRI + "Button";
        const catEdges = getEdgesOfAncestorsOnly(runtimeGraph, buttonIRI, DOMAIN_INCLUDES, RDFS_SUBCLASS_OF);
        expect(catEdges).not.toBeNull();
        expect(catEdges!.categories[buttonIRI]).toContain("https://uxiverse.com/ontology/triggers");
        const expectedLineage = [
            "https://schema.org/Thing",
            "https://uxiverse.com/ontology/Element",
            "https://uxiverse.com/ontology/UIElement",
            "https://uxiverse.com/ontology/AtomUIElement",
            "https://uxiverse.com/ontology/Button",
        ];
        expect(catEdges!.straightLineage).toEqual(expectedLineage);
        expect(Object.keys(catEdges!.categories).length).toBe(expectedLineage.length);
        expect(Object.keys(catEdges!.categories)).toEqual(expect.arrayContaining(expectedLineage))
    })
})