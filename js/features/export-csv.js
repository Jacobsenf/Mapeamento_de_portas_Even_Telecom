App.exporters.csv = function () {
    const data = App.form.getData();

    const escape = value => {
        const text = String(value ?? "").replaceAll('"', '""').replace(/\r?\n/g, " ");
        return `"${text}"`;
    };

    const lines = [
        ["PON", "Caixa", "Data", "Equipe Técnica", "Endereço", "Quantidade de Portas"],
        [data.pon, data.caixa, App.format.today(), data.equipe, data.endereco, data.quantidade],
        [],
        ["Porta", "Casa", "Código", "Status"],
        ...data.portas.map(p => [p.porta, p.casa, p.codigo, p.status])
    ];

    const csv = lines.map(line => line.map(escape).join(";")).join("\r\n");

    App.download("mapa_portas.csv", "\ufeff" + csv, "text/csv;charset=utf-8");
};
