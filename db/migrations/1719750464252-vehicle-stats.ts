import { MigrationInterface, QueryRunner } from "typeorm";

export class VehicleStats1719750464252 implements MigrationInterface {
  name = "VehicleStats1719750464252";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vehicle-tablet" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "vehicleIdId" integer NOT NULL, "tabletIdId" integer NOT NULL, CONSTRAINT "PK_5c80f13375e6df5a1fad35df517" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "unique_tablet" ON "vehicle-tablet" ("tabletIdId") WHERE "deletedAt" IS NULL`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "unique_vehicle" ON "vehicle-tablet" ("vehicleIdId") WHERE "deletedAt" IS NULL`
    );
    await queryRunner.query(
      `CREATE TABLE "vehicle-stats" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "reportDate" TIMESTAMP WITH TIME ZONE NOT NULL, "clientCount" integer NOT NULL, "playedVideoCount" integer, "vehicleIdId" integer NOT NULL, CONSTRAINT "PK_b35d44b8bfae3d63508dccbd3b4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle-tablet" ADD CONSTRAINT "FK_8028c9efbbb28b00616d3289f41" FOREIGN KEY ("vehicleIdId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle-tablet" ADD CONSTRAINT "FK_ac38dc686dd468e7428258186fe" FOREIGN KEY ("tabletIdId") REFERENCES "tablet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle-stats" ADD CONSTRAINT "FK_757057c539823a02ad838db6af7" FOREIGN KEY ("vehicleIdId") REFERENCES "vehicle"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vehicle-stats" DROP CONSTRAINT "FK_757057c539823a02ad838db6af7"`
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle-tablet" DROP CONSTRAINT "FK_ac38dc686dd468e7428258186fe"`
    );
    await queryRunner.query(
      `ALTER TABLE "vehicle-tablet" DROP CONSTRAINT "FK_8028c9efbbb28b00616d3289f41"`
    );
    await queryRunner.query(`DROP TABLE "vehicle-stats"`);
    await queryRunner.query(`DROP INDEX "public"."unique_vehicle"`);
    await queryRunner.query(`DROP INDEX "public"."unique_tablet"`);
    await queryRunner.query(`DROP TABLE "vehicle-tablet"`);
  }
}
