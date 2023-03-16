import {Model, Table, Column, Unique, AllowNull, HasOne} from "sequelize-typescript";
import {User} from "./user";

@Table
export class RefreshToken extends Model {
  @Unique
  @AllowNull(false)
  @Column
  token: string;

  @Column
  @AllowNull(false)
  expiryDate: Date;

  @Column
  @HasOne(() => User, 'id')
  userId: number;

}
