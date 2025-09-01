import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import jsPDF from "jspdf";

function calculateROI(initial: number, final: number): number {
  return ((final - initial) / initial) * 100;
}

function calculateSimpleAnnualROI(roi: number, years: number): number {
  return roi / years;
}

function calculateCAGR(initial: number, final: number, years: number): number {
  return ((final / initial) ** (1 / years) - 1) * 100;
}

export default function ROICalculator() {
  const [category, setCategory] = useState("Mutual Funds");
  const [initial, setInitial] = useState<number | null>(null);
  const [final, setFinal] = useState<number | null>(null);
  const [years, setYears] = useState<number>(1);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setInitial(null);
    setFinal(null);
    setYears(1);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("ROI Calculator Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Category: ${category}`, 20, 30);
    doc.text(`Initial Investment: Rs. ${initial}`, 20, 40);
    doc.text(`Final Amount: Rs. ${final}`, 20, 50);
    doc.text(`Investment Period: ${years} years`, 20, 60);
    doc.text(`Total Gain: Rs. ${final! - initial!}`, 20, 70);
    doc.text(`Return on Investment (ROI): ${roi.toFixed(2)}%`, 20, 80);
    doc.text(`Simple Annual ROI: ${simpleAnnualROI.toFixed(2)}%`, 20, 90);
    doc.text(`CAGR: ${cagr.toFixed(2)}%`, 20, 100);

    doc.save("roi_report.pdf");
  };

  // const handleDownload = async () => {
  //   const pdfUrl =
  //     "https://jp-prod.asyncgw.teams.microsoft.com/v1/objects/0-ea-d10-67ab51f65c0d935eef87f6db3c3090a4/views/original/roi_report.pdf";
  //   try {
  //     const response = await fetch(pdfUrl);
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.download = "roi_report.pdf";
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error("Download failed:", error);
  //     alert("Failed to download the report. Please try again later.");
  //   }
  // };

  const isValid =
    initial !== null &&
    final !== null &&
    initial > 0 &&
    final > initial &&
    years > 0;

  const roi = isValid ? calculateROI(initial!, final!) : 0;
  const simpleAnnualROI = isValid ? calculateSimpleAnnualROI(roi, years) : 0;
  const cagr = isValid ? calculateCAGR(initial!, final!, years) : 0;
  const gain = isValid ? final! - initial! : 0;

  const chartData = isValid
    ? [
        { label: "ROI (%)", value: +roi.toFixed(2) },
        { label: "Annual ROI (%)", value: +simpleAnnualROI.toFixed(2) },
        { label: "CAGR (%)", value: +cagr.toFixed(2) },
      ]
    : [];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold">ROI Calculator</h2>

      {/* Category Selector */}
      <div className="flex space-x-4">
        {["Mutual Funds", "Stocks", "Fixed Deposit"].map((cat) => (
          <Card
            key={cat}
            className={`cursor-pointer px-4 py-2 ${
              category === cat ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Section - Inputs */}
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>
              {category === "Fixed Deposit"
                ? "Principal Amount"
                : category === "Stocks"
                ? "Stock Purchase Price"
                : "Amount Invested"}
            </Label>
            <Input
              type="number"
              value={initial ?? ""}
              onChange={(e) => setInitial(Number(e.target.value))}
              placeholder="Enter amount"
            />
            {initial !== null && initial <= 0 && (
              <p className="text-red-500 text-sm">
                Amount must be greater than 0.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              {category === "Fixed Deposit"
                ? "Maturity Amount"
                : category === "Stocks"
                ? "Stock Selling Price"
                : "Amount Returned"}
            </Label>
            <Input
              type="number"
              value={final ?? ""}
              onChange={(e) => setFinal(Number(e.target.value))}
              placeholder="Enter amount"
            />
            {final !== null && final <= 0 && (
              <p className="text-red-500 text-sm">
                Amount must be greater than 0.
              </p>
            )}
            {initial !== null && final !== null && final <= initial && (
              <p className="text-red-500 text-sm">
                Returned amount must be greater than invested amount.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              {category === "Fixed Deposit"
                ? `Deposit Term (Years): ${years}`
                : category === "Stocks"
                ? `Holding Period (Years): ${years}`
                : `Investment Period (Years): ${years}`}
            </Label>
            <Slider
              value={[years]}
              min={1}
              max={10}
              step={1}
              onValueChange={(val) => setYears(val[0])}
            />
          </div>
        </Card>

        {/* Right Section - Results */}
        <Card className="p-6 space-y-4">
          {isValid ? (
            <>
              <p>
                <strong>Total Gain on Investment:</strong> ₹{" "}
                {gain.toLocaleString()}
              </p>
              <p>
                <strong>Return on Investment (ROI):</strong> {roi.toFixed(2)}%
              </p>
              <p>
                <strong>Simple Annual ROI:</strong> {simpleAnnualROI.toFixed(2)}
                %
              </p>
              <p>
                <strong>CAGR:</strong> {cagr.toFixed(2)}%
              </p>

              <div className="h-64 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="label"
                      // interval={0}
                      // angle={-45}
                      // textAnchor="end"
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <p className="text-gray-500">
              Please enter valid inputs to see results.
            </p>
          )}
        </Card>

        {isValid && (
          <button
            onClick={generatePDF}
            className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
          >
            Download ROI Report (PDF)
          </button>
        )}
      </div>
    </div>
  );
}
