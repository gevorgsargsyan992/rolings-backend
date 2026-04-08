// tablet-status.cron.ts
import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { TabletStatus } from "./entities/tablet-status.entity";
import { Repository } from "typeorm";

@Injectable()
export class TabletStatusCron {
  constructor(
    @InjectRepository(TabletStatus)
    private tabletStatusRepository: Repository<TabletStatus>,
  ) {}

  // Runs every minute
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCleanup() {
    return this.tabletStatusRepository
      .createQueryBuilder()
      .delete()
      .from(TabletStatus)
      .where("createdAt < NOW() - INTERVAL '7 day'")
      .orWhere("lat = 0")
      .execute();
  }
}
