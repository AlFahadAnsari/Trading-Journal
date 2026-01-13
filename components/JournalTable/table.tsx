"use client";

import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  SortingState,
} from "@tanstack/react-table";
import toast from "react-hot-toast";
import { createColumns } from "./columns";
import DataTable from "../Common/DataTable";
import { JournalEntry } from "../Common/Types";
import EditModal from "./modal";
import axios from "axios";

export default function JournalTable() {
  const [data, setData] = useState<JournalEntry[]>([]);
  const [tableLoading, setTableLoading] = useState(false);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState("");
  const [editingRow, setEditingRow] = useState<JournalEntry | null>(null);

  const columns = createColumns((row) => setEditingRow(row));

  const filtered = selectedDate
    ? data.filter((row) => row.date.slice(0, 10) === selectedDate)
    : data;

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const loadData = async () => {
    setTableLoading(true);
    try {
      const res = await axios.get("/api/journals");
      setData(res.data.data || []);
    } catch {
      toast.error("Failed to load journal entries");
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Journal Entries</h1>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          />
        </div>

        <DataTable
          title="Journal History"
          table={table}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          loading={tableLoading}
        />
      </div>

      {editingRow && (
        <EditModal
          entry={editingRow}
          onClose={() => {
            setEditingRow(null);
            loadData();
          }}
        />
      )}
    </>
  );
}
