import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination"; // Adjust the import path if needed

export type Column<T> = {
  label: string;
  key: keyof T;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type GenericTableProps<T extends { id: number }> = {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
};

function GenericTable<T extends { id: number }>({
  columns,
  data,
  pageSize = 10,
}: GenericTableProps<T>) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];
    return sortOrder === "asc" ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
  });

  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="p-2 cursor-pointer"
                onClick={() => handleSort(col.key)}
              >
                {col.label}
                {sortKey === col.key && (sortOrder === "asc" ? " ↑" : " ↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr key={row.id} className="border-t">
              {columns.map((col) => (
                <td key={String(col.key)} className="p-2">
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default GenericTable;
