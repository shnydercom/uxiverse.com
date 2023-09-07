"use client"
import { CategorizedEdges, RtLdGraph, getCategorizedEdgesForPropertyCanBeOfType, getSingleUxiDefinition } from "@uxiverse.com/jsonld-tools";
import { FunctionComponent, useEffect, useMemo } from "react";
import { ComponentDictionary, ExpandableGroupLayout } from "../table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { i18nEN } from "@/i18n";
import { createDefaultMuiComponentDictionary } from "../table/DefaultMUIComponentDictionary";
import { getOntologyGraph, isRtLdGraph } from "@/graph-logic/getGraph";
import { wrapPromise } from "@/client-utils";

export interface CategorizedEdgesProp {
    isProp: boolean;
    catEdges: CategorizedEdges | null;
    otherCatEdges: CategorizedEdges | null;
}
interface RDFPropertiesOnTypeTableProps {
    categorizedEdges: CategorizedEdgesProp;
}

interface TableDataEntryForRDFClass {
    rdfProperty: string;
    rdfExpectedTypes: string[];
    description: string;
    /**
     * the type in the ontology that introduced this prop
     */
    propFromType: string;
    subRows?: TableDataEntryForRDFClass[]
}

const RDFPropsTableComponentDictionary: ComponentDictionary<TableDataEntryForRDFClass> = {
    ...createDefaultMuiComponentDictionary()
}

//the graph is circular and thus can't be handed over as prop when doing SSR
const graphResource = wrapPromise(getOntologyGraph())

export const RDFPropertiesOnTypeTable: FunctionComponent<RDFPropertiesOnTypeTableProps> = ({ categorizedEdges }) => {
    const graph = graphResource.read();
    //TODO: handle with suspense
    if (!isRtLdGraph(graph)) return null;
    const tableEntries = useMemo(() => {
        const isGraphSuccessful = isRtLdGraph(graph);
        if (!isGraphSuccessful || categorizedEdges.isProp || !categorizedEdges.catEdges) {
            return null;
        }
        let result: TableDataEntryForRDFClass[] = []
        const { categories, straightLineage } = categorizedEdges.catEdges;
        straightLineage.slice().reverse().forEach((lineageTerm) => {
            categories[lineageTerm].forEach((rdfPropertyEntry) => {
                const description = getSingleUxiDefinition(
                    rdfPropertyEntry,
                    graph
                ) ?? "";
                const rdfExpectedTypes = getCategorizedEdgesForPropertyCanBeOfType(graph, rdfPropertyEntry)
                    ?.categories[rdfPropertyEntry] ?? [];
                result.push({
                    rdfProperty: rdfPropertyEntry,
                    rdfExpectedTypes,
                    description,
                    propFromType: lineageTerm
                })
            })
        })
        return result;
    }, [categorizedEdges]);

    const columns = useMemo<ColumnDef<TableDataEntryForRDFClass, string>[]>(
        () => {
            const columnHelper = createColumnHelper<TableDataEntryForRDFClass>()
            const result = [
                columnHelper.accessor(
                    "rdfProperty",
                    {
                        header: i18nEN.TABLEHEADING_PROPERTY,
                        cell: info => info.getValue()
                    }),
                columnHelper.accessor(
                    "rdfExpectedTypes",
                    {
                        header: i18nEN.TABLEHEADING_EXPECTED_TYPE,
                        cell: info => info.getValue()//.join(",\n")
                    }),
                columnHelper.accessor("description", {
                    header: i18nEN.TABLEHEADING_DESCRIPTION,
                    cell: info => info.getValue()
                }),

                columnHelper.accessor(
                    "propFromType", {
                    header: 'propFromType',
                },)
            ]
            return result;
        },
        []
    )
    if (!tableEntries) {
        return null;
    }
    return (<ExpandableGroupLayout<TableDataEntryForRDFClass>
        data={tableEntries}
        columns={columns}
        componentDictionary={RDFPropsTableComponentDictionary} />);
}