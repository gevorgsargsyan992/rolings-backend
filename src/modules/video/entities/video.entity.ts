import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "../../../helpers/base.model";

@Entity("videos")
export class Videos extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false })
  status: number;
}
