import { MigrationInterface, QueryRunner } from "typeorm"

export class Answers1654451457493 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS answers (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                question_id INT UNSIGNED NOT NULL,
                is_correct BOOLEAN DEFAULT false,
                answer TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX question_id_index (question_id),
                FOREIGN KEY (question_id)
                    REFERENCES questions(id)
                    ON DELETE CASCADE
                    on UPDATE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS answers
        `);
    }

}
