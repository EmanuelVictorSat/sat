
import { login } from "./storage.js";

const form = document.querySelector("#form-login");
const alerta = document.querySelector("#alerta");

if (form && alerta) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const dados = new FormData(form);
    const cpf = dados.get("cpf");
    const senha = dados.get("senha");

    const sessao = login(cpf, senha);

    if (!sessao) {
      alerta.textContent = "CPF ou senha incorretos.";
      alerta.hidden = false;
      return;
    }

    window.location.href = "dashboard.html";
  });
}
