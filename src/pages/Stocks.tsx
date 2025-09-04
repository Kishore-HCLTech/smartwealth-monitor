import { DataTable } from '@/components/DataTable';
import { useFilteredTableData } from '@/hooks/useFilteredTableData';
import { Loader } from 'lucide-react';

const Stocks = () => {
  const { filteredData, columns, loading } = useFilteredTableData("Stock");

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Stocks</h2>
      <DataTable data={filteredData} columns={columns} />
    </div>
  );
};

export default Stocks;
