App.storage = {
    makeId(pon, caixa, mes) {
        const clean = value => String(value || "").trim().toLowerCase().replace(/\s+/g, " ");
        return [mes, clean(pon), clean(caixa)].join("|");
    },

    read(key) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw) {
                return null;
            }
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : null;
        } catch (error) {
            console.error("Erro ao ler caixas:", error);
            return null;
        }
    },

    normalizeBox(box) {
        const mes = box.mes || (box.updatedAt
            ? App.format.monthFromISO(box.updatedAt)
            : App.format.currentMonth());

        const portas = Array.isArray(box.portas)
            ? box.portas.map(porta => ({
                ...porta,
                status: App.format.normalizeStatus(porta.status)
            }))
            : [];

        return {
            ...box,
            mes,
            portas,
            id: App.storage.makeId(box.pon, box.caixa, mes)
        };
    },

    dedupe(boxes) {
        const map = new Map();
        boxes.forEach(box => {
            const current = map.get(box.id);
            if (!current || String(box.updatedAt) > String(current.updatedAt)) {
                map.set(box.id, box);
            }
        });
        return [...map.values()];
    },

    getBoxes() {
        const stored = App.storage.read(App.config.STORAGE_KEY);
        if (stored) {
            return stored;
        }

        const legacy = App.storage.read(App.config.LEGACY_STORAGE_KEY);
        if (!legacy) {
            return [];
        }

        const migrated = App.storage.dedupe(legacy.map(App.storage.normalizeBox));
        App.storage.saveBoxes(migrated);
        return migrated;
    },

    saveBoxes(boxes) {
        localStorage.setItem(App.config.STORAGE_KEY, JSON.stringify(boxes));
    },

    getTheme() {
        return localStorage.getItem(App.config.THEME_KEY);
    },

    setTheme(theme) {
        localStorage.setItem(App.config.THEME_KEY, theme);
    }
};
