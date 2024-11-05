import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from "@nestjs/common";
import { VehicleService } from "./vehicle.service";
import { CreateVehicleDto } from "./dto/create-vehicle.dto";
import { UpdateVehicleDto, UpdateVehicleTabletDto } from "./dto/update-vehicle.dto";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { CreateWeeklyReportDto } from "./dto/create-report.dto";
import { PaginationDTO } from "src/helpers/pagination.dto";

@Controller("vehicle")
@ApiBearerAuth("BearerAuth")
@UseGuards(JwtAuthGuard)
@ApiTags("Vehicle")
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @ApiOperation({
    summary: "Create Vehicle",
  })
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  @ApiQuery({ type: PaginationDTO })
  @ApiOperation({
    summary: "Get all Vehicles with tablet",
  })
  findAll(@Query('offset') offset = 0, @Query('limit') limit = 20) {

    return this.vehicleService.findAll(offset, limit);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.vehicleService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({
    summary: "Update Vehicles info",
  })
  update(@Param("id") id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @Put(":id")
  @ApiOperation({
    summary: "Update or set tablet on Vehicle. action values (REMOVE, UPDATE)",
  })
  updateTablet(@Param("id") id: string, @Body() updateVehicleTabletDto: UpdateVehicleTabletDto) {
    return this.vehicleService.updateTablet(+id, updateVehicleTabletDto);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "delete vehicle",
  })
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
