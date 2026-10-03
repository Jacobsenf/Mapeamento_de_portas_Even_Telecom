App.exporters.pdf = async function () {
    try {
        await App.loader.load("jspdf");
    } catch (error) {
        alert("Não foi possível carregar a biblioteca de PDF.");
        return;
    }

    const data = App.form.getData();
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    doc.setFontSize(18);
    doc.text("Mapa de Portas - Even Telecom", 14, 16);

    doc.setFontSize(10);
    doc.text(`PON: ${data.pon || "-"}`, 14, 25);
    doc.text(`Caixa: ${data.caixa || "-"}`, 14, 31);
    doc.text(`Data: ${App.format.today()}`, 14, 37);
    doc.text(`Equipe Técnica: ${data.equipe || "-"}`, 14, 43);
    doc.text(`Endereço: ${data.endereco || "-"}`, 14, 49);
    doc.text(`Quantidade de Portas: ${data.quantidade}`, 14, 55);

    doc.autoTable({
        startY: 61,
        head: [["Porta", "Casa", "Código", "Status"]],
        body: data.portas.map(p => [p.porta, p.casa, p.codigo, p.status]),
        theme: "grid",
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [36, 105, 173], textColor: [255, 255, 255], fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 247, 250] },
        columnStyles: {
            0: { cellWidth: 25 },
            1: { cellWidth: 80 },
            2: { cellWidth: 70 },
            3: { cellWidth: 40 }
        }
    });

    const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 76;
    doc.setFontSize(8);
    doc.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 14, finalY);

    const name = App.format.fileName(`${data.pon}_${data.caixa}_${App.format.today()}`, "mapa_portas");
    doc.save(`${name}.pdf`);
};
