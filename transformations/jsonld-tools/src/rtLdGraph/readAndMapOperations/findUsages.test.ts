import { JsonLdProcessor, NodeObject } from "jsonld";
import { createGraph } from "./../createOperations/createGraph";
import * as uxiverseOntologyJSONLDfile from "@uxiverse.com/ontology/ontology/uxiverse.com.json";
import { RtLdGraph } from "./../../graphInterfaces";
import { filterIdentifiableNodesById } from "./search";
import { getCategorizedEdgesForInstanceMayAppearAsValueForProp } from "./exploration";

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

    test("should get all usages of ColorCodeType and report the prop/field", async () => {
        const colorCodeTypeIRI = uxiverseRootIRI + "ColorCodeType";
        const colorIRI = uxiverseRootIRI + "color";
        const UIelementIRI = uxiverseRootIRI + "UIElement";
        const graphNode = filterIdentifiableNodesById(runtimeGraph, [colorCodeTypeIRI]);
        expect(graphNode).not.toBeFalsy();
        // this is a function that categorizes by ["rangeIncludes"(in-color), "domainIncludes"(out-UIelement)] and matches on the type of fields
        const classMayAppearAsValue = getCategorizedEdgesForInstanceMayAppearAsValueForProp(runtimeGraph, colorCodeTypeIRI);
        expect(classMayAppearAsValue).toEqual(expect.objectContaining({
            straightLineage: [colorCodeTypeIRI],
            categories: {
                [colorIRI]: [
                    UIelementIRI
                ]
            }
        }))
    });
})