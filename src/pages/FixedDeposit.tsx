import { DataTable } from '@/components/DataTable';
import Loader from '@/components/Loader';
import { useFilteredTableData } from '@/hooks/useFilteredTableData';

const FixedDeposit = () => {
  const { filteredData, columns, loading } = useFilteredTableData("Fixed Deposit");

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Fixed Deposit</h2>
      <DataTable data={filteredData} columns={columns} />
    </div>
  );
};

export default FixedDeposit;
