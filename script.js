const rowsEl =
    document.getElementById("rows");

const qtd =
    document.getElementById("qtd");

const modalBackdrop =
    document.getElementById("modalBackdrop");

const modalTitle =
    document.getElementById("modalTitle");

const modalContent =
    document.getElementById("modalContent");

const sidebar =
    document.getElementById("sidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");

const savedBoxes =
    document.getElementById("savedBoxes");


let modalAction = null;

const STORAGE_KEY =
    "even_mapa_portas_caixas";


for (
    let i = 1;
    i <= 32;
    i++
) {

    const option =
        document.createElement("option");

    option.value = i;

    option.textContent = i;

    qtd.appendChild(option);

}


qtd.value = 8;


function makeRow(i) {

    const row =
        document.createElement("div");


    row.className =
        "port-row";


    row.dataset.port =
        i;


    row.innerHTML = `

        <div class="port-number">
            ${i}
        </div>

        <input
            class="casa"
            type="text"
            aria-label="Casa porta ${i}"
        >

        <input
            class="codigo"
            type="text"
            aria-label="Código porta ${i}"
        >

        <select
            class="status"
            data-status="Indefinido"
        >

            <option>
                Indefinido
            </option>

            <option>
                Ativo
            </option>

            <option>
                Inativo
            </option>

        </select>

    `;


    const status =
        row.querySelector(".status");


    status.addEventListener(
        "change",
        () => {

            status.dataset.status =
                status.value;

        }
    );


    return row;

}


function rows() {

    return [
        ...rowsEl.querySelectorAll(
            ".port-row"
        )
    ];

}


function renderRows() {

    const oldData =
        rows().map(row => ({

            casa:
                row.querySelector(
                    ".casa"
                ).value,

            codigo:
                row.querySelector(
                    ".codigo"
                ).value,

            status:
                row.querySelector(
                    ".status"
                ).value

        }));


    rowsEl.innerHTML = "";


    const quantidade =
        Number(qtd.value);


    for (
        let i = 1;
        i <= quantidade;
        i++
    ) {

        const row =
            makeRow(i);


        if (
            oldData[i - 1]
        ) {

            row.querySelector(
                ".casa"
            ).value =
                oldData[i - 1].casa;


            row.querySelector(
                ".codigo"
            ).value =
                oldData[i - 1].codigo;


            row.querySelector(
                ".status"
            ).value =
                oldData[i - 1].status;


            row.querySelector(
                ".status"
            ).dataset.status =
                oldData[i - 1].status;

        }


        rowsEl.appendChild(
            row
        );

    }

}


qtd.addEventListener(
    "change",
    renderRows
);


renderRows();


function openSidebar() {

    sidebar.classList.add(
        "open"
    );

    sidebarOverlay.classList.add(
        "show"
    );

}


function closeSidebar() {

    sidebar.classList.remove(
        "open"
    );

    sidebarOverlay.classList.remove(
        "show"
    );

}


document
    .getElementById("menuBtn")
    .addEventListener(
        "click",
        openSidebar
    );


document
    .getElementById("closeSidebar")
    .addEventListener(
        "click",
        closeSidebar
    );


sidebarOverlay.addEventListener(
    "click",
    closeSidebar
);



const savedTheme =
    localStorage.getItem(
        "even_theme"
    );


if (
    savedTheme === "dark"
) {

    document.body.classList.add(
        "dark"
    );


    document.getElementById(
        "themeBtn"
    ).textContent =
        "☀";

}


document
    .getElementById("themeBtn")
    .addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark"
            );


            const dark =
                document.body.classList.contains(
                    "dark"
                );


            document.getElementById(
                "themeBtn"
            ).textContent =
                dark
                    ? "☀"
                    : "☾";


            localStorage.setItem(
                "even_theme",
                dark
                    ? "dark"
                    : "light"
            );

        }
    );



function openModal(
    title,
    html,
    fn
) {

    modalTitle.textContent =
        title;


    modalContent.innerHTML =
        html;


    modalAction =
        fn;


    modalBackdrop.classList.add(
        "show"
    );

}


function closeModal() {

    modalBackdrop.classList.remove(
        "show"
    );


    modalAction = null;

}


document
    .getElementById("cancelModal")
    .onclick =
    closeModal;


document
    .getElementById("confirmModal")
    .onclick =
    () => {

        if (
            modalAction
        ) {

            modalAction();

        }

    };


function getData() {

    return {

        pon:
            document.getElementById(
                "pon"
            ).value.trim(),

        caixa:
            document.getElementById(
                "caixa"
            ).value.trim(),

        equipe:
            document.getElementById(
                "equipe"
            ).value.trim(),

        endereco:
            document.getElementById(
                "endereco"
            ).value.trim(),

        quantidade:
            Number(
                qtd.value
            ),

        portas:

            rows().map(
                row => ({

                    porta:
                        Number(
                            row.dataset.port
                        ),

                    casa:
                        row.querySelector(
                            ".casa"
                        ).value.trim(),

                    codigo:
                        row.querySelector(
                            ".codigo"
                        ).value.trim(),

                    status:
                        row.querySelector(
                            ".status"
                        ).value

                })
            )

    };

}


function loadData(data) {

    document.getElementById(
        "pon"
    ).value =
        data.pon || "";


    document.getElementById(
        "caixa"
    ).value =
        data.caixa || "";


    document.getElementById(
        "equipe"
    ).value =
        data.equipe || "";


    document.getElementById(
        "endereco"
    ).value =
        data.endereco || "";


    qtd.value =
        data.quantidade || 8;


    rowsEl.innerHTML = "";


    for (
        let i = 1;
        i <= Number(qtd.value);
        i++
    ) {

        const row =
            makeRow(i);


        const saved =
            data.portas.find(
                p =>
                    Number(
                        p.porta
                    ) === i
            );


        if (saved) {

            row.querySelector(
                ".casa"
            ).value =
                saved.casa || "";


            row.querySelector(
                ".codigo"
            ).value =
                saved.codigo || "";


            row.querySelector(
                ".status"
            ).value =
                saved.status ||
                "Indefinido";


            row.querySelector(
                ".status"
            ).dataset.status =
                saved.status ||
                "Indefinido";

        }


        rowsEl.appendChild(
            row
        );

    }


    generateText();

}


function getSavedBoxes() {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (!saved) {

            return [];

        }


        const parsed =
            JSON.parse(
                saved
            );


        return Array.isArray(
            parsed
        )
            ? parsed
            : [];

    } catch (
        error
    ) {

        console.error(
            "Erro ao ler caixas:",
            error
        );

        return [];

    }

}


function saveBoxes(
    boxes
) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
            boxes
        )
    );

}


function saveCurrentBox() {

    const data =
        getData();


    if (!data.caixa) {

        alert(
            "Informe o nome ou número da Caixa antes de salvar."
        );


        document
            .getElementById(
                "caixa"
            )
            .focus();


        return;

    }


    const boxes =
        getSavedBoxes();


    const existingIndex =
        boxes.findIndex(
            box =>
                String(
                    box.caixa
                ).toLowerCase() ===
                String(
                    data.caixa
                ).toLowerCase()
        );


    if (
        existingIndex !== -1
    ) {

        const confirmar =
            confirm(
                `A caixa "${data.caixa}" já está salva. Deseja atualizar os dados dela?`
            );


        if (!confirmar) {

            return;

        }


        data.id =
            boxes[
                existingIndex
            ].id;


        data.updatedAt =
            new Date()
                .toISOString();


        boxes[
            existingIndex
        ] =
            data;

    } else {

        data.id =
            Date.now()
                .toString();


        data.updatedAt =
            new Date()
                .toISOString();


        boxes.push(
            data
        );

    }


    saveBoxes(
        boxes
    );


    renderSavedBoxes();


    alert(
        "Caixa salva com sucesso!"
    );

}


function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


function renderSavedBoxes() {

    const boxes =
        getSavedBoxes();


    savedBoxes.innerHTML =
        "";


    if (
        !boxes.length
    ) {

        savedBoxes.innerHTML = `

            <div
                style="
                    padding:20px 10px;
                    text-align:center;
                    color:var(--muted);
                    font-size:13px;
                "
            >

                Nenhuma caixa salva ainda.

                <br><br>

                Clique em
                <strong>
                    Salvar caixa
                </strong>
                para armazenar uma caixa.

            </div>

        `;


        return;

    }


    boxes.sort(
        (
            a,
            b
        ) =>

            String(
                a.caixa
            ).localeCompare(
                String(
                    b.caixa
                ),
                "pt-BR",
                {
                    numeric:
                        true
                }
            )

    );


    boxes.forEach(
        box => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "saved-box";


            const dataAtual =
                box.updatedAt
                    ? new Date(
                        box.updatedAt
                    ).toLocaleString(
                        "pt-BR"
                    )
                    : "-";


            item.innerHTML = `

                <div
                    class="saved-box-main"
                    data-action="load"
                    data-id="${escapeHTML(
                        box.id
                    )}"
                >

                    <div class="saved-box-name">

                        Caixa:
                        ${escapeHTML(
                            box.caixa
                        )}

                    </div>


                    <div class="saved-box-info">

                        PON:
                        ${escapeHTML(
                            box.pon ||
                            "-"
                        )}

                        <br>

                        ${Number(
                            box.quantidade ||
                            0
                        )}
                        porta(s)

                        <br>

                        Atualizada:
                        ${escapeHTML(
                            dataAtual
                        )}

                    </div>

                </div>


                <div
                    class="saved-box-actions"
                >

                    <button
                        data-action="load"
                        data-id="${escapeHTML(
                            box.id
                        )}"
                    >
                        Abrir
                    </button>


                    <button
                        class="delete"
                        data-action="delete"
                        data-id="${escapeHTML(
                            box.id
                        )}"
                    >
                        Excluir
                    </button>

                </div>

            `;


            savedBoxes.appendChild(
                item
            );

        }
    );

}


savedBoxes.addEventListener(
    "click",
    event => {

        const target =
            event.target.closest(
                "[data-action]"
            );


        if (!target) {

            return;

        }


        const action =
            target.dataset.action;


        const id =
            target.dataset.id;


        const boxes =
            getSavedBoxes();


        const index =
            boxes.findIndex(
                box =>
                    String(
                        box.id
                    ) ===
                    String(
                        id
                    )
            );


        if (
            index === -1
        ) {

            return;

        }


        if (
            action === "load"
        ) {

            loadData(
                boxes[index]
            );


            closeSidebar();

        }


        if (
            action === "delete"
        ) {

            const confirmar =
                confirm(
                    `Deseja excluir a caixa "${boxes[index].caixa}"?`
                );


            if (!confirmar) {

                return;

            }


            boxes.splice(
                index,
                1
            );


            saveBoxes(
                boxes
            );


            renderSavedBoxes();

        }

    }
);


document
    .getElementById(
        "newBoxBtn"
    )
    .addEventListener(
        "click",
        () => {

            const confirmar =
                confirm(
                    "Criar uma nova caixa? Os dados atuais não salvos serão apagados."
                );


            if (!confirmar) {

                return;

            }


            document.getElementById(
                "pon"
            ).value =
                "";


            document.getElementById(
                "caixa"
            ).value =
                "";


            document.getElementById(
                "equipe"
            ).value =
                "";


            document.getElementById(
                "endereco"
            ).value =
                "";


            qtd.value =
                8;


            rowsEl.innerHTML =
                "";


            renderRows();


            document.getElementById(
                "resultado"
            ).value =
                "";


            document
                .getElementById(
                    "output"
                )
                .classList
                .remove(
                    "show"
                );


            closeSidebar();

        }
    );


document
    .getElementById(
        "salvarBtn"
    )
    .addEventListener(
        "click",
        saveCurrentBox
    );


function selectHtml(
    id,
    items,
    label
) {

    return `

        <div class="field">

            <label for="${id}">
                ${label}:
            </label>

            <select id="${id}">

                ${items.map(
                    row => `

                    <option
                        value="${row.dataset.port}"
                    >

                        Porta
                        ${row.dataset.port}
                        —
                        ${
                            escapeHTML(
                                row.querySelector(
                                    ".casa"
                                ).value ||
                                "sem cliente"
                            )
                        }

                    </option>

                `
                ).join("")}

            </select>

        </div>

    `;

}


document
    .getElementById(
        "remanejarBtn"
    )
    .onclick =
    () => {

        const active =
            rows().filter(
                row =>
                    row.querySelector(
                        ".status"
                    ).value ===
                    "Ativo"
            );


        const free =
            rows().filter(
                row =>
                    [
                        "Inativo",
                        "Indefinido"
                    ].includes(
                        row.querySelector(
                            ".status"
                        ).value
                    )
            );


        if (
            !active.length ||
            !free.length
        ) {

            alert(
                "É necessário ter pelo menos uma porta Ativa e uma porta Inativa ou Indefinida."
            );


            return;

        }


        openModal(

            "Remanejar cliente",

            selectHtml(
                "from",
                active,
                "Cliente atual"
            )

            +

            selectHtml(
                "to",
                free,
                "Nova porta"
            )

            +

            `
                <div class="hint">

                    O cliente será movido
                    para a porta escolhida.

                    A porta antiga ficará
                    como Indefinida.

                </div>
            `,

            () => {

                const origem =
                    rowsEl.querySelector(
                        `[data-port="${document.getElementById("from").value}"]`
                    );


                const destino =
                    rowsEl.querySelector(
                        `[data-port="${document.getElementById("to").value}"]`
                    );


                destino.querySelector(
                    ".casa"
                ).value =
                    origem.querySelector(
                        ".casa"
                    ).value;


                destino.querySelector(
                    ".codigo"
                ).value =
                    origem.querySelector(
                        ".codigo"
                    ).value;


                destino.querySelector(
                    ".status"
                ).value =
                    "Ativo";


                destino.querySelector(
                    ".status"
                ).dataset.status =
                    "Ativo";


                origem.querySelector(
                    ".casa"
                ).value =
                    "";


                origem.querySelector(
                    ".codigo"
                ).value =
                    "";


                origem.querySelector(
                    ".status"
                ).value =
                    "Indefinido";


                origem.querySelector(
                    ".status"
                ).dataset.status =
                    "Indefinido";


                closeModal();


                generateText();

            }

        );

    };


document
    .getElementById(
        "trocarBtn"
    )
    .onclick =
    () => {

        const active =
            rows().filter(
                row =>
                    row.querySelector(
                        ".status"
                    ).value ===
                    "Ativo"
            );


        if (
            active.length < 2
        ) {

            alert(
                "É necessário ter pelo menos dois clientes Ativos para realizar a troca."
            );


            return;

        }


        openModal(

            "Trocar clientes",

            selectHtml(
                "a",
                active,
                "Primeiro cliente"
            )

            +

            selectHtml(
                "b",
                active.slice(1),
                "Segundo cliente"
            ),

            () => {

                const a =
                    rowsEl.querySelector(
                        `[data-port="${document.getElementById("a").value}"]`
                    );


                const b =
                    rowsEl.querySelector(
                        `[data-port="${document.getElementById("b").value}"]`
                    );


                const casaA =
                    a.querySelector(
                        ".casa"
                    ).value;


                const codigoA =
                    a.querySelector(
                        ".codigo"
                    ).value;


                a.querySelector(
                    ".casa"
                ).value =
                    b.querySelector(
                        ".casa"
                    ).value;


                a.querySelector(
                    ".codigo"
                ).value =
                    b.querySelector(
                        ".codigo"
                    ).value;


                b.querySelector(
                    ".casa"
                ).value =
                    casaA;


                b.querySelector(
                    ".codigo"
                ).value =
                    codigoA;


                closeModal();


                generateText();

            }

        );

    };



function generateText() {

    const data =
        getData();


    let texto =

`PON: ${data.pon}
Caixa: ${data.caixa}
Equipe Técnica: ${data.equipe}
Endereço: ${data.endereco}
Quantidade de Portas: ${data.quantidade}

PORTA | CASA | CÓDIGO | STATUS
--------------------------------------------------
`;


    data.portas.forEach(
        porta => {

            texto +=
`${porta.porta} | ${porta.casa} | ${porta.codigo} | ${porta.status}
`;

        }
    );


    document.getElementById(
        "resultado"
    ).value =
        texto;


    document
        .getElementById(
            "output"
        )
        .classList
        .add(
            "show"
        );


    return texto;

}


document
    .getElementById(
        "gerarBtn"
    )
    .onclick =
    generateText;

function download(
    nome,
    conteudo,
    tipo
) {

    const blob =
        new Blob(
            [
                conteudo
            ],
            {
                type:
                    tipo
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        nome;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    setTimeout(
        () => {

            URL.revokeObjectURL(
                url
            );

        },
        500
    );

}


function csvEscape(
    value
) {

    const stringValue =
        String(
            value ?? ""
        );


    return `"${stringValue
        .replaceAll(
            '"',
            '""'
        )
        .replace(
            /\r?\n/g,
            " "
        )}"`;

}


document
    .getElementById(
        "csvBtn"
    )
    .onclick =
    () => {

        const data =
            getData();


        const linhas = [];


        linhas.push([
            "PON",
            "Caixa",
            "Equipe Técnica",
            "Endereço",
            "Quantidade de Portas"
        ]);


        linhas.push([
            data.pon,
            data.caixa,
            data.equipe,
            data.endereco,
            data.quantidade
        ]);


        linhas.push([]);


        linhas.push([
            "Porta",
            "Casa",
            "Código",
            "Status"
        ]);




        data.portas.forEach(
            porta => {

                linhas.push([
                    porta.porta,
                    porta.casa,
                    porta.codigo,
                    porta.status
                ]);

            }
        );



        const csv =
            linhas
                .map(
                    linha =>
                        linha
                            .map(
                                csvEscape
                            )
                            .join(";")
                )
                .join(
                    "\r\n"
                );



        download(
            "mapa_portas.csv",
            "\ufeff" + csv,
            "text/csv;charset=utf-8"
        );

    };


document
    .getElementById(
        "txtBtn"
    )
    .onclick =
    () => {

        download(

            "mapa_portas.txt",

            generateText(),

            "text/plain;charset=utf-8"

        );

    };



document
    .getElementById(
        "pngBtn"
    )
    .onclick =
    async () => {

        if (
            typeof html2canvas ===
            "undefined"
        ) {

            alert(
                "Não foi possível carregar a biblioteca de exportação PNG."
            );


            return;

        }


        if (
            !document
                .getElementById(
                    "output"
                )
                .classList
                .contains(
                    "show"
                )
        ) {

            generateText();

        }


        const area =
            document.getElementById(
                "captureArea"
            );


        try {

            const canvas =
                await html2canvas(
                    area,
                    {

                        backgroundColor:
                            getComputedStyle(
                                document.body
                            )
                            .getPropertyValue(
                                "--panel"
                            )
                            .trim(),

                        scale:
                            2

                    }
                );


            canvas.toBlob(
                blob => {

                    if (!blob) {

                        alert(
                            "Não foi possível gerar o PNG."
                        );

                        return;

                    }


                    const url =
                        URL.createObjectURL(
                            blob
                        );


                    const link =
                        document.createElement(
                            "a"
                        );


                    link.href =
                        url;


                    link.download =
                        "mapa_portas.png";


                    document.body.appendChild(
                        link
                    );


                    link.click();


                    link.remove();


                    setTimeout(
                        () => {

                            URL.revokeObjectURL(
                                url
                            );

                        },
                        500
                    );

                },
                "image/png"
            );


        } catch (
            error
        ) {

            console.error(
                error
            );


            alert(
                "Erro ao gerar o PNG."
            );

        }

    };


document
    .getElementById(
        "pdfBtn"
    )
    .onclick =
    () => {

        if (
            !window.jspdf ||
            !window.jspdf.jsPDF
        ) {

            alert(
                "Não foi possível carregar a biblioteca de PDF."
            );


            return;

        }


        const data =
            getData();


        const {
            jsPDF
        } =
            window.jspdf;


        const doc =
            new jsPDF({

                orientation:
                    "landscape",

                unit:
                    "mm",

                format:
                    "a4"

            });


        doc.setFontSize(
            18
        );


        doc.text(
            "Mapa de Portas - Even Telecom",
            14,
            16
        );


        doc.setFontSize(
            10
        );


        doc.text(
            `PON: ${data.pon || "-"}`,
            14,
            25
        );


        doc.text(
            `Caixa: ${data.caixa || "-"}`,
            14,
            31
        );


        doc.text(
            `Equipe Técnica: ${data.equipe || "-"}`,
            14,
            37
        );


        doc.text(
            `Endereço: ${data.endereco || "-"}`,
            14,
            43
        );


        doc.text(
            `Quantidade de Portas: ${data.quantidade}`,
            14,
            49
        );


        const tableData =
            data.portas.map(
                porta => [

                    porta.porta,

                    porta.casa,

                    porta.codigo,

                    porta.status

                ]
            );


        doc.autoTable({

            startY:
                55,

            head: [[

                "Porta",

                "Casa",

                "Código",

                "Status"

            ]],

            body:
                tableData,

            theme:
                "grid",

            styles: {

                fontSize:
                    9,

                cellPadding:
                    3

            },

            headStyles: {

                fillColor:
                    [36, 105, 173],

                textColor:
                    [255, 255, 255],

                fontStyle:
                    "bold"

            },

            alternateRowStyles: {

                fillColor:
                    [245, 247, 250]

            },

            columnStyles: {

                0: {

                    cellWidth:
                        25

                },

                1: {

                    cellWidth:
                        80

                },

                2: {

                    cellWidth:
                        70

                },

                3: {

                    cellWidth:
                        40

                }

            }

        });


        /*
            Data de geração
        */

        const agora =
            new Date()
                .toLocaleString(
                    "pt-BR"
                );


        const finalY =
            doc.lastAutoTable
                ? doc.lastAutoTable.finalY + 10
                : 70;


        doc.setFontSize(
            8
        );


        doc.text(
            `Gerado em: ${agora}`,
            14,
            finalY
        );


        let nomeCaixa =
            data.caixa
                ? data.caixa
                    .replace(
                        /[^a-z0-9_-]/gi,
                        "_"
                    )
                : "mapa_portas";


        if (!nomeCaixa) {

            nomeCaixa =
                "mapa_portas";

        }


        doc.save(
            `${nomeCaixa}.pdf`
        );

    };


renderSavedBoxes();