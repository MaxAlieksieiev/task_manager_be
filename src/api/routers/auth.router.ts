import {Router, Request, Response} from "express";
import {AuthService} from "../services";

class AuthRouter {
  public router: Router;
  public authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.router = Router();
    this.routes();
  }

  public async signIn(req:Request, res:Response){
    return res.status(200).send({
      message: 'api works'
    })
  }

  public async signUp(req:Request, res:Response){
    return res.status(200).send({
      message: 'api works'
    })
  }

  public async verifyToken(req:Request, res:Response){
    return res.status(200).send({
      message: 'api works'
    })
  }

  public routes(){
    this.router.post('/sign-in', this.signIn.bind(this));
    this.router.post('/sign-up', this.signUp.bind(this));
    this.router.post('/verify-token', this.verifyToken.bind(this));
  }
}

export default new AuthRouter().router;
