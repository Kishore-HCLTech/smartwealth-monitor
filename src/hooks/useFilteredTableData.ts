import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import inferColumns from '@/utils/inferColumns';
import { filterByCategory } from '@/utils/filterDataByCategory';
import type { ColumnDef } from '@tanstack/react-table';
import { fetchInvestments } from '@/redux/service/investmentSlice';

export const useFilteredTableData = (category: string) => {
  const { data } = useAppSelector((state) => state.investments);
  const filteredData = useMemo(() => filterByCategory(data, category), [data]);

  const [columns, setColumns] = useState<ColumnDef<any>[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInvestments());
  }, [])

  useEffect(() => {
    if (filteredData.length > 0) {
      setColumns(
        inferColumns(filteredData, {
          disableSorting: ['email'],
          headerClassName: 'text-blue-600 text-base font-semibold',
          cellClassName: 'text-gray-700 text-sm',
        }) as ColumnDef<any>[]
      );
      setLoading(false);
    }
  }, [filteredData]);

  return { filteredData, columns, loading };
};
