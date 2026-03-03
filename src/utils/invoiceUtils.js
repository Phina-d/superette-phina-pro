import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadInvoicePDF = (cart, client, zone) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();

  // 👤 Infos client
  const name = client.name || "Non renseigné";
  const phone = client.phone || "Non renseigné";
  const address = client.address || zone.name;

  // 🚚 Calculs
  const subtotal = cart.reduce((sum, p) => sum + p.price * p.qty, 0);
  const deliveryFee = zone?.price || 0;
  const total = subtotal + deliveryFee;

  // 🏷️ Titre
  doc.setFontSize(22);
  doc.setTextColor(225, 29, 72);
  doc.text("Facture - Supérette Chez Phina", pageWidth / 2, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Client : ${name}`, 14, 30);
  doc.text(`Téléphone : ${phone}`, 14, 36);
  doc.text(`Adresse : ${address}`, 14, 42);
  doc.text(`Date : ${new Date().toLocaleDateString()}`, 14, 48);

  // 🛒 Table Produits
  const tableData = cart.map((p) => [
    p.name,
    p.qty,
    `${p.price} FCFA`,
    `${p.price * p.qty} FCFA`,
  ]);

  // Ajouter sous-total, livraison et total
  tableData.push(["Sous-total", "", "", `${subtotal} FCFA`]);
  tableData.push(["Livraison", "", "", `${deliveryFee} FCFA`]);
  tableData.push(["TOTAL", "", "", `${total} FCFA`]);

  autoTable(doc, {
    startY: 55,
    head: [["Produit", "Qté", "Prix", "Total"]],
    body: tableData,
    theme: "grid",
    styles: {
      fontSize: 11,
      cellPadding: 4, // lignes un peu plus fines
      halign: "left",
      valign: "middle",
      lineHeight: 1.5, // interligne
    },
    headStyles: {
      fillColor: [34, 197, 94], // vert
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245], // gris clair
    },
    columnStyles: {
      3: { fontStyle: "bold" }, // colonne total en gras
    },
    didParseCell: (data) => {
      const lastIndex = tableData.length - 1;

      // TOTAL final plus grand et foncé
      if (data.row.index === lastIndex && data.column.index === 3) {
        data.cell.styles.fontSize = 14;
        data.cell.styles.textColor = [0, 0, 0];
        data.cell.styles.fillColor = [200, 200, 200]; // fond léger pour total
      }

      // Sous-total et livraison légèrement gris
      if (data.row.index === lastIndex - 2 || data.row.index === lastIndex - 1) {
        data.cell.styles.fillColor = [230, 230, 230];
      }
    },
  });

 // ... reste du code inchangé jusqu'à la fin de autoTable

// Message de remerciement
const finalY = doc.lastAutoTable.finalY || 70;
doc.setFontSize(12);
doc.setTextColor(0, 128, 0);

// Texte centré sans emoji incompatible
const thankYouText = "Merci pour votre achat chez Supérette Chez Phina"; 
const textWidth = doc.getTextWidth(thankYouText);
doc.text(thankYouText, (pageWidth - textWidth) / 2, finalY + 15);

  doc.save(`facture_${Date.now()}.pdf`);
};