export const ModelName = Symbol("modelName");

const db = require('../models')
export class DbBaseModel<T, U> {
  public dbInstance = null;
  public model: unknown

  constructor(dbInstance, model) {
    this.dbInstance = dbInstance;
    this.model = model;
    Object.assign(this, model);
    this[ModelName] = model.constructor.name;
  }

  async destroy(id) {
    const transaction = await db.sequelize.transaction()
    try {
      await this.dbInstance.destroy({
        where: {
          id,
        },
      }, {transaction});
      await transaction.commit()
    } catch(error) {
      await transaction.rollback();
      throw new Error('Bad request');
    }
  }
}
