# SAT — Exchange Bank

Sistema Web acadêmico para simulação de serviços financeiros, com foco em câmbio de moedas e empréstimos.

O SAT tem como objetivo reunir funcionalidades financeiras básicas em uma única plataforma, aplicando conceitos de Engenharia de Software e desenvolvimento Web.

> **Aviso:** Todas as operações são simuladas e não envolvem movimentação de dinheiro real.

## 1. Ideia, Objetivo Principal & Público-Alvo

O SAT — Exchange Bank é uma aplicação Web que permite simular operações financeiras, como conversão de moedas, consulta de saldos e empréstimos.

- **Objetivo:** desenvolver um sistema que aplique conceitos de programação, regras de negócio e persistência de dados.
- **Público-alvo:** estudantes e pessoas interessadas em conhecer operações financeiras básicas por meio de simulações.
- **Problema:** o controle manual de conversões e operações financeiras pode dificultar a organização dos dados e os cálculos.
- **Solução:** centralizar as principais operações em uma interface simples e organizada.

## 2. Benchmarking (Análise Comparativa)

| Funcionalidade | SAT | Wise | Nubank |
|---|---|---|---|
| Consulta de cotações | Sim | Sim | Conforme serviços disponíveis |
| Conversão de moedas | Simulação | Serviço real | Conforme serviços disponíveis |
| Consulta de saldos | Planejada | Sim | Sim |
| Empréstimos | Simulação | Não é o foco principal | Conforme produtos disponíveis |

O SAT tem finalidade acadêmica e não realiza operações financeiras reais.

Referências: [Wise](https://wise.com/) · [Nubank](https://nubank.com.br/)

## 3. Equipe

**Emanuel Victor Ribeiro Saturnino**

- **Matrícula:** 202524320013
- **GitHub:** [EmanuelVictorSat](https://github.com/EmanuelVictorSat)
- **LinkedIn:** pendente de inclusão.

Projeto desenvolvido individualmente.

## 4. Documentação & Recursos

- **Repositório:** [SAT — Exchange Bank](https://github.com/EmanuelVictorSat/sat)
- **Pitch:** pendente.
- **Protótipos:** pendentes.
- **Quadro Kanban:** [Disponível no Github projects](https://github.com/EmanuelVictorSat/sat/projects).
- **Documentação complementar:** a organizar na pasta `docs/`.

## 5. Páginas / Telas da Aplicação (GitHub Pages)

Telas existentes no projeto:

- [Página inicial](index.html)
- [Dashboard](dashboard.html)
- [Câmbio](cambio.html)
- [Empréstimos](emprestimos.html)


## 6. Funcionalidades Planejadas (Features)

-  Cadastro e login de clientes.
-  Consulta de cotações por meio da AwesomeAPI.
-  Cálculo de conversão de moedas na tela de câmbio.
-  Simulação de operações entre BRL e USD.
-  Consulta e atualização de saldos simulados.
-  Registro e consulta do histórico de operações.
-  Simulação de empréstimos e cálculo de parcelas.
-  Acompanhamento e pagamento simulado de parcelas.

## 7. Estratégia para Obtenção de Dados Reais (Hipóteses Técnicas)

O sistema utiliza a **AwesomeAPI** para consultar cotações de moedas na funcionalidade de câmbio.

Para a evolução do projeto, estão previstas as seguintes possibilidades:

- Utilização de API externa para obter cotações atualizadas.
- Importação de arquivos CSV para testes e simulações.
- Uso inicial de arquivos JSON para persistência, caso necessário.
- Avaliação do Supabase para armazenamento estruturado de dados.

As operações e os saldos serão fictícios, mesmo quando forem utilizadas cotações reais.

## 8. Tecnologias

- **HTML, CSS e JavaScript:** interface e interatividade.
- **Vite:** ferramenta de desenvolvimento.
- **Python:** backend planejado.
- **AwesomeAPI:** consulta de cotações.
- **JSON / Supabase:** alternativas de persistência a serem definidas conforme a evolução do projeto.

---

**Projeto acadêmico de Engenharia de Software.** Todas as operações financeiras são simuladas.