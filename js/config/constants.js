window.App = {};

App.config = {
    STORAGE_KEY: "even_mapa_portas_v2",
    LEGACY_STORAGE_KEY: "even_mapa_portas_caixas",
    THEME_KEY: "even_theme",
    PORT_OPTIONS: [8, 16],
    DEFAULT_PORTS: 8,
    STATUS: {
        LIVRE: "Livre",
        ATIVO: "Ativo",
        INATIVO: "Inativo"
    },
    STATUS_LIST: ["Livre", "Ativo", "Inativo"],
    LEGACY_STATUS: {
        Indefinido: "Livre"
    },
    TEAMS: ["F41", "F28", "C64", "C75", "B13", "B02"],
    LIBS: {
        html2canvas: [
            "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"
        ],
        jspdf: [
            "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js"
        ]
    }
};
