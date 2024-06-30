import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Videos } from "./entities/video.entity";
import { TabletVideo } from "./entities/tablet-video.entity";
import { CreateVideoDto } from "./dto/get-video.dto";

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Videos)
    private videoRepository: Repository<Videos>,
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
    return this.videoRepository
      .createQueryBuilder("v")
      .select(`v.id, v.createdAt, v.url, v.status, v.name`)
      .getRawMany();
  }

  async createVideo(body: CreateVideoDto) {
    const dataForInsert = {
      url: body.url,
      name: body.name,
      status: body.status,
    };
    const newVideo = await this.videoRepository
      .createQueryBuilder()
      .insert()
      .into(Videos)
      .values(dataForInsert)
      .execute();

    return newVideo;
  }

  async notAssignedVideos(id: number) {
    return this.videoRepository
      .createQueryBuilder("v")
      .select(`v.id, v.createdAt, v.url, v.status, v.name`)
      .leftJoin(
        "tablet-video",
        "tv",
        "tv.video_id = v.ID AND tv.tablet_id = :tabletId",
        { tabletId: id }
      )
      .where(`tv.ID IS NULL and v."deletedAt" IS NULL`)
      .getRawMany();
  }
}
