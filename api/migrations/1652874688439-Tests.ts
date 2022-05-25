import {MigrationInterface, QueryRunner} from "typeorm";

export class Tests1652874688439 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS tests (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                test_category_id INT UNSIGNED,
                description MEDIUMTEXT,
                title MEDIUMTEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS tests
        `);
    }

}
