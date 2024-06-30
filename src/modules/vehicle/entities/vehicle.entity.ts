import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "../../../helpers/base.model";

@Entity("vehicle")
export class Vehicle extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  licensePlate: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false })
  status: number;

  @Column({ nullable: false })
  color: string;
}
