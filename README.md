<div align="center">

# Mapeamento de Portas — Even Telecom

<img src="https://evenfibra.com.br/assets/logos/even-navy.png" alt="EVEN Telecom" width="300">

<a href="https://eventelecom.com.br/">
  <img src="https://eventelecom.com.br/images/logo-even.png" alt="Even Telecom" width="280">
</a>

### Sistema web para organização, mapeamento e gerenciamento de portas de caixas de atendimento

</div>

---

##  Sobre o projeto

O **Mapeamento de Portas — Even Telecom** é uma aplicação web desenvolvida para facilitar a organização e o controle das portas disponíveis nas caixas de atendimento da rede.

A ferramenta permite visualizar as caixas, identificar suas respectivas portas e registrar quais portas já foram utilizadas, facilitando o controle durante instalações, manutenções e ativações de clientes.

O sistema foi desenvolvido para ser simples, rápido e intuitivo, podendo ser utilizado diretamente pelo navegador.

---

##  Funcionalidades

### Cadastro de caixas

É possível cadastrar e organizar diferentes caixas utilizadas no mapeamento da rede.

Cada caixa pode possuir suas próprias informações e portas disponíveis.

### Mapeamento de portas

O sistema permite registrar as portas existentes em cada caixa e identificar quais delas já foram utilizadas.

Isso facilita o acompanhamento da ocupação da caixa sem a necessidade de controles externos.

### Salvamento das caixas

As caixas cadastradas ficam armazenadas no próprio navegador.

Dessa forma, ao fechar ou atualizar a página, os dados permanecem disponíveis para utilização posterior.

### Organização lateral

A aplicação possui uma aba lateral destinada ao gerenciamento das caixas cadastradas.

Nela é possível:

- Visualizar caixas salvas;
- Selecionar uma caixa;
- Consultar suas portas;
- Acompanhar a ocupação;
- Acessar rapidamente diferentes caixas.

### Identificação visual

As portas possuem indicação visual para facilitar a identificação do seu estado.

Isso permite verificar rapidamente quais portas estão:

- 🟢 Disponíveis;
- 🔴 Ocupadas;
- ⚪ Sem informação ou ainda não mapeadas.

### Controle de ocupação

O sistema facilita a visualização da quantidade de portas utilizadas e disponíveis em cada caixa.

Isso permite ter uma visão rápida da situação da caixa durante o atendimento.

### Interface responsiva

A interface foi desenvolvida para funcionar em diferentes tamanhos de tela, podendo ser utilizada em computadores, notebooks e outros dispositivos compatíveis.

---

## Tecnologias utilizadas

O projeto utiliza tecnologias web simples e leves:

- **HTML5** — Estrutura da aplicação;
- **CSS3** — Estilização e interface;
- **JavaScript** — Lógica e funcionalidades;
- **LocalStorage** — Armazenamento local das caixas e informações cadastradas.

---

## Estrutura do projeto

```text
mapeamento-portas/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   └── logo.png
│
└── README.md
