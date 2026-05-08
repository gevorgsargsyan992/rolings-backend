import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriority1778237137005 implements MigrationInterface {
    name = 'AddPriority1778237137005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tablet-video" ADD "priority" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {;
        await queryRunner.query(`ALTER TABLE "tablet-video" DROP COLUMN "priority"`);
    }

}
