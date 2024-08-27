import { IsNotEmpty, IsNumber, IsString, Matches, Max, Min, MinLength } from 'class-validator';
import { EmailDto } from '../../../helpers/email.dto';
import { passwordRegexp } from 'src/helpers/common-regexps';

export class VerifyUserDto extends EmailDto {
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 0,
  })
  @IsNotEmpty()
  @Min(1000, { message: 'Verification code must be exactly 4 digits' })
  @Max(9999, { message: 'Verification code must be exactly 4 digits' })
  verificationCode: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(passwordRegexp, {
    message:
      'Password must include letter, number and at least one Uppercase letter',
  })
  password: string;


}
