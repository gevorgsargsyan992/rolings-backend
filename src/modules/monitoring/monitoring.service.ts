import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { VehicleStats } from "../vehicle/entities/vehicle-stats.entity";
import { Repository } from "typeorm";

@Injectable()
export class MonitoringService {
  constructor(
    @InjectRepository(VehicleStats)
    private vehicleStatsRepository: Repository<VehicleStats>
  ) {}
  async findWeekly() {
    const result = await this.vehicleStatsRepository
      .createQueryBuilder("vs")
      .select("DATE(vs.reportDate)", "reportDate")
      .addSelect("SUM(vs.clientCount)", "clientCount")
      .groupBy("DATE(vs.reportDate)")
      .orderBy("DATE(vs.reportDate)")
      .getRawMany();
    return result.map((row) => ({
      x: row.reportDate,
      y: row.clientCount,
    }));
  }

  async findMonthly() {
    const result = await this.vehicleStatsRepository
      .createQueryBuilder("vs")
      .select("DATE_TRUNC('month', vs.reportDate)", "reportMonth")
      .addSelect("SUM(vs.clientCount)", "clientCount")
      .groupBy("DATE_TRUNC('month', vs.reportDate)")
      .orderBy("DATE_TRUNC('month', vs.reportDate)")
      .getRawMany();

    return result.map((row) => ({
      label: row.reportMonth,
      y: row.clientCount,
    }));
  }

  async findCarsReport() {
    const result = await this.vehicleStatsRepository
      .createQueryBuilder("vs")
      .select([
        "vs.vehicleIdId",
        "vl.name AS vehicle",
        "vs.clientCount AS clients",
        "vs.reportDate AS date",
      ])
      .leftJoin("vehicle", "vl", "vl.id = vs.vehicleIdId")
      .distinctOn(["vs.vehicleIdId"])
      .orderBy("vs.vehicleIdId")
      .addOrderBy("vs.reportDate", "DESC")
      .getRawMany();
    return result.map((row) => ({
      y: row.clients,
      label: row.vehicle,
    }));
  }
}
