import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  CreateTabletDto,
  CreateTabletStatusDto,
} from "./dto/create-tablet.dto";
import { Tablet } from "./entities/tablet.entity";
import { getEncryptedPassword } from "src/helpers/get-encrypted-password";
import { TabletStatus } from "./entities/tablet-status.entity";

@Injectable()
export class TabletService {
  constructor(
    @InjectRepository(Tablet)
    private tabletRepository: Repository<Tablet>,
    @InjectRepository(TabletStatus)
    private tabletStatusRepository: Repository<TabletStatus>
  ) {}

  async create(body: CreateTabletDto) {
    const token = await getEncryptedPassword(body.uuid);
    const dataForInsert = {
      uuid: body.uuid,
      status: body.status,
      token,
    };
    const newTablet = await this.tabletRepository
      .createQueryBuilder()
      .insert()
      .into(Tablet)
      .values(dataForInsert)
      .execute();
    // create tablet
    return newTablet;
  }

  async createTabletStatus(body: CreateTabletStatusDto) {
    const dataForInsert = {
      status: body.status,
      tabletId: body.tabletId,
      lat: body.lat,
      lng: body.lng,
    };

    return this.tabletStatusRepository
      .createQueryBuilder()
      .insert()
      .into(TabletStatus)
      .values(dataForInsert)
      .execute();
  }

  async validate(email: string) {
    const tablet = await this.tabletRepository.findOne({
      where: { uuid: email },
    });
    if (!tablet) {
      return null;
    }
    return tablet;
  }

  async getTablet(email: string) {
    const tablet = await this.tabletRepository.findOne({
      where: { uuid: email },
    });
    if (!tablet) {
      return null;
    }
    return tablet;
  }
}
