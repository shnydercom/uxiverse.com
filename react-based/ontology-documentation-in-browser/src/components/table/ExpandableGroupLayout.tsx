"use client"
import {
    ExpandedState,
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    getExpandedRowModel,
    ColumnDef,
    getGroupedRowModel,
    GroupingState,
    Cell,
    Row,
    Header,
    HeaderGroup,
} from '@tanstack/react-table'
import React, { useState } from 'react';

export type ExpandableDataEntry<T> = Partial<{ subRows: T[] }> | object;

export interface ExpandableGroupLayoutProps<T1 extends ExpandableDataEntry<T1> = object, T2 = unknown> {
    data: T1[];
    columns: ColumnDef<T1, T2>[];
    componentDictionary: ComponentDictionary<T1>;
}

export interface ComponentDictionary<T extends ExpandableDataEntry<T> = object> {
    Outmost: React.FC<React.PropsWithChildren>;
    TableRoot: React.FC<React.PropsWithChildren>;
    TableHead: React.FC<React.PropsWithChildren>;
    TableHeaderRow: React.FC<React.PropsWithChildren & { headlessProps: HeaderGroup<T> }>;
    TableHeaderCell: React.FC<{ headlessProps: Header<T, unknown> }>;
    TableRow: React.FC<React.PropsWithChildren & { headlessProps: Row<T> }>;
    TableBody: React.FC<React.PropsWithChildren>;
    TableCell: React.FC<{ headlessProps: Cell<T, unknown> }>;
}

export const ExpandableGroupLayout = <T extends ExpandableDataEntry<T> = object,>({ data, columns, componentDictionary }: ExpandableGroupLayoutProps<T, unknown>) => {

    const [grouping, setGrouping] = useState<GroupingState>([])
    const [expanded, setExpanded] = useState<ExpandedState>({})
    const headlessTable = useReactTable<T>({
        data,
        columns,
        state: {
            grouping,
            expanded,
        },
        onGroupingChange: setGrouping,
        onExpandedChange: setExpanded,
        getSubRows: row => {
            if (
                Object.prototype.hasOwnProperty.call(row, "subRows")) {
                return (row as { subRows: T[] }).subRows ?? []
            }
            return undefined;
        },
        getCoreRowModel: getCoreRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        debugTable: true,
    })
    const {
        Outmost,
        TableRoot,
        TableHead,
        TableHeaderRow,
        TableHeaderCell,
        TableRow,
        TableBody,
        TableCell
    } = componentDictionary;
    return (
        <Outmost>
            <TableRoot>
                <TableHead>
                    {headlessTable.getHeaderGroups().map(headerGroup => (
                        <TableHeaderRow key={headerGroup.id} headlessProps={headerGroup}>
                            {headerGroup.headers.map(header =>
                                <TableHeaderCell key={header.id} headlessProps={header} />)
                            }
                        </TableHeaderRow>))
                    }
                </TableHead>
                <TableBody>
                    {headlessTable.getRowModel().rows.map(row =>
                        <TableRow key={row.id} headlessProps={row}>
                            {row.getVisibleCells().map(cell =>
                                <TableCell key={cell.id} headlessProps={cell} />
                            )}
                        </TableRow>)
                    }
                </TableBody>
            </TableRoot>
        </Outmost>
    );
}
