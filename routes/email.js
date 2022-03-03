import { Router } from "express";
import { sendEmail } from "../controller/email.js";
import { homepage } from "../controller/home.js";

const emailRouter = Router();

emailRouter.post('/email',sendEmail);
emailRouter.get('/', homepage);

export default emailRouter;
