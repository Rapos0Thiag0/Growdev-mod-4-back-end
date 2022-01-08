import express, { Request, Response } from "express";
import "reflect-metadata";
import "dotenv/config";

import cors from "cors";

import UserRoutes from "./features/users/routes/UserRoutes";
// import MensagemRoutes from "./features/mensagens/routes/MensagemRoutes";
import Database from "./core/data/connections/Database";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor iniciado");
});

const userRoutes = new UserRoutes().init();
// const mensagemRoutes = new MensagemRoutes().init();

app.use(userRoutes);
// app.use(mensagemRoutes);

new Database()
  .openConnection()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Servidor inicializado na porta --> ${PORT}`)
    )
  );
