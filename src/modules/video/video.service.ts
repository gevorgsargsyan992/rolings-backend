import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Videos } from "./entities/video.entity";
import { TabletVideo } from "./entities/tablet-video.entity";
import { CreateVideoDto, UpdateVideoDto } from "./dto/get-video.dto";
import { VideoStatus } from "src/helpers/video-status";

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Videos)
    private videoRepository: Repository<Videos>,
    @InjectRepository(TabletVideo)
    private tabletVideoRepository: Repository<TabletVideo>,
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
      .orderBy("v.id", "DESC")
      .getRawMany();
  }

  async createVideo(body: CreateVideoDto) {
    const dataForInsert = {
      url: body.url,
      name: body.name,
      status: VideoStatus.ACTIVE,
    };
    await this.videoRepository
      .createQueryBuilder()
      .insert()
      .into(Videos)
      .values(dataForInsert)
      .execute();

    return { success: true };
  }

  async update(id: number, body: UpdateVideoDto) {
    await this.videoRepository.update(
      {
        id,
      },
      {
        ...body,
      }
    );
    return { success: true }
  }

  async remove(id: number) {
    await this.videoRepository.softDelete({ id });
    await this.tabletVideoRepository.softDelete({ videoId: id });

    return { success: true };
  }


  async notAssignedVideos(id: number) {
    return this.videoRepository
      .createQueryBuilder("v")
      .select(`v.id, v.createdAt, v.url, v.status, v.name`)
      .leftJoin(
        "tablet-video",
        "tv",
        "tv.video_id = v.ID AND tv.tablet_id = :tabletId",
        { tabletId: id },
      )
      .where(`tv.ID IS NULL and v."deletedAt" IS NULL`)
      .getRawMany();
  }
}
