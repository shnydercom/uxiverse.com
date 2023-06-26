import { JsonLdProcessor, NodeObject } from "jsonld";
import { createEmptyGraph, createGraph } from "./createGraph";
import * as uxiverseOntologyJSONLDfile from "@uxiverse.com/ontology/ontology/uxiverse.com.json";
import { RtLdGraph } from "../../graphInterfaces";

const findDuplicates = (arr: string[]) =>
  arr.filter((item, index) => arr.indexOf(item) !== index);

describe("given empty input object", () => {
  test("then should return empty rtLDGraph", async () => {
    expect(createGraph({})).toStrictEqual(createEmptyGraph());
  });
});

// should be able to handle json-ld keywords
// should be able to handle "@id"
// should be able to handle "@type"
// should be able to handle "@value"

// should create a runtime-graph
// should create a class list
// should create a property list
// should create arbitrary lists
// classes should have a "subclassOf" that resolves to another class-Node
// properties should have a "subPropertyOf" that resolves to another property-Node
// objects should have arbitrary keys that resolve to arbitrary graph nodes

// context should be handled
// blank node identifiers like "@id": "_:b0" should have a place
// nodes with "http://..." should have a place
// nodes with a namespace like "uxi:..." should have a place

describe("given flattened uxiverse json-ld without blank nodes and no language specifics, no context supplied", () => {
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

  test("should contain only IRIs as identifiable nodes", async () => {
    runtimeGraph.identifiableNodes.forEach((node) => {
      expect(node["@id"]).toMatch(new RegExp("http(s)?://"));
    });
  });
  test('should "define" the same number of entries behind the URL of "https://uxiverse.com/ontology"', () => {
    const flattenedUxiEntries = ((uxiverseFlattened as any) as Array<
      NodeObject
    >).filter((nObj) => (nObj["@id"] as string).startsWith(uxiverseRootIRI));
    const rtUxiEntries = runtimeGraph.identifiableNodes.filter((node) => {
      return node["@id"].startsWith(uxiverseRootIRI);
    });
    const duplicates = findDuplicates(
      rtUxiEntries.map((entry) => entry["@id"])
    );

    expect(flattenedUxiEntries.length).toBeGreaterThan(0);
    expect(duplicates.length).toBe(0);
    expect(rtUxiEntries.length).toEqual(flattenedUxiEntries.length);
  });
  test("should contain unique strings for values, i.e. no duplicates in ontology labels and descriptions", () => {
    const values = runtimeGraph.collections.values.map((val) => val["@v"]);
    const duplicates = findDuplicates(values.map((entry) => entry.toString()));
    expect(duplicates.length).toBe(0);
    expect(values.length).toBeGreaterThan(0);
  });
  test("should contain unique strings for types, i.e. properties, types and such are uniquely (back-)referencable", () => {
    const types = runtimeGraph.collections.types.map((type) => type.iri);
    const duplicates = findDuplicates(types.map((entry) => entry.toString()));
    expect(duplicates.length).toBe(0);
    expect(types.length).toBeGreaterThan(0);
  });
  test("should contain more edges than values, between 1-2x the amount (as of 2023-04-08)", () => {
    const values = runtimeGraph.collections.values;
    const edges = runtimeGraph.edges;
    expect(edges.length).toBeGreaterThan(0);
    expect(edges.length).toBeGreaterThan(values.length);
    expect(edges.length).toBeLessThan(values.length * 2);
  });

  test("should contain both the properties and the direct fields on UIElement", () => {
    const uiElementDefinition = "The root class for all User Interface elements";
    const uiElementIRI = "https://uxiverse.com/ontology/UIElement";
    const definitionValue = runtimeGraph.collections.values.find((val) => val["@v"] === uiElementDefinition);
    const rdfClass = "http://www.w3.org/2000/01/rdf-schema#Class";
    const RDFS_SUBCLASS_OF = "http://www.w3.org/2000/01/rdf-schema#subClassOf";
    const typeEntry = runtimeGraph.collections.types.find((val) => val.iri === rdfClass)?.nodes.find((val) => val["@id"] === uiElementIRI)
    const uiElemSubclassOfEntries = typeEntry?.fields.filter((val) => val.type.iri === RDFS_SUBCLASS_OF)
    const isHiddenIRI = "https://uxiverse.com/ontology/isHidden";
    expect(definitionValue?.["@v"]).toEqual(uiElementDefinition);
    expect(typeEntry?.["@id"]).toBeTruthy();
    expect(uiElemSubclassOfEntries?.filter((val) => val.in["@id"] === uiElementIRI).length).toEqual(2)
    expect(typeEntry?.fields.filter((val) => val.in["@id"] === isHiddenIRI).length).toEqual(1)
  });
});

export default {};
