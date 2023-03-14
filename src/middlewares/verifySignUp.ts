// @ts-ignore
import {Request, Response} from "express";
import { db } from '../models'

const User = db.user;

// @ts-ignore
export const checkDuplicateEmail = async (req: Request, res: Response, next: any) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    next();
  } else {
    return res.status(400).send(
        'Email is already in use',
    );
  }
};
