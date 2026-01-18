import bcrypt from "bcrypt";
import users from "../data/users.js";
import { handleNotFound } from "../utils/handleNotFound.js";

const ITEM = "Usuário";
const SALT_ROUNDS = 10;

export function getMe(req, res) {
  return res.json(req.user);
}

export function getAllUsers(req, res) {
  return res.json(users.map(u => ({ username: u.username, role: u.role })));
};

export function getUserByUsername(req, res) {
  const { username } = req.params;

  const user = handleNotFound(users.find(u => u.username === username), ITEM);

  return res.json({ username: user.username, role: user.role });
};

export async function createUser(req, res) {
  const { username, password, role } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "Nome de usuário já existe" });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const newUser = { username, password: hashedPassword, role };
  users.push(newUser);
  return res.status(201).json({ message: "Usuário criado", user: { username: newUser.username, password: req.body.password, role: newUser.role } });

};

export async function updateUser(req, res) {
  const { username } = req.params;
  const { password, role } = req.body;

  const user = handleNotFound(users.find(u => u.username === username), ITEM);

  if (password) user.password = await bcrypt.hash(password, SALT_ROUNDS);
  if (role) user.role = role;

  return res.json({ message: "Usuário atualizado", user: { username: user.username, password: req.body.password, role: user.role } });
};

export function deleteUser(req, res) {
  const { username } = req.params;

  const index = handleNotFound(users.findIndex(u => u.username === username), ITEM);

  users.splice(index, 1);
  return res.json({ message: "Usuário removido" });
};

