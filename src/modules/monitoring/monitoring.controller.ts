import { Controller, Get, UseGuards } from "@nestjs/common";
import { MonitoringService } from "./monitoring.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";

@Controller("monitoring")
@ApiBearerAuth("BearerAuth")
@UseGuards(JwtAuthGuard)
@ApiTags("monitoring")
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @ApiOperation({
    summary: "Get weekly report",
  })
  @Get("/weekly")
  findWeekly() {
    return [];
  }

  @ApiOperation({
    summary: "Get monthly report",
  })
  @Get("/monthly")
  findMonthly() {
    return [];
  }

  @ApiOperation({
    summary: "Get weekly report for each car",
  })
  @Get("/cars")
  findCarsReport() {
    return [];
  }
}
