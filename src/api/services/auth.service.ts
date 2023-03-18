import {DbUser} from "../lib";
import {Request, Response} from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {sendResponseError} from "../utils/apiHelper";
import {DbRefreshToken} from "../lib/refreshToken";

export class AuthService {

  async signIn(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;
    try {
      if(!email || !password) {
        return sendResponseError(res, 400, "All fields are required")
      }

      const user = await new DbUser().findByEmail(email);

      if(!user) {
        return sendResponseError(res, 404, 'User not found')
      }

      const isPasswordEqual = bcrypt.compareSync(password, user.password);

      if(!isPasswordEqual) {
        return sendResponseError(res, 400, "Password didn't math")
      }

      const accessToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
      });

      const refreshToken = await new DbRefreshToken().createToken(user);

      return res.status(200).json({
        id: user.id,
        email: user.email,
        accessToken,
        refreshToken,
      })
    } catch(error: any) {
      console.error(error);
      return sendResponseError(res, 500, error.message)
    }

  }

  async signUp(req: Request, res: Response): Promise<any> {
    const { email, phone, password } = req.body;
    try {
      const hashPassword = await bcrypt.hash(password, 8);
      const user = await new DbUser().create({
        email,
        phone,
        password:hashPassword,
      })
      if(user) {
        return res.status(200).send({
          message: 'User was created successfully'
        })

      } else {
        return sendResponseError(res,400, "Something went wrong");
      }
    } catch(error: any) {
      return sendResponseError(res, 500, error.message);
    }
  }

  async refreshToken(req: Request, res: Response): Promise<any> {
    const {refreshToken: requestToken} = req.body;

    if(!requestToken) {
      return sendResponseError(res, 400, 'Refresh token is required');
    }
    try {
      const refreshToken = await new DbRefreshToken().find(requestToken);

      if(!refreshToken) {
        return sendResponseError(res, 403, "Refresh token is not in database!")
      }

      const isExpiryDate = new DbRefreshToken().verifyExpiration(refreshToken);
      if(isExpiryDate) {
        await new DbRefreshToken().destroy(refreshToken.id);
        return sendResponseError(res, 403, "Refresh token was expired. Please make a new signin request")
      }

      const newAccessToken = jwt.sign({ id: refreshToken?.user?.id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
      });

      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token
      })

    } catch(error: any) {
      return sendResponseError(res, 500, error.message);
    }
  }
}
