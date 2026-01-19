import users from "../data/users.js";

export function getMe(req, res) {
  return res.json(req.user);
}

export function getAllUsers(req, res) {
  return res.json(users);
};

export function getUserByUsername(req, res) {
  const { username } = req.params;
  const user = users.find(u => u.username === username);

  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  return res.json(user);
};

export function createUser(req, res) {
  const { username, password, role } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "Nome de usuário já existe" });
  }

  const newUser = { username, password, role };
  users.push(newUser);
  return res.status(201).json({ message: "Usuário criado", user: newUser });
};

export function updateUser(req, res) {
  const { username } = req.params;
  const { password, role } = req.body;

  const user = users.find(u => u.username === username);

  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  if (password) user.password = password;
  if (role) user.role = role;

  return res.json({ message: "Usuário atualizado", user });
};

export function deleteUser(req, res) {
  const { username } = req.params;

  const index = users.findIndex(u => u.username === username);

  if (index === -1) return res.status(404).json({ message: "Usuário não encontrado" });

  users.splice(index, 1);
  return res.json({ message: "Usuário removido" });
};

