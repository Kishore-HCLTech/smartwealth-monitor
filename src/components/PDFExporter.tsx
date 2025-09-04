import jsPDF from "jspdf";

import html2canvas from "html2canvas-oklch";

import autoTable from "jspdf-autotable";


interface PDFExporterProps {
  chartRef: React.RefObject<HTMLDivElement | null>;
  data: {
    category: string;
    initial: number;
    final: number;
    years: number;
    roi: number;
    simpleAnnualROI: number;
    cagr: number;
    gain: number;
  };
}

export const generatePDF = async ({ chartRef, data }: PDFExporterProps) => {
  const { category, initial, final, years, roi, simpleAnnualROI, cagr, gain } =
    data;

  const rupeeIcon = new Image();
  rupeeIcon.src = "/assets/indian-rupee.png";

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("ROI Calculator Report", 20, 20);
  autoTable(doc, {
    startY: 30,
    head: [["Metric", "Value"]],
    body: [
      ["Category", category],
      ["Initial Investment", `Rs. ${initial}`],
      ["Final Amount", `Rs. ${final}`],
      ["Investment Period", `${years} years`],
      ["Total Gain", `Rs. ${gain}`],
      ["ROI", `${roi.toFixed(2)}%`],
      ["Simple Annual ROI", `${simpleAnnualROI.toFixed(2)}%`],
      ["CAGR", `${cagr.toFixed(2)}%`],
    ],
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [22, 160, 133] },
  });


  
      await new Promise((res) => setTimeout(res, 500));
  
      if (chartRef.current) {
        const canvas = await html2canvas(chartRef.current, {
          useCORS: true,
          scale: 2,
        });
        const imgData = canvas.toDataURL("image/png");
        doc.addImage(imgData, "PNG", 20, 110, 170, 80);
      }
  
      doc.save("roi_report.pdf");
  };


