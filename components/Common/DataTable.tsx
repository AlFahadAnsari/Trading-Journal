import { flexRender, Table as TanstackTable } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface DataTableProps {
    table: TanstackTable<any>;
    title: string;
    globalFilter: string;
    setGlobalFilter: (value: string) => void;
    loading?: boolean;
}

export default function DataTable({
    table,
    title,
    globalFilter,
    setGlobalFilter,
    loading = false,
}: DataTableProps) {
    return (
        <div className="bg-white p-6 rounded-xl shadow w-full">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

                <input
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Search..."
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
            </div>

            {/* TABLE WRAPPER */}
            <div className="overflow-x-auto relative">
                {/* LOADER OVERLAY */}
                {loading && (
                    <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
                    </div>
                )}

                <Table className="min-w-full text-sm text-left text-gray-700">
                    {/* TABLE HEAD */}
                    <TableHeader className="bg-gray-50 text-gray-600 border-b">
                        {table.getHeaderGroups().map((hg) => (
                            <TableRow key={hg.id}>
                                {hg.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="cursor-pointer select-none px-4 py-2 font-medium"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {header.column.getIsSorted() && (
                                            <span>
                                                {header.column.getIsSorted() === "asc" ? " 🔼" : " 🔽"}
                                            </span>
                                        )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    {/* TABLE BODY */}
                    <TableBody>
                        {!loading &&
                            table.getRowModel().rows.length > 0 &&
                            table.getRowModel().rows.map((row, i) => (
                                <TableRow
                                    key={row.id}
                                    className={`border-b hover:bg-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="px-4 py-2">
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}

                        {!loading && table.getRowModel().rows.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={table.getAllLeafColumns().length}
                                    className="text-center text-gray-500 py-4"
                                >
                                    No data found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-end gap-3 mt-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Prev
                </Button>

                <span className="text-sm text-gray-600">
                    Page{" "}
                    <strong className="text-gray-800">
                        {table.getState().pagination.pageIndex + 1}
                    </strong>{" "}
                    of{" "}
                    <strong className="text-gray-800">
                        {table.getPageCount()}
                    </strong>
                </span>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
