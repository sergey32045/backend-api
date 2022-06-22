import { MigrationInterface, QueryRunner } from "typeorm"

export class AddAdminColumnUsersTable1655806359533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER table users ADD COLUMN roles JSON
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER table users DROP COLUMN roles
        `)
    }

}
