import {MigrationInterface, QueryRunner} from "typeorm";

export class Labels1653890457422 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS labels (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100) NOT NULL
            )
        `);
        await queryRunner.query(`
            CREATE TABLE question_label (
                question_id INT UNSIGNED NOT NULL,
                label_id INT UNSIGNED NOT NULL,
                PRIMARY KEY (question_id, label_id),
                CONSTRAINT constr_question_label_question_fk
                    FOREIGN KEY (question_id)
                    REFERENCES questions(id)
                    ON DELETE CASCADE,
                CONSTRAINT constr_question_label_label_fk
                    FOREIGN KEY (label_id)
                    REFERENCES labels(id)
                    ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS labels
        `);
        await queryRunner.query(`
            DROP TABLE IF EXISTS question_label
        `);
    }

}
