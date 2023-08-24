import { Router } from "express";
import adim from "../controllers/adimi.controller.js";
import { ChekToken } from "../middlewares/chekToken.js";

export const adminRouters = Router();

adminRouters.get("/", ChekToken, adim.get).get("/:id", ChekToken, adim.get);
