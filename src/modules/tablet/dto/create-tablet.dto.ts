import { IsString, IsNotEmpty, IsNumber } from "class-validator";

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
