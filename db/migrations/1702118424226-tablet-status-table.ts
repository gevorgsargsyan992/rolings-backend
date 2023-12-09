import { MigrationInterface, QueryRunner } from "typeorm";

export class TabletStatusTable1702118424226 implements MigrationInterface {
  name = "TabletStatusTable1702118424226";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tablet-status" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "status" integer NOT NULL, "lat" float NOT NULL, "lng" float NOT NULL, "tablet_id" integer NOT NULL, CONSTRAINT "PK_1d88e6af7d714170ea584b8c1b9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "tablet-status" ADD CONSTRAINT "FK_da0d59bf13b175b5c66a38668fd" FOREIGN KEY ("tablet_id") REFERENCES "tablet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tablet-status" DROP CONSTRAINT "FK_da0d59bf13b175b5c66a38668fd"`
    );
    await queryRunner.query(`DROP TABLE "tablet-status"`);
  }
}
