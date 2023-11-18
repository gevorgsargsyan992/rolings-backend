import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateTabletDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsNumber()
  @IsNotEmpty()
  status: number;
}
