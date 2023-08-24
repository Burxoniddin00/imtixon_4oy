import { Router } from "express";
import positions from "../controllers/positions.controller.js";
import { ChekToken } from "../middlewares/chekToken.js";

export const positionsRouters = Router();

positionsRouters
  .get("/", ChekToken, positions.get)
  .get("/:id", ChekToken, positions.get)
  .post("/", ChekToken, positions.post)
  .put("/:id", ChekToken, positions.put)
  .delete("/:id", ChekToken, positions.delet);
