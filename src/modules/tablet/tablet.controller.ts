import { Controller, Post, Body } from "@nestjs/common";

import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { TabletService } from "./tablet.service";
import { CreateTabletDto } from "./dto/create-tablet.dto";

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
}
