import {Model, Table, Column, Unique, AllowNull, BelongsTo} from "sequelize-typescript";
import {RefreshToken} from "./refreshToken";

// @ts-ignore
@Table
export class User extends Model {
  @Unique
  @AllowNull(false)
  @Column
  email: string;

  @Column
  @AllowNull(false)
  password: string;

  @Column
  phone: string;

  @BelongsTo(() => RefreshToken, `userId`)
  refreshToken: RefreshToken
}
