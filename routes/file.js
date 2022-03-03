import { Router } from "express";
import { permitFile, uploadFile } from "../controller/file.js";
import multer from "multer";
import fs from "fs-extra";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const uploadPath = path.join(__dirname, "..", "uploads");

fs.ensureDirSync(uploadPath);

const fileRouter = Router();

const upload = multer({ dest: uploadPath });

fileRouter.post("/file/upload", upload.single("file"), uploadFile);
fileRouter.post("/file/permit", permitFile);

export default fileRouter;
