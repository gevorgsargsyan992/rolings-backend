import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { VideoStatus } from "src/helpers/video-status";

export class GetVideoDto {
  @IsString()
  @IsNotEmpty()
  uuid: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class CreateVideoDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  status: VideoStatus;
}
