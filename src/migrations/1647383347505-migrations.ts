import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1647383347505 implements MigrationInterface {
  name = 'migrations1647383347505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "body" character varying NOT NULL, "userId" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_855d4c8e93574fddefaab9225c6" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Articles"`);
  }
}
