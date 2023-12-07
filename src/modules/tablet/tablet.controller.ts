import { Controller, Post, Body, UseGuards } from "@nestjs/common";

import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { TabletService } from "./tablet.service";
import { CreateTabletDto } from "./dto/create-tablet.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";

@Controller("tablet")
@ApiTags("Tablet")
@UseGuards(JwtAuthGuard)
export class TabletController {
  constructor(private readonly tabletService: TabletService) {}

  @ApiOperation({
    summary: "Create tablet",
  })
  @Post()
  createTablet(@Body() createTabletDto: CreateTabletDto) {
    return this.tabletService.create(createTabletDto);
  }
}
