import { clientRepository } from "../repositories/clientRepository.js";

export const clientController = {
  getAllClients: (req, res) => {
    clientRepository.getAllClients()
      .then((clients) => {
        res.status(200).json(clients);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  getClientById: (req, res) => {
    clientRepository.getClientById(req.params.id)
      .then((client) => {
        res.status(200).json(client);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  createClient: (req, res) => {
    clientRepository.createClient(req.body)
      .then((client) => {
        res.status(201).json(client);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  updateClient: (req, res) => {
    clientRepository.updateClient(req.params.id, req.body)
      .then((client) => {
        res.status(200).json(client);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },

  deleteClient: (req, res) => {
    clientRepository.deleteClient(req.params.id)
      .then((client) => {
        res.status(200).json(`deleted client: ${client.full_name}`);
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  },
};


