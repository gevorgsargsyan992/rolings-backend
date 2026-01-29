import { MigrationInterface, QueryRunner } from "typeorm";

export class IndexInTabletStatus1769673487049 implements MigrationInterface {
    name = 'IndexInTabletStatus1769673487049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "idx_tablet_status_tablet_created_at" ON "tablet-status" ("tablet_id", "createdAt") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_tablet_status_tablet_created_at"`);
    }

}
