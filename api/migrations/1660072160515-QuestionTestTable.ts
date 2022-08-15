import { MigrationInterface, QueryRunner } from "typeorm"

export class QuestionTestTable1660072160515 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE question_test (
                question_id INT UNSIGNED NOT NULL,
                test_id INT UNSIGNED NOT NULL,
                PRIMARY KEY (question_id, test_id),
                CONSTRAINT constr_question_test_question_fk
                    FOREIGN KEY (question_id)
                    REFERENCES questions(id)
                    ON DELETE CASCADE,
                CONSTRAINT constr_question_test_test_fk
                    FOREIGN KEY (test_id)
                    REFERENCES tests(id)
                    ON DELETE CASCADE    
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS question_test`)
    }

}
