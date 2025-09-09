// src/modules/RenewalAlerts.tsx
import { useEffect, useState } from "react";
import { RenewalAlertCard } from "@/components/RenewalAlertCard";
import { isRenewalDue } from "@/utils/alerts";
import type { Policy } from "@/types/policy";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchPolicies } from "@/redux/service/policySlice";

const RenewalAlerts = () => {
  const dispatch = useAppDispatch();
  const { data: policies, status } = useAppSelector((state) => state.policies);
  const [duePolicies, setDuePolicies] = useState<Policy[]>([]);

  useEffect(() => {
    dispatch(fetchPolicies({ page: 1, limit: 100 }));
  }, [dispatch]);

  useEffect(() => {
    if (policies) {
      const filtered = policies.filter((policy) =>
        isRenewalDue(policy.renewalDate)
      );
      setDuePolicies(filtered);
    }
  }, [policies]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Renewal Alerts</h1>
      {status === "loading" && <p>Loading...</p>}
      {duePolicies.length === 0 ? (
        <p className="text-green-600">
          No upcoming renewals in the next 30 days.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {duePolicies.map((policy) => (
            <RenewalAlertCard key={policy.id} policy={policy} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RenewalAlerts;
