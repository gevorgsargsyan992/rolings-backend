import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "../../../helpers/base.model";

@Entity("tablet")
export class Tablet extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  uuid: string;

  @Column({ nullable: false })
  status: number;

  @Column({ nullable: false })
  token: string;
}
