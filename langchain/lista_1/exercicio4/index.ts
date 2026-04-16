import 'dotenv/config';
import { z } from 'zod';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { initializeAgentExecutorWithOptions } from "langchain/agents";

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

// Cria o agente
const executor = await initializeAgentExecutorWithOptions(
  [], // tools (vazio por enquanto)
  model,
  {
    agentType: "chat-zero-shot-react-description",
  }
);

async function main() {
  const AGENT_MESSAGE = "Explique em uma frase o que é um agente de IA";
  console.log("=== Executando Teste do NVIDIA NIM ===");

  if (!process.env.NVIDIA_API_KEY || process.env.NVIDIA_API_KEY === "COLOQUE_SUA_CHAVE_AQUI") {
    console.log("⚠️ ATENÇÃO: Substitua 'COLOQUE_SUA_CHAVE_AQUI' pela sua chave real (nvapi-...) no arquivo .env");
    return;
  }

  try {
    console.log("Enviando mensagem para o agente...");

    const resposta = await executor.invoke({
      input: AGENT_MESSAGE
    });

    console.log(AGENT_MESSAGE);
    console.log("\n✅ Resposta do agente:");
    console.log(resposta.output);
  } catch (erro) {
    console.error("\n❌ Erro ao chamar o modelo da NVIDIA:");
    console.error(erro);
  }
}

main();
