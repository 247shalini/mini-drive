import { Router } from "express";
import { homepage } from "../controller/home.js";

const homeRouter = Router();

homeRouter.get("/", homepage);

export default homeRouter;
