# Mapeamento de Portas — Even Telecom

Sistema web para organização, mapeamento e gerenciamento de portas de caixas de atendimento.

## Sobre o projeto

O Mapeamento de Portas é uma aplicação web que facilita o controle das portas das caixas de atendimento da rede. Com ela é possível registrar quais portas estão livres, ativas ou inativas, o que ajuda durante instalações, manutenções e ativações de clientes.

Funciona direto no navegador, sem instalação e sem servidor.

## Funcionalidades

### Cadastro de caixas
- Cada caixa é identificada por **PON + número da caixa + mês**
- O mês é obtido automaticamente a partir da data em que a caixa é salva
- A mesma caixa pode ser salva várias vezes, em meses diferentes
- Dados salvos no próprio navegador (LocalStorage)

### Formulário
- PON e Caixa
- Equipe Técnica (seleção): F41, F28, C64, C75, B13 e B02
- Quantidade de portas: 8 (padrão) ou 16
- Endereço

### Mapeamento de portas
Cada porta possui os campos Casa, Código e Status:

| Status  | Significado                     |
|---------|---------------------------------|
| Livre   | Porta disponível                |
| Ativo   | Porta em uso por um cliente     |
| Inativo | Porta com cliente desativado    |

### Menu lateral
- Caixas salvas agrupadas por mês, do mais recente para o mais antigo
- Mostra PON, caixa, equipe, quantidade de portas ativas e data da última atualização
- Abrir e excluir caixas salvas
- Botão para iniciar uma nova caixa

### Remanejar e trocar
- **Remanejar**: move o cliente de uma porta Ativa para uma porta Livre ou Inativa. A porta antiga fica como Livre.
- **Trocar**: troca de lugar os clientes de duas portas Ativas.

### Exportação
- **Gerar texto**: resumo da caixa na tela
- **TXT**, **CSV**, **PNG** e **PDF**
- Todos os arquivos trazem a data completa de geração

### Atalhos para o Hubsoft
- Localizar cliente
- Mapeamento
- POP

### Outros
- Tema claro e escuro
- Interface responsiva (computador, notebook e celular)

## Tecnologias

- HTML5
- CSS3
- JavaScript (sem frameworks)
- LocalStorage para armazenamento local
- html2canvas e jsPDF (carregados apenas quando o usuário exporta PNG ou PDF)

## Estrutura do projeto

```
mapeamento-portas/
├── index.html
├── README.md
├── assets/
│   └── img/
│       └── logo-even.png
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── sidebar.css
│   └── responsive.css
└── js/
    ├── main.js
    ├── config/
    │   └── constants.js
    ├── utils/
    │   └── format.js
    ├── services/
    │   ├── storage.js
    │   ├── loader.js
    │   └── download.js
    ├── components/
    │   ├── theme.js
    │   ├── modal.js
    │   ├── ports.js
    │   ├── form.js
    │   └── sidebar.js
    └── features/
        ├── report.js
        ├── boxes.js
        ├── relocate.js
        ├── swap.js
        ├── export-csv.js
        ├── export-txt.js
        ├── export-png.js
        └── export-pdf.js
```

## Observações

- Os dados ficam salvos apenas no navegador e no computador em que foram cadastrados. Limpar os dados do navegador apaga as caixas salvas.
- Caixas salvas em versões anteriores são migradas automaticamente, e o status "Indefinido" passa a ser "Livre".

**Versão 2.1**
