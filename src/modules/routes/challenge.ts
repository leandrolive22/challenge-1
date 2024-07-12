import express from "express";

import { DesafioController } from "../challenge/controllers/DesafioController";

const routerDesafio = express.Router();

const desafioController = new DesafioController();

routerDesafio.get("/read-csv", desafioController.prepareReadCsv);

export { routerDesafio };
 