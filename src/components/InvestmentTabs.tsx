import { useRef } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, IndianRupee, Banknote } from "lucide-react";
import { InvestmentTable } from "@/components/InvestmentTable";
import { FIXED_DEPOSIT, MUTUAL_FUND, STOCKS } from "@/constants/appConstants";
import { Button } from "./ui/button";
import Papa from "papaparse";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchInvestments, postInvestment } from "@/redux/service/investmentSlice";
import { toast } from "sonner";
import Loader from "./Loader";

export function InvestmentTabs() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const {loading} = useAppSelector((state) => state.loading);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          for (const item of results.data as any[]) {
            dispatch(postInvestment(item))
          }
          toast.success("Data uploaded successfully!");
          dispatch(fetchInvestments());
        } catch (error) {
          console.error("Upload failed:", error);
          alert("Upload failed!");
        }
      },
    });
  };

  return (
    <>
      <Tabs defaultValue="mutual" className="w-full max-w-6xl mx-auto mt-10">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mutual">
            <LineChart className="mr-2 h-4 w-4" />
            {MUTUAL_FUND}s
          </TabsTrigger>
          <TabsTrigger value="stocks">
            <IndianRupee className="mr-2 h-4 w-4" />
            {STOCKS}s
          </TabsTrigger>
          <TabsTrigger value="fd">
            <Banknote className="mr-2 h-4 w-4" />
            {FIXED_DEPOSIT}
          </TabsTrigger>
        </TabsList>

        <div className="flex justify-start mt-4">
          <Button onClick={() => fileInputRef.current?.click()}>Add</Button>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        {loading ? <Loader/> : null} 

        <TabsContent value="mutual">
          <InvestmentTable type={MUTUAL_FUND} />
        </TabsContent>
        <TabsContent value="stocks">
          <InvestmentTable type={STOCKS} />
        </TabsContent>
        <TabsContent value="fd">
          <InvestmentTable type={FIXED_DEPOSIT} />
        </TabsContent>
      </Tabs>
    </>
  );
}
