import { JsonLdProcessor, NodeObject } from "jsonld";
import { createGraph } from "./createGraph";
import * as uxiverseOntologyJSONLDfile from "@uxiverse.com/ontology/ontology/uxiverse.com.json";
import { RtLdGraph } from "./graphInterfaces";
import { getAncestorsSiblingsAndDirectChildren } from "./hierarchy";

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
        const strHierarchy = getAncestorsSiblingsAndDirectChildren(runtimeGraph, buttonIRI, RDFS_SUBCLASS_OF)
        expect(strHierarchy).not.toBeNull();
        const atomUIElementIRI = uxiverseRootIRI + "AtomUIElement";
        const uiElementIRI = uxiverseRootIRI + "UIElement";
        const elementIRI = uxiverseRootIRI + "Element";
        const schemaThing = "https://schema.org/Thing";
        expect(strHierarchy).toEqual(expect.objectContaining(
            {
                iris: [RDFS_CLASS, schemaThing],
                subElements: {
                    iris: [RDFS_CLASS, elementIRI],
                    subElements: {
                        iris: [RDFS_CLASS, uiElementIRI],
                        subElements: {
                            iris: [RDFS_CLASS, atomUIElementIRI],
                            subElements: {
                                iris: [buttonIRI],
                                subElements: {
                                    iris: []
                                }
                            }
                        }
                    }
                }
            }
        ))
    });
    test("should get all children on class UIElement", async () => {
        const uiElementIRI = uxiverseRootIRI + "UIElement";
        const strHierarchy = getAncestorsSiblingsAndDirectChildren(runtimeGraph, uiElementIRI, RDFS_SUBCLASS_OF)
        expect(strHierarchy).not.toBeNull();
        const atomUIElementIRI = uxiverseRootIRI + "AtomUIElement";
        const elementIRI = uxiverseRootIRI + "Element";
        const schemaThing = "https://schema.org/Thing";
        expect(strHierarchy).toEqual(expect.objectContaining(
            {
                iris: [RDFS_CLASS, schemaThing],
                subElements: {
                    iris: [RDFS_CLASS, elementIRI],
                    subElements: {
                        iris: [uiElementIRI],
                        subElements: {
                            iris: [
                                atomUIElementIRI,
                                "https://uxiverse.com/ontology/ContainerUIElement",
                                "https://uxiverse.com/ontology/MoleculeUIElement",
                                "https://uxiverse.com/ontology/OrganismUIElement"
                            ],
                        }
                    }
                }
            }
        ))
    });

    test("should get all ancestors on Property 'isProminent', it is a sub-property", async () => {
        const settingsIri = uxiverseRootIRI + "isProminent";
        const strHierarchy = getAncestorsSiblingsAndDirectChildren(runtimeGraph, settingsIri, RDFS_SUBPROP_OF)
        expect(strHierarchy).not.toBeNull();
    });
    test("should get no ancestors on Property 'settings', as it is not a sub-property", async () => {
        const settingsIri = uxiverseRootIRI + "settings";
        const strHierarchy = getAncestorsSiblingsAndDirectChildren(runtimeGraph, settingsIri, RDFS_SUBPROP_OF)
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