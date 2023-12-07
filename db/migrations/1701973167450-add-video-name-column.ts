import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVideoNameColumn1701973167450 implements MigrationInterface {
    name = 'AddVideoNameColumn1701973167450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "videos" DROP COLUMN "name"`);
    }

}
