import { Injectable } from "@nestjs/common";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { Vehicle } from "./entities/vehicle.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private videoRepository: Repository<Vehicle>
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
}
