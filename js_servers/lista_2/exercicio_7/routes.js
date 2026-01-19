import express from "express";
import {
  listFiles,
  getCurrentNodeProcess,
  getSystemDateTime
} from "./osService.js";

const router = express.Router();

router.get("/list-files", async (req, res) => {
  try {
    const output = await listFiles();
    res.send(`
      <h2>Arquivos no diretório</h2>
      <pre>${output}</pre>
      <a href="/">Voltar</a>
    `);
  } catch (error) {
    res.send(`<pre>Erro:\n${error.message}</pre>`);
  }
});

router.get("/node-process", async (req, res) => {
  try {
    const line = await getCurrentNodeProcess();
    res.send(`
      <h2>Processo atual do Node</h2>
      <pre>${line}</pre>
      <a href="/">Voltar</a>
    `);
  } catch (error) {
    res.send(`<pre>Erro:\n${error.message}</pre>`);
  }
});

router.get("/datetime", async (req, res) => {
  try {
    const output = await getSystemDateTime();
    res.send(`
      <h2>Data e hora do sistema</h2>
      <pre>${output}</pre>
      <a href="/">Voltar</a>
    `);
  } catch (error) {
    res.send(`<pre>Erro:\n${error.message}</pre>`);
  }
});

export default router;
