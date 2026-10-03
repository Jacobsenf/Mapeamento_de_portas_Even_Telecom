App.sidebar = {
    el: null,
    overlay: null,
    list: null,
    openMonths: new Set(),
    initialized: false,

    init() {
        App.sidebar.el = document.getElementById("sidebar");
        App.sidebar.overlay = document.getElementById("sidebarOverlay");
        App.sidebar.list = document.getElementById("savedBoxes");
        App.sidebar.openMonths.add(App.format.currentMonth());

        document.getElementById("menuBtn").addEventListener("click", App.sidebar.open);
        document.getElementById("closeSidebar").addEventListener("click", App.sidebar.close);
        App.sidebar.overlay.addEventListener("click", App.sidebar.close);
        App.sidebar.list.addEventListener("click", App.sidebar.handleClick);
        App.sidebar.list.addEventListener("toggle", App.sidebar.handleToggle, true);
    },

    open() {
        App.sidebar.el.classList.add("open");
        App.sidebar.overlay.classList.add("show");
    },

    close() {
        App.sidebar.el.classList.remove("open");
        App.sidebar.overlay.classList.remove("show");
    },

    handleToggle(event) {
        const group = event.target;
        if (!group.dataset || !group.dataset.month) {
            return;
        }
        if (group.open) {
            App.sidebar.openMonths.add(group.dataset.month);
        } else {
            App.sidebar.openMonths.delete(group.dataset.month);
        }
    },

    handleClick(event) {
        const target = event.target.closest("[data-action]");
        if (!target) {
            return;
        }

        if (target.dataset.action === "load") {
            App.boxes.load(target.dataset.id);
        }

        if (target.dataset.action === "delete") {
            App.boxes.remove(target.dataset.id);
        }
    },

    groupByMonth(boxes) {
        return boxes.reduce((groups, box) => {
            (groups[box.mes] = groups[box.mes] || []).push(box);
            return groups;
        }, {});
    },

    compareBoxes(a, b) {
        const options = { numeric: true };
        return String(a.pon).localeCompare(String(b.pon), "pt-BR", options)
            || String(a.caixa).localeCompare(String(b.caixa), "pt-BR", options);
    },

    boxHTML(box) {
        const escape = App.format.escapeHTML;
        const total = (box.portas || []).length;
        const active = (box.portas || []).filter(p => p.status === App.config.STATUS.ATIVO).length;
        const id = escape(box.id);

        return `
            <div class="saved-box-main" data-action="load" data-id="${id}">
                <div class="saved-box-name">PON ${escape(box.pon || "-")} · Caixa ${escape(box.caixa)}</div>
                <div class="saved-box-info">
                    Equipe: ${escape(box.equipe || "-")}<br>
                    ${active}/${total} porta(s) ativa(s)<br>
                    Atualizada: ${escape(App.format.dateTime(box.updatedAt))}
                </div>
            </div>
            <div class="saved-box-actions">
                <button data-action="load" data-id="${id}">Abrir</button>
                <button class="delete" data-action="delete" data-id="${id}">Excluir</button>
            </div>
        `;
    },

    render() {
        const boxes = App.storage.getBoxes();
        const list = App.sidebar.list;
        list.innerHTML = "";

        if (!boxes.length) {
            list.innerHTML = `<div class="saved-empty">
                Nenhuma caixa salva ainda.<br><br>
                Clique em <strong>Salvar caixa</strong> para armazenar uma caixa.
            </div>`;
            return;
        }

        const groups = App.sidebar.groupByMonth(boxes);
        const months = Object.keys(groups).sort().reverse();

        if (!App.sidebar.initialized) {
            App.sidebar.initialized = true;
            if (!months.some(month => App.sidebar.openMonths.has(month))) {
                App.sidebar.openMonths.add(months[0]);
            }
        }

        months.forEach(month => {
            const details = document.createElement("details");
            details.className = "month-group";
            details.dataset.month = month;
            details.open = App.sidebar.openMonths.has(month);

            const summary = document.createElement("summary");
            summary.innerHTML = `<span>${App.format.escapeHTML(App.format.monthLabel(month))}</span>
                <span class="month-count">${groups[month].length}</span>`;
            details.appendChild(summary);

            groups[month].sort(App.sidebar.compareBoxes).forEach(box => {
                const item = document.createElement("div");
                item.className = "saved-box";
                item.innerHTML = App.sidebar.boxHTML(box);
                details.appendChild(item);
            });

            list.appendChild(details);
        });
    }
};
