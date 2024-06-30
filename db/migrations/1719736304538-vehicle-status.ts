import { MigrationInterface, QueryRunner } from "typeorm";

export class VehicleStatus1719736304538 implements MigrationInterface {
  name = "VehicleStatus1719736304538";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "vehicle" ADD "status" integer NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vehicle" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "vehicle" ADD "status" character varying NOT NULL`
    );
  }
}
