import { messages } from "./content.js";

export function getHomeMessage() {
  return messages.home;
}

export function getAboutMessage() {
  return messages.about;
}

export function getHelpMessage() {
  return messages.help;
}

export function getCurrentTime() {
  return `Horário atual: ${new Date().toLocaleTimeString("pt-BR")}`;
}
