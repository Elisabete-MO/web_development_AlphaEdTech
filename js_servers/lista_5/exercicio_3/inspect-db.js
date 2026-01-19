import db from './src/db/loginDB.js';

async function inspectDB() {
  const it = db.iterator();

  try {
    for await (const [key, value] of it) {
      console.log("CHAVE:", key);
      console.log("VALOR:", value);
      console.log("----------");
    }
  } finally {
    await it.close(); // fecha o iterator corretamente
    process.exit(0);
  }
}

inspectDB();
