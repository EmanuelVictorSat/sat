
import { getSession, createLoanRequest } from "./storage.js";

const botao = document.querySelector("#solicitar-emprestimo");

botao?.addEventListener("click", () => {
  const sessao = getSession();

  if (!sessao) {
    alert("Entre na sua conta para solicitar um empréstimo.");
    window.location.href = "login.html";
    return;
  }

  const opcao = document.querySelector('input[name="valor"]:checked');

  const emprestimos = {
    "loan-10k": { valor: 10000, parcelas: 12, parcela: 950 },
    "loan-50k": { valor: 50000, parcelas: 24, parcela: 2800 },
    "loan-100k": { valor: 100000, parcelas: 48, parcela: 2900 },
  };

  const dados = emprestimos[opcao?.id];

  if (!dados) {
    alert("Selecione um valor de empréstimo.");
    return;
  }

  createLoanRequest({
    userId: sessao.id,
    ...dados,
  });

  alert("Solicitação registrada para demonstração.");
  window.location.href = "dashboard.html";
});
