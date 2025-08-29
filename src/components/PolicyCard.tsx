import { Card } from "@/components/ui/card";
import { isRenewalDue } from "@/utils/alerts";

export const PolicyCard = ({ policy }: { policy: any }) => (
  <Card className="p-4 mb-4">
    <h2 className="text-lg font-bold">{policy.name}</h2>
    <p>Type: {policy.type}</p>
    <p>Premium: ₹{policy.premium}</p>
    <p>Renewal: {policy.renewalDate}</p>
    {isRenewalDue(policy.renewalDate) && (
      <p className="text-red-500">Renewal Due Soon!</p>
    )}
  </Card>
);
