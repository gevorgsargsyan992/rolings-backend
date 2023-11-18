import { IsString, IsNotEmpty } from "class-validator";
import { EmailDto } from "../../../helpers/email.dto";

export class CreateTabletDto extends EmailDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;
}
