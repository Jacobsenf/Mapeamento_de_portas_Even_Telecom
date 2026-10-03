document.addEventListener("DOMContentLoaded", () => {
    App.theme.init();
    App.modal.init();
    App.ports.init();
    App.form.init();
    App.sidebar.init();
    App.report.init();
    App.boxes.init();
    App.relocate.init();
    App.swap.init();

    document.getElementById("csvBtn").addEventListener("click", App.exporters.csv);
    document.getElementById("txtBtn").addEventListener("click", App.exporters.txt);
    document.getElementById("pngBtn").addEventListener("click", App.exporters.png);
    document.getElementById("pdfBtn").addEventListener("click", App.exporters.pdf);

    App.sidebar.render();
});
