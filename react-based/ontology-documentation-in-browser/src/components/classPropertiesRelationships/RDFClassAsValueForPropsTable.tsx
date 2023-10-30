"use client"
import { Cell, ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { Fragment, FunctionComponent, useMemo } from "react";
import { match } from "ts-pattern";
import ontologyConfig from "../../../ontology.config";
import { ComponentDictionary, ExpandableGroupLayout } from "../table";
import { createDefaultMuiComponentDictionary } from "../table/DefaultMUIComponentDictionary";
import { Link as MUILink, TableCell } from "@mui/material";
import { baseLength, VerticalLinkWrapper } from "./shared";
import { i18nEN } from "@/i18n";
import { wrapPromise } from "@/client-utils";
import { getOntologyGraph, isRtLdGraph } from "@/graph-logic";
import { getSingleUxiDefinition } from "@uxiverse.com/jsonld-tools";
import { CategorizedEdgesProp } from "../interfaces";

//Instances of Thing may appear as a value for the following properties
export interface TableDataEntryRDFClassAsValue {
    rdfProperty: string;
    rdfAppearsOnTypes: string[];
    description: string;
}

interface RDFClassAsValueForPropsTableProps {
    categorizedEdges: CategorizedEdgesProp;
}


export const guardSingleIRI = (input: Cell<TableDataEntryRDFClassAsValue, unknown>): input is Cell<TableDataEntryRDFClassAsValue, string> => {
    return input.column.id === "rdfProperty" || input.column.id === "propFromType";
}

export const guardMultiIRI = (input: Cell<TableDataEntryRDFClassAsValue, unknown>): input is Cell<TableDataEntryRDFClassAsValue, string[]> => {
    return input.column.id === "rdfAppearsOnTypes";
}

const RDFClassAsValueForPropsTableComponentDictionary: ComponentDictionary<TableDataEntryRDFClassAsValue> = {
    ...createDefaultMuiComponentDictionary(),
    TableCell: ({ headlessProps, ...props }) => {
        const children = match(headlessProps)
            .when((hProps) => guardSingleIRI(hProps),
                (hP: Cell<TableDataEntryRDFClassAsValue, string>) => {
                    let userLink: string = hP.getValue();
                    let iri: string = hP.getValue();
                    if (iri.startsWith(ontologyConfig.baseIRI)) {
                        userLink = iri.slice(baseLength);
                    }
                    return <MUILink href={userLink}>{userLink}</MUILink>
                })
            .when((hProps) => guardMultiIRI(hProps),
                (hP: Cell<TableDataEntryRDFClassAsValue, string[]>) => {
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
                        return <MUILink key={`lw-${idx}`} href={userLink}>{userLink}</MUILink>
                    })}</LinkWrapper>
                })
            .otherwise((cellVal) => {
                return <>{cellVal.getValue()}</>
            })
        return <TableCell {...props}>{children}</TableCell>
    },
}

//the graph is circular and thus can't be handed over as prop when doing SSR
const graphResource = wrapPromise(getOntologyGraph())

export const RDFClassAsValueForPropsTable: FunctionComponent<RDFClassAsValueForPropsTableProps> = ({ categorizedEdges }) => {
    const graph = graphResource.read();
    //TODO: handle with suspense
    const isGraphValid = (isRtLdGraph(graph));
    const tableEntries = useMemo(() => {
        if (!isGraphValid || !categorizedEdges.otherCatEdges) {
            return null;
        }
        let result: TableDataEntryRDFClassAsValue[] = []
        const { categories, straightLineage } = categorizedEdges.otherCatEdges;
        for (const rdfPropertyEntry in categories) {
            if (Object.prototype.hasOwnProperty.call(categories, rdfPropertyEntry)) {
                const rdfAppearsOnTypes = categories[rdfPropertyEntry];
                const description = getSingleUxiDefinition(
                    rdfPropertyEntry,
                    graph
                ) ?? "";
                result.push({
                    rdfProperty: rdfPropertyEntry,
                    rdfAppearsOnTypes,
                    description,
                    //propFromType: lineageTerm
                })
            }
        }
        return result;
    }, [categorizedEdges, isGraphValid, graph]);

    const columns = useMemo<ColumnDef<TableDataEntryRDFClassAsValue, string>[]>(
        () => {
            const columnHelper = createColumnHelper<TableDataEntryRDFClassAsValue>()
            const result = [
                columnHelper.accessor(
                    "rdfProperty",
                    {
                        header: i18nEN.TABLEHEADING_PROPERTY,
                        cell: info => info.getValue()
                    }),
                columnHelper.accessor(
                    "rdfAppearsOnTypes",
                    {
                        header: i18nEN.TABLEHEADING_APPEARS_ON_TYPE,
                        cell: info => info.getValue()//.join(",\n")
                    }),
                columnHelper.accessor("description", {
                    header: i18nEN.TABLEHEADING_DESCRIPTION,
                    cell: info => info.getValue()
                }),
            ]
            return result;
        },
        []
    )
    if (!tableEntries || !isGraphValid) {
        return null;
    }
    return (<ExpandableGroupLayout<TableDataEntryRDFClassAsValue>
        data={tableEntries}
        columns={columns}
        componentDictionary={RDFClassAsValueForPropsTableComponentDictionary} />);
}