import { MigrationInterface, QueryRunner } from "typeorm"

export class TestSessions1654893571030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS test_sessions (
                id VARCHAR(36) PRIMARY KEY,
                user_id INT UNSIGNED DEFAULT NULL,
                test_id INT UNSIGNED NOT NULL,
                status VARCHAR(10) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        await queryRunner.query(`
            CREATE TABLE session_question (
                question_id INT UNSIGNED NOT NULL,
                session_id VARCHAR(36) NOT NULL,
                is_answered BOOLEAN,
                PRIMARY KEY (question_id, session_id),
                CONSTRAINT constr_session_question_question_fk
                    FOREIGN KEY (question_id)
                    REFERENCES questions(id)
                    ON DELETE CASCADE,
                CONSTRAINT constr_session_question_session_fk
                    FOREIGN KEY (session_id)
                    REFERENCES test_sessions(id)
                    ON DELETE CASCADE    
            )
        `);
        await queryRunner.query(`
            CREATE TABLE session_answer (
                answer_id INT UNSIGNED NOT NULL,
                session_id VARCHAR(36) NOT NULL,
                is_correct BOOLEAN,
                PRIMARY KEY (answer_id, session_id),
                CONSTRAINT constr_session_answer_answer_fk
                    FOREIGN KEY (answer_id)
                    REFERENCES answers(id)
                    ON DELETE CASCADE,
                CONSTRAINT constr_session_answer_session_fk
                    FOREIGN KEY (session_id)
                    REFERENCES test_sessions(id)
                    ON DELETE CASCADE    
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS test_sessions`)
        await queryRunner.query(`DROP TABLE IF EXISTS session_question`)
        await queryRunner.query(`DROP TABLE IF EXISTS session_answer`)
    }

}
