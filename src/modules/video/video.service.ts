import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Videos } from "./entities/video.entity";
import { TabletVideo } from "./entities/tablet-video.entity";

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Videos)
    private tabletRepository: Repository<Videos>,
    @InjectRepository(TabletVideo)
    private tabletVideoRepository: Repository<TabletVideo>
  ) {}

  async get(id: number) {
    const videos = await this.tabletVideoRepository
      .createQueryBuilder("tbv")
      .select(`*`)
      .where(`tbv."tablet_id"= :id`, {
        id,
      })
      .leftJoin("videos", "v", 'tbv."video_id" = v."id"')
      .execute();

    return videos;
  }

  async getAll() {
    return this.tabletRepository
      .createQueryBuilder("v")
      .select(`v.id, v.createdAt, v.url, v.status, v.name`)
      .getRawMany();
  }
}
