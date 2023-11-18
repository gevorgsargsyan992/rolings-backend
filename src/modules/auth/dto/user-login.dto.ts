import {
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  IsBoolean,
} from 'class-validator';
import { EmailDto } from '../../../helpers/email.dto';
import { passwordRegexp } from 'src/helpers/common-regexps';

export class UserLoginDto extends EmailDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(passwordRegexp, {
    message:
      'Password must include letter, number and at least one Uppercase letter',
  })
  password: string;

  @IsBoolean()
  remember?: boolean;
}
