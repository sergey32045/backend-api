import { MigrationInterface, QueryRunner } from "typeorm"

export class AddPositionsTable1664110918739 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS positions (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(100) NOT NULL
            )`
        )
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS question_positions (
                position_id INT UNSIGNED NOT NULL,
                question_id INT UNSIGNED NOT NULL,
                PRIMARY KEY (position_id, question_id),
                CONSTRAINT constr_question_positions_position_fk
                    FOREIGN KEY (position_id)
                    REFERENCES positions(id)
                    ON DELETE CASCADE,
                CONSTRAINT constr_question_positions_question_fk
                    FOREIGN KEY (question_id)
                    REFERENCES questions(id)
                    ON DELETE CASCADE    
            )`
        );
        await queryRunner.query(`
            ALTER table questions DROP COLUMN level
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS positions
        `);
        await queryRunner.query(`
            DROP TABLE IF EXISTS question_positions
        `);
        await queryRunner.query(`
            ALTER table questions ADD COLUMN level TINYINT UNSIGNED
        `);
    }

}
