import { DataTable } from '@/components/DataTable';
import { useFilteredTableData } from '@/hooks/useFilteredTableData';

const FixedDeposit = () => {
  const { filteredData, columns, loading } = useFilteredTableData("Fixed Deposit");

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Fixed Deposit</h2>
      <DataTable data={filteredData} columns={columns} />
    </div>
  );
};

export default FixedDeposit;
