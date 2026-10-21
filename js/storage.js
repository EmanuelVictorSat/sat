
const USERS = "sat:users";
const SESSION = "sat:session";
const LOANS = "sat:loans";

function read(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const normalizeCpf = (cpf) => String(cpf ?? "").replace(/\D/g, "");
export const getUsers = () => read(USERS);

export const findUserByCpf = (cpf) =>
  getUsers().find((user) => user.cpf === normalizeCpf(cpf)) ?? null;

export function createUser(data) {
  const users = getUsers();
  const cpf = normalizeCpf(data.cpf);

  if (users.some((user) => user.cpf === cpf)) {
    throw new Error("Já existe cadastro com este CPF.");
  }

  if (users.some((user) => user.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const user = {
    ...data,
    cpf,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  write(USERS, [...users, user]);
  return user;
}

export function updateUser(id, changes) {
  const users = getUsers().map((user) =>
    user.id === id ? { ...user, ...changes, id, cpf: user.cpf } : user,
  );

  write(USERS, users);
  return users.find((user) => user.id === id) ?? null;
}

export function deleteUser(id) {
  write(USERS, getUsers().filter((user) => user.id !== id));

  if (getSession()?.id === id) logout();
}

export function login(cpf, password) {
  const user = findUserByCpf(cpf);

  if (!user || user.password !== password) return null;

  const session = { id: user.id, name: user.nome, cpf: user.cpf };
  localStorage.setItem(SESSION, JSON.stringify(session));

  return session;
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION) ?? "null");
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(SESSION);
}

export const getLoanRequests = () => read(LOANS);

export function createLoanRequest(data) {
  const request = {
    ...data,
    id: crypto.randomUUID(),
    status: "Solicitação simulada",
    createdAt: new Date().toISOString(),
  };

  write(LOANS, [...getLoanRequests(), request]);
  return request;
}

export function updateLoanRequest(id, changes) {
  const requests = getLoanRequests().map((item) =>
    item.id === id ? { ...item, ...changes, id } : item,
  );

  write(LOANS, requests);
  return requests.find((item) => item.id === id) ?? null;
}

export function deleteLoanRequest(id) {
  write(LOANS, getLoanRequests().filter((item) => item.id !== id));
}

export const getUserLoanRequests = (userId) =>
  getLoanRequests().filter((item) => item.userId === userId);
