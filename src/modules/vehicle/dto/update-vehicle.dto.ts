import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {}

export class UpdateVehicleTabletDto {
    @IsNumber()
    @IsNotEmpty()
    tabletId: number;
}
