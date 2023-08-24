import { Router } from "express";
import directions from "../controllers/directions.controller.js";
import { ChekToken } from "../middlewares/chekToken.js";

export const directionsRouters = Router();

directionsRouters
  .get("/", ChekToken, directions.get)
  .get("/:id", ChekToken, directions.get)
  .post("/", ChekToken, directions.post)
  .put("/:id",ChekToken ,directions.put)
  .delete("/:id", directions.delet);
