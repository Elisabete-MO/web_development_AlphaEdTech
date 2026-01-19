import express from "express";
import {
  getHomeMessage,
  getAboutMessage,
  getHelpMessage,
  getCurrentTime
} from "./functions.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(getHomeMessage());
});

router.get("/about", (req, res) => {
  res.send(getAboutMessage());
});

router.get("/help", (req, res) => {
  res.send(getHelpMessage());
});

router.get("/time", (req, res) => {
  res.send(getCurrentTime());
});

export default router;
