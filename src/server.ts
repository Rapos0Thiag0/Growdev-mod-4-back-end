import express, { Request, Response } from "express";
import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import Database from "./core/data/connections/Database";
import UserRoutes from "./features/users/routes/UserRoutes";
import MensagemRoutes from "./features/mensagens/routes/MensagemRoutes";

const app = express();
const PORT = process.env.PORT || 4000;

// const allowed = ["https://mod-4-fe.herokuapp.com"];
const corsOptions: cors.CorsOptions = {
  methods: "GET,OPTIONS,PUT,POST,DELETE",
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
const userRoutes = new UserRoutes().init();
const mensagemRoutes = new MensagemRoutes().init();

app.use(userRoutes);
app.use(mensagemRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor iniciado");
});

new Database()
  .openConnection()
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Servidor inicializado na porta --> ${PORT}`)
    )
  );
