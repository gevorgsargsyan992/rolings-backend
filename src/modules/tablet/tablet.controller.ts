import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";

import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { TabletService } from "./tablet.service";
import {
  AssignVideoDto,
  CreateTabletDto,
  CreateTabletStatusDto,
  UpdateTabletInfoDto,
} from "./dto/create-tablet.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";

@Controller("tablet")
@ApiBearerAuth("BearerAuth")
@UseGuards(JwtAuthGuard)
@ApiTags("Tablet")
export class TabletController {
  constructor(private readonly tabletService: TabletService) {}

  @ApiOperation({
    summary: "Create tablet",
  })
  @Post()
  createTablet(@Body() createTabletDto: CreateTabletDto) {
    return this.tabletService.create(createTabletDto);
  }

  @ApiOperation({
    summary: "Create tablet status and location by tabletId",
  })
  @Post("/status")
  createTabletStatus(@Body() body: CreateTabletStatusDto) {
    return this.tabletService.createTabletStatus(body);
  }

  @ApiOperation({
    summary: "Get all tablets",
  })
  @Get()
  findAll() {
    return this.tabletService.findAll();
  }

  @ApiOperation({
    summary: "Get tablet info",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tabletService.findOne(+id);
  }

  @ApiOperation({
    summary: "Update tablet info",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTabletInfoDto: UpdateTabletInfoDto
  ) {
    return this.tabletService.update(+id, updateTabletInfoDto);
  }

  @ApiOperation({
    summary: "Unassign video for tablet",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tabletService.unassignVideo(+id);
  }

  @ApiOperation({
    summary: "Assign video to tablet",
  })
  @Post("assign-video")
  assignVideo(@Body() dto: AssignVideoDto) {
    return this.tabletService.assignVideo(dto);
  }
}
