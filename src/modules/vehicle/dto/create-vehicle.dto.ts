import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { VehicleStatus } from "src/helpers/vehicle";

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
  @IsEnum(VehicleStatus, { each: true })
  status: VehicleStatus;

  @IsString()
  @IsNotEmpty()
  color: string;
}
