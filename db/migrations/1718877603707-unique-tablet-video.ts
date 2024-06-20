import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueTabletVideo1718877603707 implements MigrationInterface {
  name = "UniqueTabletVideo1718877603707";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "unique_tablet_video" ON "tablet-video" ("tablet_id", "video_id") WHERE "deletedAt" IS NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."unique_tablet_video"`);
  }
}
