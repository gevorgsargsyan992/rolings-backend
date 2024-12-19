import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import {
  UpdateVehicleDto,
  UpdateVehicleTabletDto,
} from "./dto/update-vehicle.dto";
import { Vehicle } from "./entities/vehicle.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateWeeklyReportDto } from "./dto/create-report.dto";
import { VehicleStats } from "./entities/vehicle-stats.entity";
import { VehicleTablet } from "./entities/vehicle-tablet.entity";
import { VehicleTabletAction } from "src/helpers/vehicle";

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(VehicleStats)
    private vehicleStatsRepository: Repository<VehicleStats>,
    @InjectRepository(VehicleTablet)
    private vehicleTabletRepository: Repository<VehicleTablet>
  ) {}

  async create(body: CreateVehicleDto) {
    const dataForInsert = {
      licensePlate: body.licensePlate,
      name: body.name,
      status: body.status,
      color: body.color,
    };
    const newVehicle = await this.vehicleRepository
      .createQueryBuilder()
      .insert()
      .into(Vehicle)
      .values(dataForInsert)
      .execute();
    return newVehicle;
  }

  async findAll(offset: number = 0, limit: number = 10) {
    const result = await this.vehicleRepository
      .createQueryBuilder("v")
      .select([
        `v.id AS "id"`,
        `v."licensePlate" AS "licensePlate"`,
        `v.name AS "name"`,
        `v.status AS "status"`,
        `v.color AS "color"`,
        `vt."tabletIdId" AS "tabletId"`,
      ])
      .leftJoin("vehicle-tablet", "vt", "vt.vehicleIdId = v.id")
      .orderBy("v.id", "ASC")
      .offset(offset)
      .limit(limit)
      .getRawMany();

    const count = await this.vehicleRepository.count();

    return { result, count };
  }

  findOne(id: number) {
    return this.vehicleRepository
      .createQueryBuilder("v")
      .select([
        `v.id AS "id"`,
        `v."licensePlate" AS "licensePlate"`,
        `v.name AS "name"`,
        `v.status AS "status"`,
        `v.color AS "color"`,
        `v.createdAt AS "createdAt"`,
        `vt."tabletIdId" AS "tabletId"`,
      ])
      .leftJoin("vehicle-tablet", "vt", "vt.vehicleIdId = v.id")
      .where("v.id = :id", { id })
      .getRawOne();
  }

  async update(id: number, updateVehicleDto: CreateVehicleDto) {
    await this.vehicleRepository.update(
      {
        id,
      },
      {
        ...updateVehicleDto,
      }
    );

    return this.findAll(0, 20);
  }

  async remove(id: number) {
    await this.vehicleRepository.softDelete({ id });
    await this.vehicleTabletRepository.softDelete({ vehicleId: id });

    return { success: true };
  }

  async updateTablet(
    id: number,
    updateVehicleTabletDto: UpdateVehicleTabletDto
  ) {
    if( !updateVehicleTabletDto.tabletId && updateVehicleTabletDto.action !== VehicleTabletAction.REMOVE) {
      throw new BadRequestException('Tablet id is required');
    }
    // delete tablet from vehicle
    if (updateVehicleTabletDto.action === VehicleTabletAction.REMOVE && updateVehicleTabletDto.tabletId === 0) {
      await this.vehicleTabletRepository.softDelete({
        vehicleId: id,
      });
      return { success: true };
    }
    // update or relation
    const vehicleTablet = await this.vehicleTabletRepository.findOne({
      where: { tabletId: updateVehicleTabletDto.tabletId },
    });
    if (vehicleTablet) {
      if (vehicleTablet.vehicleId !== id) {
        // assign tablet to another vehicle
        await this.vehicleTabletRepository.softDelete({
          tabletId: updateVehicleTabletDto.tabletId,
        });
        await this.vehicleTabletRepository.softDelete({ vehicleId: id });
      } else return { success: true };
    }
    // Create new vehicle tablet record (assign tablet to new vehicle)
    await this.vehicleRepository
      .createQueryBuilder()
      .insert()
      .into(VehicleTablet)
      .values({ tabletId: updateVehicleTabletDto.tabletId, vehicleId: id })
      .execute();

    return { success: true };
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
