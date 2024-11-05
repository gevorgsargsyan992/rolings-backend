import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { VehicleTabletAction } from 'src/helpers/vehicle';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}

export class UpdateVehicleTabletDto {
    @IsNumber()
    @IsNotEmpty()
    tabletId: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(VehicleTabletAction, { each: true })
    action: string;
}
