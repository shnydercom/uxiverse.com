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
import React from 'react';

export interface ExpandableGroupLayoutProps<T extends { subRows?: T[] }> {
    data: T[];
    columns: ColumnDef<T>[];
    componentDictionary: ComponentDictionary<T>;
}

export interface ComponentDictionary<T extends { subRows?: T[] }> {
    Outmost: React.FC<React.PropsWithChildren>;
    TableRoot: React.FC<React.PropsWithChildren>;
    TableHead: React.FC<React.PropsWithChildren>;
    TableHeaderRow: React.FC<React.PropsWithChildren & { headlessProps: HeaderGroup<T> }>;
    TableHeaderCell: React.FC<{ headlessProps: Header<T, unknown> }>;
    TableRow: React.FC<React.PropsWithChildren & { headlessProps: Row<T> }>;
    TableBody: React.FC<React.PropsWithChildren>;
    TableCell: React.FC<{ headlessProps: Cell<T, unknown> }>;
}

export const ExpandableGroupLayout = <T extends { subRows?: T[] },>({ data, columns, componentDictionary }: ExpandableGroupLayoutProps<T>) => {

    const [grouping, setGrouping] = React.useState<GroupingState>([])
    const [expanded, setExpanded] = React.useState<ExpandedState>({})
    const headlessTable = useReactTable({
        data,
        columns,
        state: {
            grouping,
            expanded,
        },
        onGroupingChange: setGrouping,
        onExpandedChange: setExpanded,
        getSubRows: row => row.subRows,
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
