App.report = {
    init() {
        document.getElementById("gerarBtn").addEventListener("click", App.report.generate);
    },

    build(data) {
        let text = `PON: ${data.pon}
Caixa: ${data.caixa}
Data: ${App.format.today()}
Equipe Técnica: ${data.equipe}
Endereço: ${data.endereco}
Quantidade de Portas: ${data.quantidade}

PORTA | CASA | CÓDIGO | STATUS
--------------------------------------------------
`;

        data.portas.forEach(porta => {
            text += `${porta.porta} | ${porta.casa} | ${porta.codigo} | ${porta.status}\n`;
        });

        return text;
    },

    generate() {
        const text = App.report.build(App.form.getData());
        App.form.el.resultado.value = text;
        App.form.el.output.classList.add("show");
        return text;
    }
};
