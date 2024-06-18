import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { TabletStatus } from "src/helpers/tablet-status";

export class CreateTabletDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsNumber()
  @IsNotEmpty()
  status: number;
}

export class CreateTabletStatusDto {
  @IsNumber()
  @IsNotEmpty()
  tabletId: number;
  @IsNumber()
  @IsNotEmpty()
  status: number;
  @IsNumber()
  @IsNotEmpty()
  lat: number;
  @IsNumber()
  @IsNotEmpty()
  lng: number;
}

export class UpdateTabletInfoDto {
  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  status: TabletStatus;
}
