import { z } from 'zod';
import { ChatOpenAI } from '@langchain/openai';

// Exemplo simples de Zod
const schema = z.object({
  mensagem: z.string(),
});

const parseResult = schema.safeParse({ mensagem: "Olá Mundo" });

console.log("=== Projeto inicializado com sucesso! ===");
console.log("ESModules configurados:", import.meta.url ? "Sim" : "Não");
console.log("Zod parse test:", parseResult.success);
console.log("Langchain ChatOpenAI está disponível!");
