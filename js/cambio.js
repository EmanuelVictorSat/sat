// Cotações ao vivo (AwesomeAPI). Se falhar, usa valores de referência.
const API_URL = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL";
const SPREAD = 0.01; // taxa de serviço simulada: 1%

const cotacoes = {
  USD: { compra: 5.4, venda: 5.38, variacao: 0 },
  EUR: { compra: 6.3, venda: 6.28, variacao: 0 },
};

let operacao = "compra";

const el = {
  form: document.getElementById("form-simulador"),
  moeda: document.getElementById("moeda"),
  quantidade: document.getElementById("quantidade"),
  resultado: document.getElementById("resultado"),
  status: document.getElementById("status"),
  botoesOp: document.querySelectorAll(".operacao-btn"),
};

const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const num = (v) => v.toLocaleString("pt-BR", { maximumFractionDigits: 2 });

function mostrarCotacoes() {
  ["USD", "EUR"].forEach((m) => {
    const id = m.toLowerCase();
    const c = cotacoes[m];
    document.getElementById("cotacao-" + id).textContent = brl(c.compra);

    const v = document.getElementById("var-" + id);
    const sinal = c.variacao > 0 ? "▲" : c.variacao < 0 ? "▼" : "";
    v.textContent = c.variacao ? `${sinal} ${num(Math.abs(c.variacao))}% hoje` : "";
    v.className = "cotacao-var " + (c.variacao > 0 ? "sobe" : c.variacao < 0 ? "desce" : "");
  });
}

async function carregarCotacoes() {
  try {
    const resp = await fetch(API_URL);
    if (!resp.ok) throw new Error("Falha na API");
    const d = await resp.json();

    [["USD", d.USDBRL], ["EUR", d.EURBRL]].forEach(([m, x]) => {
      cotacoes[m] = {
        compra: parseFloat(x.ask),
        venda: parseFloat(x.bid),
        variacao: parseFloat(x.pctChange),
      };
    });
    el.status.textContent = "Cotações atualizadas agora.";
  } catch (e) {
    el.status.textContent = "Não foi possível buscar a cotação ao vivo. Usando valores de referência.";
  }
  mostrarCotacoes();
  simular();
}

function simular() {
  const qtd = parseFloat(el.quantidade.value);

  if (el.quantidade.value === "") {
    el.resultado.className = "resultado";
    el.resultado.innerHTML = '<p class="resultado-vazio">Informe a quantidade para ver o resultado.</p>';
    return;
  }

  if (!(qtd > 0)) {
    el.resultado.className = "resultado erro";
    el.resultado.innerHTML = "<p>Digite uma quantidade maior que zero.</p>";
    return;
  }

  const moeda = el.moeda.value;
  const base = cotacoes[moeda][operacao];
  const taxa = operacao === "compra" ? base * (1 + SPREAD) : base * (1 - SPREAD);
  const total = qtd * taxa;

  const rotulo = operacao === "compra" ? "Você paga" : "Você recebe";

  el.resultado.className = "resultado";
  el.resultado.innerHTML = `
    <p class="resultado-rotulo">${rotulo}</p>
    <p class="resultado-total">${brl(total)}</p>
    <dl>
      <dt>Quantidade</dt><dd>${num(qtd)} ${moeda}</dd>
      <dt>Cotação</dt><dd>${brl(base)}</dd>
      <dt>Taxa de serviço (${SPREAD * 100}%)</dt><dd>${brl(Math.abs(qtd * (taxa - base)))}</dd>
      <dt>Cotação final</dt><dd>${brl(taxa)}</dd>
    </dl>
    <p class="aviso">Simulação sem valor contratual. Valores sujeitos a alteração.</p>
  `;
}

el.botoesOp.forEach((btn) => {
  btn.addEventListener("click", () => {
    operacao = btn.dataset.op;
    el.botoesOp.forEach((b) => {
      const ativo = b === btn;
      b.classList.toggle("ativo", ativo);
      b.setAttribute("aria-pressed", ativo);
    });
    simular();
  });
});

el.form.addEventListener("submit", (e) => {
  e.preventDefault();
  simular();
});
el.quantidade.addEventListener("input", simular);
el.moeda.addEventListener("change", simular);

mostrarCotacoes();
carregarCotacoes();