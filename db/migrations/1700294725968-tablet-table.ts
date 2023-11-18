import { MigrationInterface, QueryRunner } from "typeorm";

export class tabletTable1700294725968 implements MigrationInterface {
    name = 'tabletTable1700294725968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tablet" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "uuid" character varying NOT NULL, "status" integer NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_a205d9bc8b5054b434883f176f8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tablet"`);
    }

}
