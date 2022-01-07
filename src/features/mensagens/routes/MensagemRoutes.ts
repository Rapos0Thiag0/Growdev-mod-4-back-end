import { Router } from "express";
import MensagemController from "../controllers/MensagemController";

export default class Routes {
  public init(): Router {
    const routes = Router();
    const controller = new MensagemController();

    routes.post("/user/idUser/msg/idUser", controller.store);
    routes.get("/user/idUser/msg/idUser", controller.index);
    routes.get("/user/idUser/msg/idMensagem", controller.view);
    routes.put("/user/idUser/msg/idMensagem", controller.update);
    routes.delete("/user/idUser/msg/idMensagem", controller.destroy);

    return routes;
  }
}
