import db from './src/db/customerDB.js';

async function inspectDB() {
  const it = db.iterator();

  try {
    for await (const [key, value] of it) {
      console.log("CHAVE:", key);
      console.log("VALOR:", value);
      console.log("----------");
    }
  } finally {
    console.log("FINALIZANDO INSPEÇÃO DO BANCO DE DADOS");
    await it.close(); // fecha o iterator corretamente
    process.exit(0);
  }
}

inspectDB();
