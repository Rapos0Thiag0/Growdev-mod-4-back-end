import { Router } from "express";
import UserController from "../controllers/UserController";

export default class Routes {
  public init(): Router {
    const routes = Router();
    const controller = new UserController();

    routes.post("/user", controller.store);
    routes.get("/users", controller.index);
    routes.get("/user", controller.view);
    routes.get("/user/:uid", controller.viewOne);
    routes.put("/user/:uid", controller.update);
    routes.delete("/user/:uid", controller.destroy);

    return routes;
  }
}
