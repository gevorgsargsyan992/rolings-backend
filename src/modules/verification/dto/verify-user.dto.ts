import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { EmailDto } from '../../../helpers/email.dto';

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
}
