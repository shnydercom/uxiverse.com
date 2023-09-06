"use client"
import { CategorizedEdges } from "@uxiverse.com/jsonld-tools";
import { FunctionComponent, useMemo } from "react";
import { ComponentDictionary, ExpandableGroupLayout } from "../table";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { i18nEN } from "@/i18n";
import { createDefaultMuiComponentDictionary } from "../table/DefaultMUIComponentDictionary";

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
    rdfExpectedType: string;
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

export const RDFPropertiesOnTypeTable: FunctionComponent<RDFPropertiesOnTypeTableProps> = ({ categorizedEdges }) => {
    const tableEntries = useMemo(() => {
        if (categorizedEdges.isProp || !categorizedEdges.catEdges) {
            return null;
        }
        let result: TableDataEntryForRDFClass[] = []
        const { categories, straightLineage } = categorizedEdges.catEdges;
        straightLineage.forEach((lineageTerm) => {
            categories[lineageTerm].forEach((rdfPropertyEntry) => {
                result.push({
                    rdfProperty: rdfPropertyEntry,
                    rdfExpectedType: "expected type placeholder",
                    description: "somedescription",
                    propFromType: lineageTerm
                })
            })
        })
        return result;
    }, [categorizedEdges]);

    const columns = useMemo<ColumnDef<TableDataEntryForRDFClass>[]>(
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
                    "rdfExpectedType",
                    {
                        header: i18nEN.TABLEHEADING_EXPECTED_TYPE,
                        cell: info => info.getValue()
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
    return (<ExpandableGroupLayout<TableDataEntryForRDFClass> data={tableEntries} columns={columns}
        componentDictionary={RDFPropsTableComponentDictionary} />);
}