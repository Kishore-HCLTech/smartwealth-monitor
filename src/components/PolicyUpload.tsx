import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { useDispatch } from "react-redux";
import { setPolicies } from "@/redux/service/policyDataSlice";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Policy } from "@/types/policy";

import type { Column } from "@/components/GenericTable";
import GenericTable from "@/components/GenericTable";
import { Upload } from "lucide-react";

const PolicyUpload = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<Policy[]>([]);
  const [invalidRows, setInvalidRows] = useState<
    { index: number; missingFields: string[] }[]
  >([]);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const expectedHeaders = [
    "id",
    "name",
    "type",
    "renewalDate",
    "premium",
    "maturityDate",
  ];

  const columns: Column<Policy>[] = [
    { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Type", key: "type" },
    { label: "Renewal Date", key: "renewalDate" },
    { label: "Premium", key: "premium" },
    { label: "Maturity Date", key: "maturityDate" },
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFile(selected);

    Papa.parse<Policy>(selected, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = results.data;
        const actualHeaders = results.meta.fields ?? [];

        // Step 1: Validate header format
        const isHeaderValid =
          expectedHeaders.length === actualHeaders.length &&
          expectedHeaders.every((key, i) => key === actualHeaders[i]);

        if (!isHeaderValid) {
          toast.error(
            "Invalid CSV format. Please use the correct policy structure."
          );
          setFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          return;
        }

        // Step 2: Validate missing values
        const invalids: { index: number; missingFields: string[] }[] = [];

        parsed.forEach((row, index) => {
          const missingFields = expectedHeaders.filter((key) => {
            const value = row[key as keyof Policy];
            return !value || value.toString().trim() === "";
          });

          if (missingFields.length > 0) {
            invalids.push({ index, missingFields });
          }
        });

        if (invalids.length > 0) {
          toast.error(
            `Found ${invalids.length} invalid row(s) with missing fields. Please review before uploading.`
          );
        }

        setInvalidRows(invalids);
        setParsedData(parsed);
        setOpen(true);
      },
    });
  };

  const handleConfirmUpload = async () => {
    try {
      const existing = await axios.get("http://localhost:3001/policies");
      const existingPolicies: Policy[] = existing.data;
      const maxId = Math.max(...existingPolicies.map((p) => p.id), 0);

      const policiesWithId = parsedData.map((policy, index) => ({
        ...policy,
        id: maxId + index + 1,
      }));

      await Promise.all(
        policiesWithId.map((policy) =>
          axios.post("http://localhost:3001/policies", policy)
        )
      );

      const updated = await axios.get("http://localhost:3001/policies");
      dispatch(setPolicies(updated.data));

      toast.success("Policies uploaded successfully!");
      resetUploadState();
    } catch (error) {
      toast.error("Upload failed. Please try again.");
    }
  };

  const resetUploadState = () => {
    setFile(null);
    setParsedData([]);
    setInvalidRows([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setOpen(false);
  };

  return (
    <div className="p-4 space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          Upload CSV File
        </span>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm text-gray-500
            file:mr-4 file:py-3 file:px-6
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-gradient-to-r file:from-blue-500 file:to-blue-700
            file:text-white hover:file:brightness-110"
        />
      </label>

      {file && (
        <p className="text-sm text-gray-600">
          Selected file: <strong>{file.name}</strong> (
          {(file.size / 1024).toFixed(2)} KB)
        </p>
      )}

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) resetUploadState();
        }}
      >
        <DialogContent className="inline-block w-auto p-2 space-y-4">
          <DialogHeader>
            <DialogTitle>Confirm Upload</DialogTitle>
            <DialogDescription>
              You're about to upload <strong>{parsedData.length}</strong>{" "}
              policies.
              <br />
              <span className="text-sm text-gray-600">
                File: <strong>{file?.name}</strong> (
                {(file?.size! / 1024).toFixed(2)} KB)
              </span>
            </DialogDescription>
          </DialogHeader>

          <GenericTable
            columns={columns}
            data={parsedData}
            pageSize={5}
            showSearch={false}
            className="bg-white p-6 rounded-xl"
            tableClassName="table-auto w-auto text-sm"
            headerClassName="bg-gray-100"
            rowClassName={(row, index) =>
              invalidRows.some((r) => r.index === index)
                ? "bg-red-50 hover:bg-red-100"
                : "hover:bg-gray-50"
            }
            cellClassName="text-gray-700"
          />

          {invalidRows.length > 0 && (
            <div className="text-sm text-red-600 space-y-1">
              <p className="font-semibold">Issues found:</p>
              {invalidRows.map((row) => (
                <p key={row.index}>
                  Row {row.index + 1}: Missing {row.missingFields.join(", ")}
                </p>
              ))}
              {/* <p className="font-semibold">{`Please review before uploading.`}</p> */}
            </div>
          )}

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={resetUploadState}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmUpload}
              disabled={invalidRows.length > 0}
              className={`bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 flex items-center gap-2 ${
                invalidRows.length > 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Upload className="w-4 h-4" />
              Confirm Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PolicyUpload;
