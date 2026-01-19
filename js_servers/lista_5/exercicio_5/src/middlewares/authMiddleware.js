import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwt.js";

export const authMiddleware = (req, res, next) => {
  const sessionToken = req.cookies.sessionId;

  if (!sessionToken) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(sessionToken, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.userRole !== "admin") {
    return res.status(403).json({ message: "Acesso permitido apenas para administradores" });
  }
  next();
}
