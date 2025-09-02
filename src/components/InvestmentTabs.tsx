import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, IndianRupee, Banknote } from "lucide-react";
import { InvestmentTable } from "@/components/InvestmentTable";
import { FIXED_DEPOSIT, MUTUAL_FUND, STOCKS } from "@/constants/appConstants";

export function InvestmentTabs() {
  return (
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
  );
}
