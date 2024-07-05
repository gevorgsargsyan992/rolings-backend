import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseModel } from "../../../helpers/base.model";
import { Tablet } from "src/modules/tablet/entities/tablet.entity";
import { Vehicle } from "./vehicle.entity";

@Entity("vehicle-tablet")
@Index("unique_vehicle", ["vehicleId"], {
  unique: true,
  where: '"deletedAt" IS NULL',
})
@Index("unique_tablet", ["tabletId"], {
  unique: true,
  where: '"deletedAt" IS NULL',
})
export class VehicleTablet extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vehicle, (v) => v.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn([{ referencedColumnName: "id" }])
  vehicleId: number;

  @ManyToOne(() => Tablet, (t) => t.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn([{ referencedColumnName: "id" }])
  tabletId: number;
}
