App.form = {
    el: {},

    init() {
        const ids = ["pon", "caixa", "equipe", "endereco", "qtd", "resultado", "output"];
        ids.forEach(id => {
            App.form.el[id] = document.getElementById(id);
        });

        App.config.PORT_OPTIONS.forEach(amount => {
            App.form.el.qtd.appendChild(new Option(amount, amount));
        });

        App.form.el.equipe.appendChild(new Option("Selecione", ""));
        App.config.TEAMS.forEach(team => {
            App.form.el.equipe.appendChild(new Option(team, team));
        });

        App.form.el.qtd.addEventListener("change", () => {
            App.ports.render(Number(App.form.el.qtd.value), App.ports.collect());
        });

        App.form.reset();
    },

    focus(id) {
        App.form.el[id].focus();
    },

    getData() {
        const el = App.form.el;
        return {
            pon: el.pon.value.trim(),
            caixa: el.caixa.value.trim(),
            equipe: el.equipe.value,
            mes: App.format.currentMonth(),
            endereco: el.endereco.value.trim(),
            quantidade: Number(el.qtd.value),
            portas: App.ports.collect()
        };
    },

    setTeam(value) {
        const select = App.form.el.equipe;
        if (value && ![...select.options].some(option => option.value === value)) {
            select.appendChild(new Option(value, value));
        }
        select.value = value || "";
    },

    setQuantity(value) {
        const select = App.form.el.qtd;
        const amount = Number(value) || App.config.DEFAULT_PORTS;
        if (![...select.options].some(option => Number(option.value) === amount)) {
            select.appendChild(new Option(amount, amount));
        }
        select.value = amount;
    },

    setData(data) {
        const el = App.form.el;
        el.pon.value = data.pon || "";
        el.caixa.value = data.caixa || "";
        el.endereco.value = data.endereco || "";
        App.form.setQuantity(data.quantidade);
        App.form.setTeam(data.equipe);
        App.ports.render(Number(el.qtd.value), data.portas || []);
    },

    reset() {
        App.form.setData({});
        App.form.el.resultado.value = "";
        App.form.el.output.classList.remove("show");
    }
};
