App.exporters.png = async function () {
    try {
        await App.loader.load("html2canvas");
    } catch (error) {
        alert("Não foi possível carregar a biblioteca de exportação PNG.");
        return;
    }

    if (!App.form.el.output.classList.contains("show")) {
        App.report.generate();
    }

    try {
        const canvas = await html2canvas(document.getElementById("captureArea"), {
            backgroundColor: getComputedStyle(document.body).getPropertyValue("--panel").trim(),
            scale: 2
        });

        canvas.toBlob(blob => {
            if (!blob) {
                alert("Não foi possível gerar o PNG.");
                return;
            }
            App.download("mapa_portas.png", blob);
        }, "image/png");
    } catch (error) {
        console.error(error);
        alert("Erro ao gerar o PNG.");
    }
};
