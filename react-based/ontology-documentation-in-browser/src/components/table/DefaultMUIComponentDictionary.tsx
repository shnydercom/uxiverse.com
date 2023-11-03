import { ComponentDictionary, ExpandableDataEntry } from "./ExpandableGroupLayout";
import MuiTableContainer from "@mui/material/TableContainer";
import MuiTable from "@mui/material/Table";
import MuiTableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import MuiTableCell from "@mui/material/TableCell";
import { flexRender } from "@tanstack/react-table";

export const createDefaultMuiComponentDictionary: <T extends ExpandableDataEntry<T>>() => ComponentDictionary<T> = () => ({
    Outmost: MuiTableContainer,
    TableRoot: MuiTable,
    TableHead: MuiTableHead,
    TableHeaderRow: ({ headlessProps, ...props }) => <TableRow {...props} />,
    TableHeaderCell: ({ headlessProps }) => <MuiTableCell>{flexRender(
        headlessProps.column.columnDef.header,
        headlessProps.getContext()
    )}</MuiTableCell>,
    TableRow: ({ headlessProps, ...props }) => <TableRow {...props} />,
    TableBody: TableBody,
    TableCell: ({ headlessProps }) => <MuiTableCell>{`${headlessProps.getValue()}`}</MuiTableCell>
})