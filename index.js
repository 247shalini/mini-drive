import dotenv from "dotenv";
import express from "express";
import { engine } from "express-handlebars";
import http from "http";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import session from "express-session";
import mongoose from "mongoose";

dotenv.config();

global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);

const app = express();

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    helpers: {
      getFormattedNumber: (number) => {
        return new Intl.NumberFormat("en-IN", {
          maximumSignificantDigits: 3,
        }).format(number);
      },
      truncate: (str, len) => {
        // truncate string
        if (str.length > len && str.length > 0) {
          return str.substring(0, len) + "...";
        }
        return str;
      },
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.use(router);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database connected successfully"))
  .catch(console.log);

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
