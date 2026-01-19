import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";
import { userService } from '../services/index.js';

export async function autenticate(req, res) {
  const { username, password } = req.body;

  const ERROR_MESSAGE = "Usuário e/ou senha inválidos!";

  try {
    const validUser = await userService.validateUser(username, password);

    if (!username || !password || !validUser) {
      return res.status(400).json({ message: ERROR_MESSAGE });
    }

    const token = jwt.sign(validUser, JWT_SECRET, { expiresIn: '15m' });

    res.cookie('sessionId', token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000
    });

    return res.status(200).json({ message: "Login realizado com sucesso" });

  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message || "Erro ao autenticar usuário" });
  }
};
