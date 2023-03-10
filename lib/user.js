const db = require('../models');

export class User {
  email;
  password;

  phone;

  constructor() {
  }

}

export class DbUser extends User {
  constructor() {
    super();
  }



}
