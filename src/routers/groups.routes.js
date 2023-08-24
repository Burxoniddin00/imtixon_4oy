import { Router } from "express";
import groups from "../controllers/groups.controller.js";
import { ChekToken } from "../middlewares/chekToken.js";

export const groupsRouters = Router();

groupsRouters
  .get("/", ChekToken, groups.get)
  .get("/:id", ChekToken, groups.get)
  .post("/", ChekToken, groups.post)
  .put("/:id", ChekToken, groups.put)
  .delete("/:id", ChekToken, groups.delet);
