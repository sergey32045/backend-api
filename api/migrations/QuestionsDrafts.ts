import {MigrationInterface, QueryRunner} from "typeorm";

export class QuestionsDrafts implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS questions_drafts (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                question_id INT UNSIGNED DEFAULT NULL,
                test_id INT UNSIGNED NOT NULL,
                level TINYINT UNSIGNED,
                question TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX test_draft_id_index (test_id),
                FOREIGN KEY (test_id)
                    REFERENCES tests_drafts(test_id)
                    ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS questions_drafts
        `);
    }

}
