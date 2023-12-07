import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { VideoService } from "./video.service";
import { Videos } from "./entities/video.entity";
import { TabletController } from "./video.controller";
import { TabletVideo } from "./entities/tablet-video.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Videos, TabletVideo])],
  providers: [VideoService],
  controllers: [TabletController],
  exports: [VideoService],
})
export class VideoModule {}
