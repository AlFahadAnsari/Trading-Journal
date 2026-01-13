import { ColumnDef } from "@tanstack/react-table";
import { JournalEntry } from "../Common/Types";

export const createColumns = (
  onEdit: (row: JournalEntry) => void
): ColumnDef<JournalEntry>[] => [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => row.original.date.slice(0, 10),
  },
  {
    accessorKey: "session",
    header: "Session",
  },
  {
    accessorKey: "tradeResult",
    header: "Result",
  },
  {
    accessorKey: "profit",
    header: "Profit",
  },
  {
    accessorKey: "loss",
    header: "Loss",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <button
        onClick={() => onEdit(row.original)}
        className="text-blue-600 underline"
      >
        Edit
      </button>
    ),
  },
];
