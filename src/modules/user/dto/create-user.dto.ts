import {
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  IsOptional,
} from "class-validator";
import { EmailDto } from "../../../helpers/email.dto";
import { passwordRegexp } from "src/helpers/common-regexps";

export class CreateUserDto extends EmailDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(passwordRegexp, {
    message:
      "Password must include letter, number and at least one Uppercase letter",
  })
  password: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  companyName: string;
}
