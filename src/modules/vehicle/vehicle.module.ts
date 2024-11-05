import { Module } from "@nestjs/common";
import { VehicleService } from "./vehicle.service";
import { VehicleController } from "./vehicle.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Vehicle } from "./entities/vehicle.entity";
import { VehicleStats } from "./entities/vehicle-stats.entity";
import { VehicleTablet } from "./entities/vehicle-tablet.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, VehicleStats, VehicleTablet])],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
