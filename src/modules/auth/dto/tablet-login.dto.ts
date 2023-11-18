import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class TabletLoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
