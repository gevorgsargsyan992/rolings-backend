import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { Vehicle } from "./entities/vehicle.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWeeklyReportDto } from "./dto/create-report.dto";
import { VehicleStats } from "./entities/vehicle-stats.entity";

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private videoRepository: Repository<Vehicle>,
    @InjectRepository(VehicleStats)
    private vehicleStatsRepository: Repository<VehicleStats>
  ) {}

  async create(body: CreateVehicleDto) {
    const dataForInsert = {
      licensePlate: body.licensePlate,
      name: body.name,
      status: body.status,
      color: body.color,
    };
    const newVehicle = await this.videoRepository
      .createQueryBuilder()
      .insert()
      .into(Vehicle)
      .values(dataForInsert)
      .execute();
    return newVehicle;
  }

  findAll() {
    return `This action returns all vehicle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }

  async createReport(body: CreateWeeklyReportDto) {
    if (!body.token || body.token !== "YkVJtOgrXeawasyqb") {
      throw new BadRequestException("Token is required");
    }
    const dataForInsert = {
      vehicleId: body.vehicleId,
      reportDate: body.reportDate,
      clientCount: body.clientCount,
      playedVideoCount: body.playedVideoCount,
    };
    const newVehicle = await this.vehicleStatsRepository
      .createQueryBuilder()
      .insert()
      .into(VehicleStats)
      .values(dataForInsert)
      .execute();
    return newVehicle;
  }
}
