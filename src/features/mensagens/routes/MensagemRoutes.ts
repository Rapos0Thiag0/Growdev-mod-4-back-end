import { Router } from "express";
import MensagemController from "../controllers/MensagemController";

export default class Routes {
  public init(): Router {
    const routes = Router();
    const controller = new MensagemController();

    routes.post("/user/:user_uid/msg", controller.store);
    routes.get("/user/:user_uid/msg", controller.index);
    routes.get("/user/:user_uid/msg/:uid", controller.view);
    routes.put("/user/:user_uid/msg/:uid", controller.update);
    routes.delete("/user/:user_uid/msg/:uid", controller.destroy);

    return routes;
  }
}
