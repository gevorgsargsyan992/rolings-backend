import { MigrationInterface, QueryRunner } from "typeorm";

export class createInitialTables1700292005724 implements MigrationInterface {
    name = 'createInitialTables1700292005724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "email_system" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "subject" character varying NOT NULL, "template" character varying NOT NULL, "email" character varying NOT NULL, "dynamicTemplateData" jsonb, CONSTRAINT "PK_faffd24661093c7477611c09e70" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "id" SERIAL NOT NULL, "type" smallint NOT NULL, "email" character varying NOT NULL, "verifiedAt" TIMESTAMP WITH TIME ZONE, "verificationCode" smallint, "codeExpiresAt" TIMESTAMP WITH TIME ZONE, "firstName" character varying, "lastName" character varying, "avatarImage" character varying, "phoneNumber" character varying, "password" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "email_system"`);
    }

}
