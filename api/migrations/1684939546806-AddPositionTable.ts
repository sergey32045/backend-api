import { MigrationInterface, QueryRunner } from "typeorm"

export class AddPositionTable1684939546806 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS positions (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS positions`)
    }

}
