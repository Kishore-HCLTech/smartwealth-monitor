import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchPolicies } from "@/redux/service/policySlice";
import type { Policy } from "@/types/policy";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PolicyCard } from "@/components/PolicyCard";

const Policies = () => {
  const dispatch = useAppDispatch();
  const {
    data: policies,
    status,
    total,
  } = useAppSelector((state) => state.policies);
  const [page, setPage] = useState(1);
  const limit = 5;

  // Ensure totalPages is at least 1
  const totalPages = Math.max(1, Math.ceil((total ?? 0) / limit));
  console.log("Total:", total);
  console.log(`totalPages ${totalPages}`);

  useEffect(() => {
    dispatch(fetchPolicies({ page, limit }));
  }, [page, dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Policy Overview</h1>

      {status === "loading" && <p>Loading...</p>}

      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Premium</TableHead>
            <TableHead>Renewal Date</TableHead>
            <TableHead>Maturity Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {policies.map((policy: Policy) => (
            <TableRow key={policy.id}>
              <TableCell>{policy.name}</TableCell>
              <TableCell>{policy.type}</TableCell>
              <TableCell>₹{policy.premium}</TableCell>
              <TableCell>{policy.renewalDate}</TableCell>
              <TableCell>{policy.maturityDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {policies.map((policy: Policy) => (
          <PolicyCard key={policy.id} policy={policy} />
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.max(p - 1, 1));
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 3 && page < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((p) => Math.min(p + 1, totalPages));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Policies;
