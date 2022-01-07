import { Router } from "express";
import UserController from "../controllers/UserController";

export default class Routes {
  public init(): Router {
    const routes = Router();
    const controller = new UserController();

    routes.post("/user", controller.store);
    routes.get("/user", controller.index);
    routes.get("/user", controller.viewUsers);
    routes.get("/user/idUser", controller.view);
    routes.put("/user/iduser", controller.update);
    routes.delete("/user/iduser", controller.destroy);

    return routes;
  }
}
