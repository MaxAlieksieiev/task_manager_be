import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import path from 'path';
import MainRouter from "./api/routers/main.router";

const db = require('./api/models');
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
    this.app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    this.app.use('/api/v1', MainRouter);
  }

  run() {
    db.sequelize.sync().then(result=>{
      console.log('sync models in db', !!result);
    })
      .catch(err=> console.log(err));
    this.app.listen(process.env.PORT);
    console.log(`App works on ${process.env.PORT}`);
  }

}

require('dotenv').config({
  path: path.join(__dirname + '/../.env'),
});

const server = new Server();
server.run()
