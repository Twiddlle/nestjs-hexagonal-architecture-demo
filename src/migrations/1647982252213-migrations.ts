import {MigrationInterface, QueryRunner} from "typeorm";

export class migrations1647982252213 implements MigrationInterface {
    name = 'migrations1647982252213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "articleCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "articleCount"`);
    }

}
