import { getSession } from "./storage.js";

const botao = document.querySelector("#solicitar-emprestimo");

botao?.addEventListener("click", () => {
  const sessao = getSession();

  if (!sessao) {
    const cadastrar = confirm(
      "Você precisa ter uma conta para solicitar um empréstimo. Deseja se cadastrar agora?"
    );

    if (cadastrar) {
      window.location.href = "cadastro.html";
    } else {
      window.location.href = "login.html";
    }

    return;
  }

  alert("Você está conectado e pode continuar com a solicitação.");
});