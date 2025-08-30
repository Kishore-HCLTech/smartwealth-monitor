import { DataTable } from '@/components/DataTable';
import { useFilteredTableData } from '@/hooks/useFilteredTableData';

const MutualFunds = () => {
  const { filteredData, columns, loading } = useFilteredTableData("Mutual Fund");

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mutual Funds</h2>
      <DataTable data={filteredData} columns={columns} />
    </div>
  );
};

export default MutualFunds;
