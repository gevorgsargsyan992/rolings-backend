import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "../../../helpers/base.model";

@Entity("users")
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "smallint" })
  type: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ type: "timestamptz", nullable: true })
  verifiedAt: Date;

  @Column({ nullable: true, type: "smallint" })
  verificationCode: number;

  @Column({ type: "timestamptz", nullable: true })
  codeExpiresAt: Date;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  avatarImage: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  password: string;
}
