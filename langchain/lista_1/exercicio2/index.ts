import 'dotenv/config';
import { z } from 'zod';
import { ChatOpenAI } from '@langchain/openai';

// Confirma se carregou a variável
console.log("Status de carregamento enviroment:", process.env.NVIDIA_API_KEY ? "Carregado" : "Não Carregado");

// Instancia o modelo apontando para o NVIDIA NIM
const model = new ChatOpenAI({
  model: "moonshotai/kimi-k2.5",
  apiKey: process.env.NVIDIA_API_KEY,
  configuration: {
    baseURL: "https://integrate.api.nvidia.com/v1",
  }
});

async function main() {
  console.log("=== Executando Teste do NVIDIA NIM ===");

  if (!process.env.NVIDIA_API_KEY || process.env.NVIDIA_API_KEY === "COLOQUE_SUA_CHAVE_AQUI") {
    console.log("⚠️ ATENÇÃO: Substitua 'COLOQUE_SUA_CHAVE_AQUI' pela sua chave real (nvapi-...) no arquivo .env");
    return;
  }

  try {
    console.log("Enviando requisição para o modelo moonshotai/kimi-k2.5...");
    const resposta = await model.invoke("Responda apenas de forma breve: Olá, a conexão está funcionando!");
    console.log("\n✅ Resposta do modelo:");
    console.log(resposta.content);
  } catch (erro) {
    console.error("\n❌ Erro ao chamar o modelo da NVIDIA:");
    console.error(erro);
  }
}

main();
