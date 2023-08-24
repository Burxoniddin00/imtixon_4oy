import { Router } from "express";
import departments from "../controllers/departments.controller.js";
import { ChekToken } from "../middlewares/chekToken.js";

export const departmentsRouters = Router();

departmentsRouters
  .get("/", ChekToken, departments.get)
  .get("/:id", ChekToken, departments.get)
  .get("/:id/:grup", ChekToken, departments.get)
  .put("/:id", ChekToken, departments.put)
  .post("/", ChekToken, departments.post)
  .delete("/:id", ChekToken, departments.delete);
