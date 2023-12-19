import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";

import { TabletService } from "./tablet.service";
import {
  CreateTabletDto,
  CreateTabletStatusDto,
} from "./dto/create-tablet.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";

@Controller("tablet")
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
  @ApiBearerAuth("BearerAuth")
  @UseGuards(JwtAuthGuard)
  @Post("/status")
  createTabletStatus(@Body() body: CreateTabletStatusDto) {
    return this.tabletService.createTabletStatus(body);
  }
}
