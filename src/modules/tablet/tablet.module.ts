import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TabletService } from "./tablet.service";
import { Tablet } from "./entities/tablet.entity";
import { TabletController } from "./tablet.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Tablet])],
  providers: [TabletService],
  controllers: [TabletController],
  exports: [TabletService],
})
export class TabletModule {}
