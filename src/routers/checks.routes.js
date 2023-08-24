import { Router } from "express";
import chek from "../controllers/Checks.controller.js";
import { ChekToken } from "../middlewares/chekToken.js";
export const cheksRouters = Router();

cheksRouters
  .get("/", ChekToken, chek.get)
  .post("/", ChekToken, chek.post)
  .get("/:id", ChekToken, chek.get)
  .put("/:id", ChekToken, chek.put);
