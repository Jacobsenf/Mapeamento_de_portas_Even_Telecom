App.boxes = {
    init() {
        document.getElementById("salvarBtn").addEventListener("click", App.boxes.save);
        document.getElementById("newBoxBtn").addEventListener("click", App.boxes.createNew);
    },

    save() {
        const data = App.form.getData();

        if (!data.pon) {
            alert("Informe a PON antes de salvar.");
            App.form.focus("pon");
            return;
        }

        if (!data.caixa) {
            alert("Informe o número da Caixa antes de salvar.");
            App.form.focus("caixa");
            return;
        }

        data.id = App.storage.makeId(data.pon, data.caixa, data.mes);

        const boxes = App.storage.getBoxes();
        const index = boxes.findIndex(box => box.id === data.id);

        if (index !== -1) {
            const message = `A caixa ${data.caixa} da PON ${data.pon} já está salva em ${App.format.monthLabel(data.mes)}. Deseja atualizar os dados dela?`;
            if (!confirm(message)) {
                return;
            }
        }

        data.updatedAt = new Date().toISOString();

        if (index !== -1) {
            boxes[index] = data;
        } else {
            boxes.push(data);
        }

        App.storage.saveBoxes(boxes);
        App.sidebar.openMonths.add(data.mes);
        App.sidebar.render();

        alert("Caixa salva com sucesso!");
    },

    load(id) {
        const box = App.storage.getBoxes().find(item => item.id === id);
        if (!box) {
            return;
        }

        App.form.setData(box);
        App.report.generate();
        App.sidebar.close();
    },

    remove(id) {
        const boxes = App.storage.getBoxes();
        const index = boxes.findIndex(box => box.id === id);
        if (index === -1) {
            return;
        }

        const box = boxes[index];
        const message = `Deseja excluir a caixa ${box.caixa} da PON ${box.pon} (${App.format.monthLabel(box.mes)})?`;
        if (!confirm(message)) {
            return;
        }

        boxes.splice(index, 1);
        App.storage.saveBoxes(boxes);
        App.sidebar.render();
    },

    createNew() {
        if (!confirm("Criar uma nova caixa? Os dados atuais não salvos serão apagados.")) {
            return;
        }

        App.form.reset();
        App.sidebar.close();
    }
};
