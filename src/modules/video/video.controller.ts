import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";

import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { VideoService } from "./video.service";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { CreateVideoDto } from "./dto/get-video.dto";

@Controller("Video")
@ApiBearerAuth("BearerAuth")
@UseGuards(JwtAuthGuard)
@ApiTags("Video")
export class TabletController {
  constructor(private readonly videoService: VideoService) {}

  @ApiOperation({
    summary: "Get videos by tabletId",
  })
  @Get(":tabletId")
  getVideo(@Param("tabletId") id: string) {
    return this.videoService.get(+id);
  }

  @ApiOperation({
    summary: "Get all",
  })
  @Get()
  get() {
    return this.videoService.getAll();
  }

  @ApiOperation({
    summary: "Create video",
  })
  @Post("")
  createTabletStatus(@Body() body: CreateVideoDto) {
    return this.videoService.createVideo(body);
  }
}
