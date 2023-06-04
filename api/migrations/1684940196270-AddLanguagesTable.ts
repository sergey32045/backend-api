import { MigrationInterface, QueryRunner } from "typeorm"

export class AddLanguagesTable1684940196270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS languages (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                title TEXT NOT NULL,
                code VARCHAR(2) NOT NULL
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS languages`)
    }

}
