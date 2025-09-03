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

    // doc.setFontSize(12);
    // doc.text(`Category: ${category}`, 20, 30);
    // doc.text(`Initial Investment: Rs. ${initial}`, 20, 40);
    // doc.text(`Final Amount: Rs. ${final}`, 20, 50);
    // doc.text(`Investment Period: ${years} years`, 20, 60);
    // doc.text(`Total Gain: Rs. ${final! - initial!}`, 20, 70);
    // doc.text(`Return on Investment (ROI): ${roi.toFixed(2)}%`, 20, 80);
    // doc.text(`Simple Annual ROI: ${simpleAnnualROI.toFixed(2)}%`, 20, 90);
    // doc.text(`CAGR: ${cagr.toFixed(2)}%`, 20, 100);
    // Table data
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


//   function autoTable(
//     doc: jsPDF,
//     options: {
//       startY: number;
//       head: string[][];
//       body: string[][];
//       theme: string;
//       styles: { fontSize: number };
//       headStyles: { fillColor: number[] };
//     }
//   ) {
//     // @ts-ignore
//     doc.autoTable({
//       startY: options.startY,
//       head: options.head,
//       body: options.body,
//       theme: options.theme,
//       styles: options.styles,
//       headStyles: options.headStyles,
//     });
//   }
// function autoTable(doc: jsPDF, arg1: { startY: number; head: string[][]; body: string[][]; theme: string; styles: { fontSize: number; }; headStyles: { fillColor: number[]; }; }) {
//   throw new Error("Function not implemented.");
// }

