import {Router, Request, Response} from "express";
import {AuthService} from "../services";
import {verifyEmail} from "../middlewares";

class AuthRouter {
  public router: Router;
  public authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.router = Router();
    this.routes();
  }

  public async signIn(req:Request, res:Response){
    await this.authService.signIn(req, res);
  }

  public async signUp(req:Request, res:Response){
    await this.authService.signUp(req, res);
  }

  public async refreshToken(req:Request, res:Response){
    await this.authService.refreshToken(req, res)
  }

  public routes(){
    this.router.post('/sign-in', this.signIn.bind(this));
    this.router.post('/sign-up', [verifyEmail], this.signUp.bind(this));
    this.router.post('/refresh-token', this.refreshToken.bind(this));
  }
}

export default new AuthRouter().router;
