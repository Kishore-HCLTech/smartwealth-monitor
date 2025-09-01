// src/components/RenewalAlertCard.tsx
import { Card } from "@/components/ui/card";
import type { Policy } from "@/types/policy";

export const RenewalAlertCard = ({ policy }: { policy: Policy }) => (
  <Card className="p-4 border-l-4 border-red-500 shadow-md bg-red-50">
    <h2 className="text-lg font-bold text-red-700">{policy.name}</h2>
    <p>Type: {policy.type}</p>
    <p>Premium: ₹{policy.premium}</p>
    <p>Renewal Date: {policy.renewalDate}</p>
    <p className="text-red-600 font-semibold">Renewal Due Soon!</p>
  </Card>
);
