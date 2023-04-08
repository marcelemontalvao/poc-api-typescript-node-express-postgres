import express, { Application } from "express";
import { db } from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors";
import { moviesRouter } from "./routes/movies.routes.js";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(moviesRouter);

app.listen(PORT, async () => {
    await db();
    console.log("Server is running on PORT: " + PORT);
});