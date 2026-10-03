App.relocate = {
    init() {
        document.getElementById("remanejarBtn").addEventListener("click", App.relocate.open);
    },

    open() {
        const status = App.config.STATUS;
        const rows = App.ports.rows();
        const active = rows.filter(row => row.querySelector(".status").value === status.ATIVO);
        const free = rows.filter(row => {
            const value = row.querySelector(".status").value;
            return value === status.INATIVO || value === status.LIVRE;
        });

        if (!active.length || !free.length) {
            alert("É necessário ter pelo menos uma porta Ativa e uma porta Inativa ou Livre.");
            return;
        }

        const html = App.modal.portSelect("from", active, "Cliente atual")
            + App.modal.portSelect("to", free, "Nova porta")
            + `<div class="hint">O cliente será movido para a porta escolhida. A porta antiga ficará como Livre.</div>`;

        App.modal.open("Remanejar cliente", html, App.relocate.confirm);
    },

    confirm() {
        const origin = App.ports.get(document.getElementById("from").value);
        const target = App.ports.get(document.getElementById("to").value);

        target.querySelector(".casa").value = origin.querySelector(".casa").value;
        target.querySelector(".codigo").value = origin.querySelector(".codigo").value;
        App.ports.setStatus(target, App.config.STATUS.ATIVO);
        App.ports.clearRow(origin);

        App.modal.close();
        App.report.generate();
    }
};
