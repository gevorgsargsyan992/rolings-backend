import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TabletService } from "./tablet.service";
import { Tablet } from "./entities/tablet.entity";
import { TabletController } from "./tablet.controller";
import { TabletStatus } from "./entities/tablet-status.entity";
import { TabletVideo } from "../video/entities/tablet-video.entity";
import { TabletStatusCron } from "./tablet-status.cron.ts";

@Module({
  imports: [TypeOrmModule.forFeature([Tablet, TabletStatus, TabletVideo])],
  providers: [TabletService, TabletStatusCron],
  controllers: [TabletController],
  exports: [TabletService],
})
export class TabletModule {}
