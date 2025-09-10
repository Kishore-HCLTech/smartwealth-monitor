import GenericTable from "@/components/GenericTable";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

import type { Column } from "@/components/GenericTable"; // Import Column type if exported
import type { Policy } from "@/types/policy";
import { Badge } from "@/components/ui/badge";

const columns: Column<Policy>[] = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  {
    label: "Type",
    key: "type",
    render: (value) => {
      const colorMap: Record<string, string> = {
        Health: "bg-green-100 text-green-800",
        Auto: "bg-blue-100 text-blue-800",
        Life: "bg-purple-100 text-purple-800",
        Travel: "bg-yellow-100 text-yellow-800",
      };

      const badgeStyle =
        colorMap[value as string] ?? "bg-gray-100 text-gray-800";

      return <Badge className={badgeStyle}>{value}</Badge>;
    },
  },
  { label: "Renewal Date", key: "renewalDate" },
  { label: "Premium", key: "premium" },
  { label: "Maturity Date", key: "maturityDate" },

  // {
  //   label: "Actions",
  //   key: "id",
  //   render: (_, row) => (
  //     <div className="flex items-center gap-3">
  //       <button
  //         onClick={() => handleView(row)}
  //         className="text-blue-600 hover:text-blue-800"
  //         title="View"
  //       >
  //         <Eye className="w-4 h-4" />
  //       </button>
  //       <button
  //         onClick={() => handleEdit(row)}
  //         className="text-green-600 hover:text-green-800"
  //         title="Edit"
  //       >
  //         <Pencil className="w-4 h-4" />
  //       </button>
  //       <button
  //         onClick={() => handleDelete(row.id)}
  //         className="text-red-600 hover:text-red-800"
  //         title="Delete"
  //       >
  //         <Trash2 className="w-4 h-4" />
  //       </button>
  //     </div>
  //   ),
  // },
];

// const handleView = (row: Policy) => {
//   console.log("Viewing:", row);
// };

// const handleEdit = (row: Policy) => {
//   console.log("Editing:", row);
// };

// const handleDelete = (id: number) => {
//   console.log("Deleting ID:", id);
// };

const PolicyTableWrapper = () => {
  const policies = useSelector((state: RootState) => state.policyData.policies);

  return (
    <div className="p-4">
      <GenericTable columns={columns} data={policies} pageSize={10} />
    </div>
  );
};

export default PolicyTableWrapper;
