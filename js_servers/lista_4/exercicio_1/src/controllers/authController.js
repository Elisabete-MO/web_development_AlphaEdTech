import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

let loginUsers = [
  {
    id: 1,
    username: "admin",
    name: "Administrador",
    password: "louvre",
    userRole: ["admin", "user"],
  }
];

export const autenticate = async (req, res) => {
  const { username, password } = req.body;

  const ERROR_MESSAGE = "Usuário e/ou senha não inválidos!";

  const foundUser = loginUsers.find(
    user => user.username === username && user.password === password
  );

  if (!username || !password || !foundUser) {
    return res.status(400).json({ message: ERROR_MESSAGE });
  }

  const userPayload = {
    username: foundUser.username,
    name: foundUser.name,
    userRole: foundUser.userRole,
  };

  try {
    const token = jwt.sign(
      { user: userPayload },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("sessionId", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    return res.status(500).json({ error: "Erro ao gerar token" });
  }
};

export const getLogin = (req, res) => {
  return res.json(req.user);
};