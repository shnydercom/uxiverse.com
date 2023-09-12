"use client"
import { CategorizedEdges, getCategorizedEdgesForPropertyCanBeOfType, getSingleUxiDefinition } from "@uxiverse.com/jsonld-tools";
import { Fragment, FunctionComponent, useMemo } from "react";
import { ComponentDictionary, ExpandableGroupLayout } from "../table";
import { Cell, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { i18nEN } from "@/i18n";
import { createDefaultMuiComponentDictionary } from "../table/DefaultMUIComponentDictionary";
import { getOntologyGraph, isRtLdGraph } from "@/graph-logic/getGraph";
import { wrapPromise } from "@/client-utils";
import { Box, BoxProps, Link as MUILink, TableCell, Typography } from "@mui/material";
import { match } from "ts-pattern";
import ontologyConfig from "../../../ontology.config";

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

const guardSingleIRI = (input: Cell<TableDataEntryForRDFClass, unknown>): input is Cell<TableDataEntryForRDFClass, string> => {
    return input.column.id === "rdfProperty" || input.column.id === "propFromType";
}

const guardMultiIRI = (input: Cell<TableDataEntryForRDFClass, unknown>): input is Cell<TableDataEntryForRDFClass, string[]> => {
    return input.column.id === "rdfExpectedTypes";
}

const baseLength = ontologyConfig.baseIRI.length;

const VerticalLinkWrapper = (props: BoxProps) => {
    const sx = {
        display: "flex",
        flexDirection: "column"
    }
    return <Box {...props} sx={sx} />
}

const RDFPropsTableComponentDictionary: ComponentDictionary<TableDataEntryForRDFClass> = {
    ...createDefaultMuiComponentDictionary(),
    TableCell: ({ headlessProps, ...props }) => {
        const children = match(headlessProps)
            .when((hProps) => guardSingleIRI(hProps),
                (hP: Cell<TableDataEntryForRDFClass, string>) => {
                    let userLink: string = hP.getValue();
                    let iri: string = hP.getValue();
                    if (iri.startsWith(ontologyConfig.baseIRI)) {
                        userLink = iri.slice(baseLength);
                    }
                    return <MUILink href={userLink}>{userLink}</MUILink>
                })
            .when((hProps) => guardMultiIRI(hProps),
                (hP: Cell<TableDataEntryForRDFClass, string[]>) => {
                    let userLinks: string[] = hP.getValue();
                    let iris: string[] = hP.getValue();
                    iris.forEach((iri, idx) => {
                        if (iri.startsWith(ontologyConfig.baseIRI)) {
                            userLinks[idx] = iri.slice(baseLength);
                        }
                    })
                    const LinkWrapper = iris.length > 1 ? VerticalLinkWrapper : Fragment
                    return <LinkWrapper>{iris.map((iri, idx) => {
                        const userLink = userLinks[idx];
                        return <MUILink href={userLink}>{userLink}</MUILink>
                    })}</LinkWrapper>
                })
            .otherwise((cellVal) => {
                return <>{cellVal.getValue()}</>
            })
        return <TableCell {...props} children={children} />
    },
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