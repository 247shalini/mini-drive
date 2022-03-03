import { Router } from "express";
import homeRouter from "./home.js";
import authRouter from "./auth.js";
import fileRouter from "./file.js";
import emailRouter from "./email.js";

const router = Router();

router.use(homeRouter);
router.use(authRouter);
router.use(fileRouter);
router.use(emailRouter);

export default router;
