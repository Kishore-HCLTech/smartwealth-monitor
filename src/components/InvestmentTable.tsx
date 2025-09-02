// src/components/InvestmentTable.tsx
import { useFilteredTableData } from "@/hooks/useFilteredTableData";
import { DataTable } from "@/components/DataTable";

interface InvestmentTableProps {
  type: "Mutual Fund" | "Stock" | "Fixed Deposit";
}

export const InvestmentTable = ({ type }: InvestmentTableProps) => {
  const { filteredData, columns, loading } = useFilteredTableData(type);

  if (loading) return <div className="p-6">Loading {type} data...</div>;

  return (
    <div className="p-6">
      {/* <h2 className="text-2xl font-bold mb-4">{type}</h2> */}
      <DataTable data={filteredData} columns={columns} />
    </div>
  );
};
