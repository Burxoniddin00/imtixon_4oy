import { Router } from "express";
import outlay from "../controllers/outlay.controller.js";
import { ChekToken } from "../middlewares/chekToken.js";

export const outlayRouters = Router();

outlayRouters
  .get("/", ChekToken, outlay.get)
  .get("/:id", ChekToken, outlay.get)
  .post("/", ChekToken, outlay.post)
  .put("/:id", ChekToken, outlay.put);
