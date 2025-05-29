import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 7000;


/* Imports for middleware */
import habitsRouter from "./router/habits.js";

app.use(express.json());
app.use(cors());

app.use("/habits", habitsRouter);

app.listen(PORT, () => console.log(`Habit tracker api running on ${PORT}`));
