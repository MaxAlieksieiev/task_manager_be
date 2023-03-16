import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import path from 'path';
import MainRouter from "./api/routers/main.router";
export class Server {
  public app: express.Application;

  private corsOptions = {
    origin: 'http://localhost:4200'
  }

  constructor() {
    this.app = express();
    this.configuration();
    this.routes();
  }


  configuration() {
    // @ts-ignore
    this.app.use(express.json());
    this.app.use(express.urlencoded({
      extended: true,
    }));
    this.app.use(cors(this.corsOptions));
  }

  routes() {
    this.app.use('/api/v1', MainRouter);
  }

  run() {
    this.app.listen(process.env.PORT);
    console.log(`App works on ${process.env.PORT}`);
  }

}

require('dotenv').config({
  path: path.join(__dirname + '/../dev.env'),
});

const server = new Server();
server.run()
