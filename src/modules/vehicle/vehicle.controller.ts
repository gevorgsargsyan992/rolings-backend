import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { VehicleService } from "./vehicle.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto } from "./dto/update-vehicle.dto";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { CreateWeeklyReportDto } from "./dto/create-report.dto";

@Controller("vehicle")
@ApiBearerAuth("BearerAuth")
@UseGuards(JwtAuthGuard)
@ApiTags("Vehicle")
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOperation({
    summary: "Create Vehicle",
  })
  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.vehicleService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.vehicleService.remove(+id);
  }

  @ApiOperation({
    summary: "Create weekly report",
  })
  @Post("report")
  createReport(@Body() body: CreateWeeklyReportDto) {
    return this.vehicleService.createReport(body);
  }
}
