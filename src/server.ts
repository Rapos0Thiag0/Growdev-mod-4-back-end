import express, { Request, Response } from "express";
import "reflect-metadata";
import "dotenv/config";

import cors from "cors";

import Database from "./core/data/connections/Database";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Ok");
});

new Database()
  .openConnection()
  .then(() =>
    app.listen(PORT, () => console.log("server iniciado na porta 8080"))
  );
