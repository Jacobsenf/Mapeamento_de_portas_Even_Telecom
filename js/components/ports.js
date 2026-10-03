App.ports = {
    container: null,

    init() {
        App.ports.container = document.getElementById("rows");
    },

    makeRow(number) {
        const row = document.createElement("div");
        row.className = "port-row";
        row.dataset.port = number;

        const options = App.config.STATUS_LIST
            .map(status => `<option>${status}</option>`)
            .join("");

        row.innerHTML = `
            <div class="port-number">${number}</div>
            <input class="casa" type="text" aria-label="Casa porta ${number}">
            <input class="codigo" type="text" aria-label="Código porta ${number}">
            <select class="status" data-status="${App.config.STATUS.LIVRE}">${options}</select>
        `;

        const status = row.querySelector(".status");
        status.addEventListener("change", () => {
            status.dataset.status = status.value;
        });

        return row;
    },

    rows() {
        return [...App.ports.container.querySelectorAll(".port-row")];
    },

    get(number) {
        return App.ports.container.querySelector(`[data-port="${number}"]`);
    },

    setStatus(row, value) {
        const status = App.format.normalizeStatus(value);
        const select = row.querySelector(".status");
        select.value = status;
        select.dataset.status = status;
    },

    clearRow(row) {
        row.querySelector(".casa").value = "";
        row.querySelector(".codigo").value = "";
        App.ports.setStatus(row, App.config.STATUS.LIVRE);
    },

    fillRow(row, data) {
        row.querySelector(".casa").value = data.casa || "";
        row.querySelector(".codigo").value = data.codigo || "";
        App.ports.setStatus(row, data.status);
    },

    render(quantity, list) {
        const byPort = new Map((list || []).map(item => [Number(item.porta), item]));
        const fragment = document.createDocumentFragment();

        for (let i = 1; i <= quantity; i++) {
            const row = App.ports.makeRow(i);
            const saved = byPort.get(i);
            if (saved) {
                App.ports.fillRow(row, saved);
            }
            fragment.appendChild(row);
        }

        App.ports.container.innerHTML = "";
        App.ports.container.appendChild(fragment);
    },

    collect() {
        return App.ports.rows().map(row => ({
            porta: Number(row.dataset.port),
            casa: row.querySelector(".casa").value.trim(),
            codigo: row.querySelector(".codigo").value.trim(),
            status: row.querySelector(".status").value
        }));
    }
};
