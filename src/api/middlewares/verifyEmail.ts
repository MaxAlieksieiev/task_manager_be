import { Request, Response, NextFunction} from 'express'
import {DbUser} from "../lib";
import {sendResponseError} from "../utils/apiHelper";
export const verifyEmail = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { email } = req.body;
    const user = await new DbUser().findByEmail(email);
    if(!user) {
      next();
    } else {
      return sendResponseError(res, 409, 'User exist in db with the same email')
    }
  } catch(error) {
    console.error(error)
  }
}
