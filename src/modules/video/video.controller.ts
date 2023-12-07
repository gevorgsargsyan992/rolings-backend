import { Controller, Get, Param } from "@nestjs/common";

import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { VideoService } from "./video.service";

@Controller("Video")
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
}
