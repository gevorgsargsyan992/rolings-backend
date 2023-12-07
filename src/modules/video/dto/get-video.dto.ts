import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class GetVideoDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}
