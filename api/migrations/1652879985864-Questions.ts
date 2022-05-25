import {MigrationInterface, QueryRunner} from "typeorm";

export class Questions1652879985864 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS questions (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                test_id INT UNSIGNED NOT NULL,
                question_category_id INT UNSIGNED NOT NULL,
                level TINYINT UNSIGNED,
                question TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX test_id_index (test_id),
                FOREIGN KEY (test_id)
                    REFERENCES tests(id)
                    ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS questions
        `);
    }

}
