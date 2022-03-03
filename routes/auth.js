import { Router } from "express";
import {
  loginPage,
  loginAction,
  signupPage,
  signupAction,
} from "./../controller/auth.js";

const authRouter = Router();

authRouter.get("/login", loginPage);
authRouter.post("/login", loginAction);

authRouter.get("/signup", signupPage);
authRouter.post("/signup", signupAction);

export default authRouter;
