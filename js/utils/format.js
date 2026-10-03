App.format = {
    escapeHTML(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    },

    currentMonth() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    },

    today() {
        return new Date().toLocaleDateString("pt-BR");
    },

    monthFromISO(iso) {
        const date = new Date(iso);
        if (Number.isNaN(date.getTime())) {
            return App.format.currentMonth();
        }
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    },

    monthLabel(key) {
        if (!key) {
            return "-";
        }
        const [year, month] = key.split("-").map(Number);
        const label = new Date(year, month - 1, 1).toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric"
        });
        return label.charAt(0).toUpperCase() + label.slice(1);
    },

    dateTime(iso) {
        return iso ? new Date(iso).toLocaleString("pt-BR") : "-";
    },

    fileName(value, fallback) {
        const clean = String(value || "").replace(/[^a-z0-9_-]/gi, "_").replace(/^_+|_+$/g, "");
        return clean || fallback;
    },

    normalizeStatus(status) {
        const config = App.config;
        if (config.LEGACY_STATUS[status]) {
            return config.LEGACY_STATUS[status];
        }
        return config.STATUS_LIST.includes(status) ? status : config.STATUS.LIVRE;
    }
};
