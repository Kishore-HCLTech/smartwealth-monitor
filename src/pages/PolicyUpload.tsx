import React, { useState } from "react";
import Papa from "papaparse";
import axios from "axios";
import type { Policy } from "@/types/policy";

// type Policy = {
//   id: number;
//   name: string;
//   type: string;
//   renewalDate: string;
//   premium: number;
//   maturityDate: string;
// };

const PolicyUpload = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse<Policy>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data;
        setPolicies(parsedData);

        console.log(parsedData);

        // Optional: POST each policy to json-server
        parsedData.forEach((policy) => {
          axios
            .post("http://localhost:3001/policies", policy)
            .catch(console.error);
        });
      },
    });
  };

  return (
    <div className="p-4 space-y-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleCSVUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {policies.length > 0 && (
        <table className="w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Type</th>
              <th className="p-2">Renewal Date</th>
              <th className="p-2">Premium</th>
              <th className="p-2">Maturity Date</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((policy) => (
              <tr key={policy.id} className="border-t">
                <td className="p-2">{policy.id}</td>
                <td className="p-2">{policy.name}</td>
                <td className="p-2">{policy.type}</td>
                <td className="p-2">{policy.renewalDate}</td>
                <td className="p-2">{policy.premium}</td>
                <td className="p-2">{policy.maturityDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PolicyUpload;
