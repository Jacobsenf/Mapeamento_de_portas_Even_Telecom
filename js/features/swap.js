App.swap = {
    active: [],

    init() {
        document.getElementById("trocarBtn").addEventListener("click", App.swap.open);
    },

    open() {
        const active = App.ports.rows().filter(
            row => row.querySelector(".status").value === App.config.STATUS.ATIVO
        );

        if (active.length < 2) {
            alert("É necessário ter pelo menos dois clientes Ativos para realizar a troca.");
            return;
        }

        App.swap.active = active;

        const html = App.modal.portSelect("a", active, "Primeiro cliente")
            + App.modal.portSelect("b", active.slice(1), "Segundo cliente");

        App.modal.open("Trocar clientes", html, App.swap.confirm, App.swap.bind);
    },

    bind() {
        document.getElementById("a").addEventListener("change", App.swap.refreshSecond);
        App.swap.refreshSecond();
    },

    refreshSecond() {
        const first = document.getElementById("a").value;
        const second = document.getElementById("b");
        const previous = second.value;
        const options = App.swap.active.filter(row => row.dataset.port !== first);

        second.innerHTML = App.modal.portOptions(options);

        if ([...second.options].some(option => option.value === previous)) {
            second.value = previous;
        }
    },

    confirm() {
        const a = App.ports.get(document.getElementById("a").value);
        const b = App.ports.get(document.getElementById("b").value);

        const casaA = a.querySelector(".casa").value;
        const codigoA = a.querySelector(".codigo").value;

        a.querySelector(".casa").value = b.querySelector(".casa").value;
        a.querySelector(".codigo").value = b.querySelector(".codigo").value;
        b.querySelector(".casa").value = casaA;
        b.querySelector(".codigo").value = codigoA;

        App.modal.close();
        App.report.generate();
    }
};
