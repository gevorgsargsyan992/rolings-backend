import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseModel } from "../../../helpers/base.model";
import { Vehicle } from "./vehicle.entity";

@Entity("vehicle-stats")
export class VehicleStats extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, (v) => v.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn([{ referencedColumnName: "id" }])
  vehicleId: number;

  @Column({ type: "timestamptz", nullable: false })
  reportDate: Date;

  @Column({ nullable: false })
  clientCount: number;

  @Column({ nullable: true })
  playedVideoCount: number;
}
