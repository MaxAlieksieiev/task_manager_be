import {Response, NextFunction} from 'express';
import jwt, {TokenExpiredError} from 'jsonwebtoken';
import {sendResponseError} from "../utils/apiHelper";

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return sendResponseError(res, 401, "Unauthorized! Access Token was expired!");
  }
  return sendResponseError(res, 401, "Unauthorized!");
}
export const verifyToken = (req: any, res: Response, next: NextFunction): any => {
  const token = req.headers['x-access-token'];

  if(!token) {
    return sendResponseError(res, 403, 'No token provided!')
  }

  // @ts-ignore
  jwt.verify(token as string, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
     return catchError(err, res);
    }
    // @ts-ignore
    req.userId = decoded?.id;
    next();
  });
}
