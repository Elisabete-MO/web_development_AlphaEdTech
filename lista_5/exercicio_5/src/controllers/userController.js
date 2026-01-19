import { userService } from '../services/index.js';

export function getMe(req, res) {
  return res.json(req.user);
}

export async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export async function getUserByUsername(req, res) {
  const { username } = req.params;

  try {
    const user = await userService.getUserByUsername(username);
    return res.json({ username: user.username, role: user.role });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  };
};

export async function createUser(req, res) {
  const { username, password, role } = req.body;

  try {
    const newUser = await userService.createUser(username, password, role);
    return res.status(201).json({
      message: 'Usuário criado',
      user: {
        username: newUser.username,
        password: req.body.password,
        role: newUser.role
      }
    });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

export async function updateUser(req, res) {
  const { username } = req.params;
  const { password, role } = req.body;


  if (password) user.password = password;
  if (role) user.role = role;

  try {
    const userUpdated = await userService.updateUser(username, user);

    return res.json({
      message: "Usuário atualizado",
      user: {
        username: userUpdated.username,
        password: req.body.password,
        role: userUpdated.role
      }
    });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  };
};

export async function deleteUser(req, res) {
  const { username } = req.params;

  try {
    const userDeleted = await userService.deleteUser(username);
    return res.json({ message: `Usuário ${userDeleted.username} removido` });
  } catch (err) {
    return res.status(err.status || 500).json({ message: err.message });
  }
};

