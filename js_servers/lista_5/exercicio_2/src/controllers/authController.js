import loginUsers from "../data/users.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";
import bcrypt from "bcrypt";

export const autenticate = async (req, res) => {
  const { username, password } = req.body;

  const ERROR_MESSAGE = "Usuário e/ou senha não inválidos!";

  const foundUser = loginUsers.find(
    user => user.username === username);

  if (!username || !password || !foundUser) {
    return res.status(400).json({ message: ERROR_MESSAGE });
  }

  const passwordMatch = await bcrypt.compare(password, foundUser.password);
  if (!passwordMatch) {
    return res.status(400).json({ message: ERROR_MESSAGE });
  }
  const userPayload = {
    username: foundUser.username,
    name: foundUser.name,
    userRole: foundUser.role,
  };

  try {
    const token = jwt.sign(
      userPayload,
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("sessionId", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000
    });

    return res.status(200).json({ message: "Login realizado com sucesso" });

  } catch (err) {
    return res.status(500).json({ error: "Erro ao gerar token" });
  }
};
