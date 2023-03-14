import {Request, Response} from "express";
import { jwt } from 'jsonwebtoken';

const {TokenExpiredError} = jwt;
require('dotenv');

const catchError = (err: any, res: Response) => {
  if (err instanceof TokenExpiredError) {
    return res.status(401).send({
      message: 'Unauthorized! Access Token was expired!',
    });
  }

  return res.sendStatus(401).send({message: 'Unauthorized!'});
};

export const verifyToken = (req: Request, res: Response, next: any): any => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err: any, decoded: any): any => {
    if (err) {
      return catchError(err, res);
    }
    // @ts-ignore
    req.userId = decoded.id;
    next();
  });
};
