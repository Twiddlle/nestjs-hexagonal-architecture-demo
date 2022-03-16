import {MigrationInterface, QueryRunner} from "typeorm";

export class migrations1647469005092 implements MigrationInterface {
    name = 'migrations1647469005092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Articles" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "Articles" ADD "userId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Articles" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "Articles" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
