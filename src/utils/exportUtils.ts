import * as XLSX from "xlsx";
import jsPDF from "jspdf";

export const exportToExcel = (data: any[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportToPDF = (data: any[], filename: string) => {
  const doc = new jsPDF();
  data.forEach((item, i) => {
    doc.text(JSON.stringify(item), 10, 10 + i * 10);
  });
  doc.save(`${filename}.pdf`);
};
