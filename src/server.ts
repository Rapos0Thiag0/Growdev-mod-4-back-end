import express, { Request, Response } from "express";
import "reflect-metadata";
import "dotenv/config";

import cors from "cors";

import Database from "./core/data/connections/Database";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Ok - Servidor inicializado!");
});

new Database()
  .openConnection()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Servidor inicializado na porta --> ${PORT}`)
    )
  );
