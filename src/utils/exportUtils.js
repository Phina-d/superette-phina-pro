import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export function exportOrdersPDF(orders) {
  const doc = new jsPDF();
  doc.text("Liste des commandes", 10, 10);

  orders.forEach((o, i) => {
    doc.text(
      `${i + 1}. ID: ${o.id} | Total: ${o.total} FCFA | Statut: ${o.status}`,
      10,
      20 + i * 10
    );
  });

  doc.save("commandes.pdf");
}

export function exportOrdersExcel(orders) {
  const ws = XLSX.utils.json_to_sheet(orders);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Commandes");
  XLSX.writeFile(wb, "commandes.xlsx");
}
