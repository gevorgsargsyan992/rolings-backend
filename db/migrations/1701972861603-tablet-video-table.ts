import { MigrationInterface, QueryRunner } from "typeorm";

export class TabletVideoTable1701972861603 implements MigrationInterface {
    name = 'TabletVideoTable1701972861603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tablet-video" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "tablet_id" integer NOT NULL, "video_id" integer NOT NULL, CONSTRAINT "PK_b8dce362e7a99536c3df7028516" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tablet-video" ADD CONSTRAINT "FK_0dd99bc7f224469319b64cde530" FOREIGN KEY ("tablet_id") REFERENCES "tablet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tablet-video" ADD CONSTRAINT "FK_198dd684638b9cbf7a72d9caa60" FOREIGN KEY ("video_id") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tablet-video" DROP CONSTRAINT "FK_198dd684638b9cbf7a72d9caa60"`);
        await queryRunner.query(`ALTER TABLE "tablet-video" DROP CONSTRAINT "FK_0dd99bc7f224469319b64cde530"`);
        await queryRunner.query(`DROP TABLE "tablet-video"`);
    }

}
