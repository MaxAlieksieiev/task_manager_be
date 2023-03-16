import {Router} from "express";
import AuthRouter from "./auth.router";

class MainRouter  {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes = () => {
    this.router.use('/auth', AuthRouter);
  }
}

export default new MainRouter().router
