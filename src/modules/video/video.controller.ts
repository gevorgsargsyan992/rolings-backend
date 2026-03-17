import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";

import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { VideoService } from "./video.service";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { AssignVideoToTabletsDto, CreateVideoDto, UpdateVideoDto } from "./dto/get-video.dto";

@Controller("video")
@ApiBearerAuth("BearerAuth")
@UseGuards(JwtAuthGuard)
@ApiTags("video")
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

  @ApiOperation({
    summary: "Get not assigned videos by tabletId",
  })
  @Get("/notAssigned/:tabletId")
  notAssignedVideos(@Param("tabletId") id: string) {
    return this.videoService.notAssignedVideos(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update video",
  })
  update(@Body() updateVideoDto: UpdateVideoDto, @Param("id") id: string) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Assign video to tablets",
  })
  assignToTablets(@Body() assignVideoToTabletsDto: AssignVideoToTabletsDto, @Param("id") id: string) {
    return this.videoService.assignVideoToTablets(+id, assignVideoToTabletsDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "delete video",
  })
  remove(@Param("id") id: string) {
    return this.videoService.remove(+id);
  }
}
