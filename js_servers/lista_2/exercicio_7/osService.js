import { exec } from "child_process";

export function listFiles() {
  return new Promise((resolve, reject) => {
    exec("ls -l", (error, stdout) => {
      if (error) reject(error);
      else resolve(stdout);
    });
  });
}

export function getCurrentNodeProcess() {
  return new Promise((resolve, reject) => {
    const pid = process.pid;

    exec("ps auxw", (error, stdout) => {
      if (error) return reject(error);

      const line = stdout
        .split("\n")
        .find(l => l.includes(pid.toString()));

      resolve(line || "Não encontrado");
    });
  });
}

export function getSystemDateTime() {
  return new Promise((resolve, reject) => {
    exec("date", (error, stdout) => {
      if (error) reject(error);
      else resolve(stdout);
    });
  });
}
