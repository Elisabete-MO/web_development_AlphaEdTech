import db from '../db/loginDB.js';
import bcrypt from 'bcrypt';
import { handleNotFound } from '../utils/handleNotFound.js';

const ITEM = "Usuário";
const SALT_ROUNDS = 10;

export async function getUser(username) {
  try {
    const user = await handleNotFound(await db.get(username), ITEM);
    return await db.get(user);
  } catch (error) {
    if (!error.message) new Error('Erro ao acessar banco de dados');
    if (!error.status) error.status = 500;
    throw error;
  }
}

export async function getAllUsers() {
  try {
    return await db.values().all();
  } catch (error) {
    if (!error.message) new Error('Erro ao acessar banco de dados');
    if (!error.status) error.status = 500;
    throw error;
  }
};

export async function getUserByUsername(username) {

  try {
    const user = await handleNotFound(await db.get(username), ITEM);
    return { username: user.username, role: user.role };
  } catch (error) {
    if (!error.message) new Error('Erro ao acessar banco de dados');
    if (!error.status) error.status = 500;
    throw error;
  }
};

export async function createUser(username, password, role) {
  try {
    const existing = await db.get(username);
    if (existing) {
      const err = new Error('Nome de usuário já existe');
      err.status = 400;
      throw err;
    }
  } catch (err) {
    if (err.type !== 'NotFoundError') throw err;
  }

  try {
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Salvar no LevelDB
    await db.put(username, { username, password: hashedPassword, role });
    return { username, role };
  } catch (error) {
    if (!error.message) new Error('Erro ao criar usuário');
    if (!error.status) error.status = 500;
    throw error;
   }
}

export async function updateUser(username, { password, role }) {
  try {
    const user = await handleNotFound(await db.get(username), ITEM);
    user = {
      username: username,
      password: await bcrypt.hash(password, SALT_ROUNDS),
      role: role
    };

    await db.put(user);
    return { username: user.username, role: user.role };

  } catch (error) {
    if (!error.message) new Error('Erro ao atualizar usuário');
    if (!error.status) error.status = 500;

    throw error;
  }
}

export async function deleteUser(username) {
  try {
    const user = handleNotFound(await getUser(username), ITEM);
    await db.del(user.username);
    return { username: user.username };
  } catch (error) {
    if (!error.message) new Error('Erro ao remover usuário');
    if (!error.status) error.status = 500;
    error.cause = error;
    throw error;
  }
}

export async function validateUser(username, password) {
  const user = await getUser(username);
  if (!user) return false;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? { username: user.username, role: user.role } : false;
}
