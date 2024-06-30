import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { VehicleStatus } from "src/helpers/vehicle-status";

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  status: VehicleStatus;

  @IsString()
  @IsNotEmpty()
  color: string;
}
