import { MigrationInterface, QueryRunner } from "typeorm"

export class AddAttachmentsTable1663048858750 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS attachments (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                url TEXT NOT NULL
            )`
        )
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS question_attachments (
                question_id INT UNSIGNED NOT NULL,
                attachment_id INT UNSIGNED NOT NULL,
                PRIMARY KEY (question_id, attachment_id),
                CONSTRAINT constr_question_attachments_question_fk
                    FOREIGN KEY (question_id)
                    REFERENCES questions(id)
                    ON DELETE CASCADE,
                CONSTRAINT constr_question_attachments_attachment_fk
                    FOREIGN KEY (attachment_id)
                    REFERENCES attachments(id)
                    ON DELETE CASCADE
            )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS attachments`)
        await queryRunner.query(`DROP TABLE IF EXISTS question_attachments`)
    }

}
