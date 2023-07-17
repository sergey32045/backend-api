import {MigrationInterface, QueryRunner} from "typeorm";

export class TestsDrafts implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS tests_drafts (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                test_id INT UNSIGNED NOT NULL,
                test_category_id INT UNSIGNED,
                description MEDIUMTEXT,
                title MEDIUMTEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (test_id)
                    REFERENCES tests(id)
                    ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS tests_drafts
        `);
    }

}
