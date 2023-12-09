import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseModel } from "../../../helpers/base.model";
import { Tablet } from "./tablet.entity";

@Entity("tablet-status")
export class TabletStatus extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  status: number;

  @Column({ nullable: false })
  lat: number;

  @Column({ nullable: false })
  lng: number;

  @ManyToOne(() => Tablet, (t) => t.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "tablet_id", referencedColumnName: "id" }])
  tabletId: number;
}
