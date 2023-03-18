import {DbBaseModel} from "./base";
// import {Model} from "sequelize";

const db = require('../models');

export class User {
  email: string;
  password: string;
  phone: string;

  constructor() {}

}

export class DbUser extends DbBaseModel<DbUser, User>{
  constructor() {
    super(db.user, new User());
  }

  async create({email, password, phone}): Promise<any> {
    const transaction = await db.sequelize.transaction();
    try {
      const user = await this.dbInstance.create({
        email,
        password,
        phone,
      }, {transaction});
      await transaction.commit();
      return user;
    } catch(error) {
      console.error(error);
      await transaction.rollback()
      throw error;
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      return await this.dbInstance.findOne({
        where: {
          email
        }
      });
    } catch(error) {
      console.error(error)
    }
  }

}
