import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import type { ColumnDef } from '@tanstack/react-table';

type ColumnOptions = {
  disableSorting?: string[];
  headerClassName?: string;
  cellClassName?: string;
};

export default function inferColumns<T extends object>(
  data: T[],
  options?: ColumnOptions
): ColumnDef<T>[] {
  if (data.length === 0) return [];

  return Object.keys(data[0])
    .filter((key) => !['logo', 'id', 'category'].includes(key))
    .map((key) => {
      const disableSort = options?.disableSorting?.includes(key);
      const sortingFn =
        typeof data[0][key as keyof T] === 'number' ? 'basic' : 'alphanumeric';

      return {
        accessorKey: key,
        header: () => (
          <div className={options?.headerClassName}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </div>
        ),
        cell: (info) => {
          const value = info.getValue() as string | number;
          const row = info.row.original as T;

          const isNumber = typeof value === 'number';
          const conditionalClass = isNumber
            ? value < 20
              ? 'text-red-600'
              : 'text-green-600'
            : options?.cellClassName ?? '';

          if (key === 'name') {
            const logoUrl =
              typeof (row as any)['company logo'] === 'string' &&
                (row as any)['company logo'].trim() !== ''
                ? (row as any)['company logo']
                : '';

            return (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={logoUrl}
                    alt="Company Logo"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = ''; // Clear src to trigger fallback
                    }}
                  />
                  <AvatarFallback>
                    <Skeleton className="w-10 h-10 rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <span className={conditionalClass}>{value}</span>
              </div>
            );
          }

          return <span className={conditionalClass}>{value}</span>;
        },
        enableSorting: !disableSort,
        sortingFn: disableSort ? undefined : sortingFn,
      };
    });
}
