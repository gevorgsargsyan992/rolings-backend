import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionInVehicleTable1769674107785 implements MigrationInterface {
    name = 'AddDescriptionInVehicleTable1769674107785'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" ADD "description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "description"`);
    }

}
