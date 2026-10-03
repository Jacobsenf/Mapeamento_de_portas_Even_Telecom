App.modal = {
    backdrop: null,
    title: null,
    content: null,
    action: null,

    init() {
        App.modal.backdrop = document.getElementById("modalBackdrop");
        App.modal.title = document.getElementById("modalTitle");
        App.modal.content = document.getElementById("modalContent");

        document.getElementById("cancelModal").addEventListener("click", App.modal.close);
        document.getElementById("confirmModal").addEventListener("click", () => {
            if (App.modal.action) {
                App.modal.action();
            }
        });
    },

    open(title, html, onConfirm, onOpen) {
        App.modal.title.textContent = title;
        App.modal.content.innerHTML = html;
        App.modal.action = onConfirm;
        App.modal.backdrop.classList.add("show");

        if (onOpen) {
            onOpen();
        }
    },

    close() {
        App.modal.backdrop.classList.remove("show");
        App.modal.action = null;
    },

    portOptions(items) {
        return items.map(row => {
            const casa = row.querySelector(".casa").value || "sem cliente";
            return `<option value="${row.dataset.port}">Porta ${row.dataset.port} — ${App.format.escapeHTML(casa)}</option>`;
        }).join("");
    },

    portSelect(id, items, label) {
        return `<div class="field">
            <label for="${id}">${label}:</label>
            <select id="${id}">${App.modal.portOptions(items)}</select>
        </div>`;
    }
};
