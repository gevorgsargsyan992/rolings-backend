import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompanyName1717591853453 implements MigrationInterface {
  name = "AddCompanyName1717591853453";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "companyName" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "companyName"`);
  }
}
