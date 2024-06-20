import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  AssignVideoDto,
  CreateTabletDto,
  CreateTabletStatusDto,
  UpdateTabletInfoDto,
} from "./dto/create-tablet.dto";
import { Tablet } from "./entities/tablet.entity";
import { getEncryptedPassword } from "src/helpers/get-encrypted-password";
import { TabletStatus } from "./entities/tablet-status.entity";
import { VideoStatus } from "../../helpers/video-status";
import { TabletVideo } from "../video/entities/tablet-video.entity";

@Injectable()
export class TabletService {
  constructor(
    @InjectRepository(Tablet)
    private tabletRepository: Repository<Tablet>,
    @InjectRepository(TabletStatus)
    private tabletStatusRepository: Repository<TabletStatus>,
    @InjectRepository(TabletVideo)
    private tabletVideoRepository: Repository<TabletVideo>
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

  async findAll() {
    return this.tabletRepository
      .createQueryBuilder("tb")
      .select([
        'tb.id AS "id"',
        "tb.uuid",
        'tb.status AS "tabletStatus"',
        'tb.createdAt AS "createdAt"',
        'count(vd.id) AS "videoCount"',
      ])
      .leftJoin("tablet-video", "tbv", "tbv.tablet_id = tb.id")
      .leftJoin(
        "videos",
        "vd",
        `vd.id = tbv.video_id AND vd.status = ${VideoStatus.ACTIVE}`
      )
      .groupBy("tb.id")
      .orderBy("tb.id", "DESC")
      .getRawMany();
  }

  async findOne(id: number) {
    return this.tabletRepository
      .createQueryBuilder("tb")
      .select([
        'tb.id AS "id"',
        "tb.uuid",
        'tb.status AS "tabletStatus"',
        'tb.createdAt AS "createdAt"',
        'count(vd.id) AS "videoCount"',
        `json_agg(json_build_object('videoId', vd.id, 'videoName', vd.name, 'tabletVideoId', tbv.id)) AS videos`,
      ])
      .leftJoin("tablet-video", "tbv", "tbv.tablet_id = tb.id")
      .leftJoin(
        "videos",
        "vd",
        `vd.id = tbv.video_id AND vd.status = ${VideoStatus.ACTIVE}`
      )
      .where("tb.id= :id", { id })
      .groupBy("tb.id")
      .getRawMany();
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

  async update(id: number, dto: UpdateTabletInfoDto) {
    await this.tabletRepository.update(
      {
        id,
      },
      {
        status: dto.status,
      }
    );
    return this.tabletRepository.findOne({
      where: { id },
    });
  }

  async assignVideo(dto: AssignVideoDto) {
    let response = {
      success: true,
    };
    try {
      await this.tabletVideoRepository
        .createQueryBuilder()
        .insert()
        .into(TabletVideo)
        .values(dto)
        .execute();
    } catch (error) {
      response.success = false;
      return response;
    }
    return response;
  }

  async unassignVideo(tabletVideoId: number) {
    await this.tabletVideoRepository.softDelete(tabletVideoId);
    return { success: true };
  }
}
