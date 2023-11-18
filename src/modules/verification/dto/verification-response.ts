import { IsString, IsNotEmpty } from 'class-validator';

export class VerificationDTO {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
