import {
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseModel } from "../../../helpers/base.model";
import { Tablet } from "../../tablet/entities/tablet.entity";
import { Videos } from "./video.entity";

@Entity("tablet-video")
@Index("unique_tablet_video", ["tabletId", "videoId"], {
  unique: true,
  where: '"deletedAt" IS NULL',
})
export class TabletVideo extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tablet, (t) => t.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "tablet_id", referencedColumnName: "id" }])
  tabletId: number;

  @ManyToOne(() => Videos, (v) => v.id, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "video_id", referencedColumnName: "id" }])
  videoId: number;
}
