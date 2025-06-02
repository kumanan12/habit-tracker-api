import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { isWhiteListed } from "./utils/utils.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

/* Imports for middleware */
import habitsRouter from "./router/habits.js";
import { log } from "console";

const frontendURL = process.env.FRONTEND_URL;
const localhostURL= process.env.LOCALHOST_URL



const corsOptions = {
  origin: [frontendURL, localhostURL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));

app.use((req, res, next) => {
  let isAllowed = isWhiteListed(req);
  if (!isAllowed) {
    res.status(403).send("Forbidden");
  }
  next();
});

app.use("/habits", habitsRouter);

app.listen(PORT, () => console.log(`Habit tracker api running on ${PORT}`));
