import { Type } from "class-transformer";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateWeeklyReportDto {
  @IsNumber()
  @IsNotEmpty()
  vehicleId: number;

  @IsNumber()
  @IsOptional()
  playedVideoCount: number;

  @IsNumber()
  @IsNotEmpty()
  clientCount: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  reportDate: Date;

  @IsString()
  @IsNotEmpty()
  token: string;
}
