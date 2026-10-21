
import { createUser, findUserByCpf } from "./storage.js";

const form = document.querySelector("#form-cadastro");
const alerta = document.querySelector("#alerta");

if (form && alerta) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    alerta.hidden = true;

    const dados = Object.fromEntries(new FormData(form));
    const cpf = String(dados.cpf ?? "").replace(/\D/g, "");
    const nome = String(dados.nome ?? "").trim();
    const email = String(dados.email ?? "").trim();
    const senha = String(dados.senha ?? "");
    const confirmarSenha = String(dados.confirmarSenha ?? "");
    const nascimento = String(dados.nascimento ?? "");
    const renda = Number(dados.renda);

    const mostrarErro = (mensagem) => {
      alerta.textContent = mensagem;
      alerta.hidden = false;
    };

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (nome.length < 3) {
      mostrarErro("Informe seu nome completo.");
      return;
    }

    if (cpf.length !== 11) {
      mostrarErro("Informe um CPF com 11 dígitos.");
      return;
    }

    if (findUserByCpf(cpf)) {
      mostrarErro("Já existe um cadastro com este CPF.");
      return;
    }

    if (senha.length < 8 || !/[a-zA-Z]/.test(senha) || !/\d/.test(senha)) {
      mostrarErro("A senha deve ter pelo menos 8 caracteres, incluindo letras e números.");
      return;
    }

    if (senha !== confirmarSenha) {
      mostrarErro("As senhas não coincidem.");
      return;
    }

    const dataNascimento = new Date(`${nascimento}T00:00:00`);
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();

    const aindaNaoFezAniversario =
      hoje.getMonth() < dataNascimento.getMonth() ||
      (hoje.getMonth() === dataNascimento.getMonth() &&
        hoje.getDate() < dataNascimento.getDate());

    if (aindaNaoFezAniversario) idade--;

    if (!nascimento || idade < 18 || dataNascimento > hoje) {
      mostrarErro("É necessário ter 18 anos ou mais para abrir uma conta.");
      return;
    }

    if (!Number.isFinite(renda) || renda < 0) {
      mostrarErro("Informe uma renda mensal válida.");
      return;
    }

    if (!form.elements.termos.checked) {
      mostrarErro("Você precisa aceitar os termos de uso.");
      return;
    }

    try {
      createUser({
        nome,
        cpf,
        nascimento,
        email,
        telefone: String(dados.telefone ?? "").trim(),
        renda,
        tipoRenda: dados.tipoRenda,
        password: senha,
      });

      alert("Cadastro realizado! Agora você pode entrar.");
      window.location.href = "login.html";
    } catch (error) {
      mostrarErro(error.message || "Não foi possível realizar o cadastro.");
    }
  });
}
