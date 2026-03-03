import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export function exportOrdersPDF(orders) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Liste des commandes", 14, 20);

  // Préparer les colonnes
  const tableColumn = ["ID", "Date", "Total", "Statut"];

  // Préparer les lignes
  const tableRows = orders.map((o) => {
    // Couleur du statut
    let statusColor;
    switch (o.status) {
      case "Livré":
        statusColor = [34, 197, 94]; // vert
        break;
      case "Annulé":
        statusColor = [239, 68, 68]; // rouge
        break;
      default:
        statusColor = [250, 204, 21]; // jaune
    }

    return [
      o.id,
      o.date,
      `${o.total} FCFA`,
      { content: o.status, styles: { fillColor: statusColor, textColor: 255, halign: "center" } },
    ];
  });

  autoTable(doc, {
    startY: 30,
    head: [tableColumn],
    body: tableRows,
    styles: { fontSize: 12 },
    headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [245, 245, 245] },
  });

  doc.save("commandes.pdf");
}

export function exportOrdersExcel(orders) {
  const ws = XLSX.utils.json_to_sheet(orders);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Commandes");
  XLSX.writeFile(wb, "commandes.xlsx");
}