import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsArray } from "class-validator";
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
  @IsOptional()
  status?: VideoStatus;
}

export class AssignVideoToTabletsDto {
  @IsArray()
  @IsNotEmpty()
  tabletIds: number[];
}

export class UpdateVideoDto extends PartialType(CreateVideoDto) {}
