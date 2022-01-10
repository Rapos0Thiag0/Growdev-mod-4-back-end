import express, { Request, Response } from "express";
import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import Database from "./core/data/connections/Database";
import UserRoutes from "./features/users/routes/UserRoutes";
import MensagemRoutes from "./features/mensagens/routes/MensagemRoutes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const db = new Database();

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor iniciado");
});

const userRoutes = new UserRoutes().init();
const mensagemRoutes = new MensagemRoutes().init();

app.use(userRoutes);
app.use(mensagemRoutes);

db.openConnection().then(() =>
  app.listen(PORT, () =>
    console.log(`Servidor inicializado na porta --> ${PORT}`)
  )
);
