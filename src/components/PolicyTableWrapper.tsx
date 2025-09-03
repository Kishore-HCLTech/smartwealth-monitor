import GenericTable from "@/components/GenericTable";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

import type { Column } from "@/components/GenericTable"; // Import Column type if exported
import type { Policy } from "@/types/policy";

const columns: Column<Policy>[] = [
  { label: "ID", key: "id" },
  { label: "Name", key: "name" },
  { label: "Type", key: "type" },
  { label: "Renewal Date", key: "renewalDate" },
  { label: "Premium", key: "premium" },
  { label: "Maturity Date", key: "maturityDate" },
];

const PolicyTableWrapper = () => {
  const policies = useSelector((state: RootState) => state.policyData.policies);

  return (
    <div className="p-4">
      <GenericTable columns={columns} data={policies} pageSize={10} />
    </div>
  );
};

export default PolicyTableWrapper;
