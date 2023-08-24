import { Router } from "express";
import users from "../controllers/users.controller.js";
import { ChekToken } from "../middlewares/chekToken.js";

export const usersRouters = Router();

usersRouters
  .get("/", ChekToken, users.get)
  .get("/:id", ChekToken, users.get)
  .post("/", ChekToken, users.post)
  .put("/:id", users.put)
  .delete("/:id", ChekToken, users.delet);
