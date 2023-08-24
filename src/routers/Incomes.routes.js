import { Router } from "express";
import inco from "../controllers/incomes.controller.js";
import { ChekToken } from "../middlewares/chekToken.js";
export const incomesRouters = Router();

incomesRouters
  .get("/", ChekToken, inco.get)
  .post("/", ChekToken, inco.post)
  .get("/:id", ChekToken, inco.get)
  .put("/:id", ChekToken, inco.put);
