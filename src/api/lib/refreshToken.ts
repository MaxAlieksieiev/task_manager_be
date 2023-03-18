import {DbBaseModel} from "./base";
import { v4 as uuid } from 'uuid';

const db = require('../models');
export class RefreshToken {
  expiryDate: Date;
  token: string;

  constructor() {}

}

export class DbRefreshToken extends DbBaseModel<DbRefreshToken, RefreshToken> {
  constructor() {
    super(db.refreshToken,  new RefreshToken());
  }

  async createToken(user) {
    const transaction = await db.sequelize.transaction();

    try {
      let expiryData = new Date();

      const token = uuid();
      expiryData.setSeconds(expiryData.getSeconds() + +process.env.JWT_REFRESH_EXPIRATION);
      const refreshToken = await this.dbInstance.create({
        token,
        userId: user.id,
        expiryDate: expiryData.getTime(),
      });
      await transaction.commit();
      return refreshToken.token;
    } catch(error) {
      await transaction.rollback();
      throw error;
    }
  }

  async find(token: string) {
    return await this.dbInstance.findOne({
      where: {
        token
      },
      attributes: ['token', 'id', 'expiryDate'],
      include: [
        {model: db.user, as: 'user'}
      ]
    })
  }

  verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  }
}
