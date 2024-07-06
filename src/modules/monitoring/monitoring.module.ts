import { Module } from "@nestjs/common";
import { MonitoringService } from "./monitoring.service";
import { MonitoringController } from "./monitoring.controller";
import { VehicleStats } from "../vehicle/entities/vehicle-stats.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([VehicleStats])],
  controllers: [MonitoringController],
  providers: [MonitoringService],
})
export class MonitoringModule {}
