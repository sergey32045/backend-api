import { MigrationInterface, QueryRunner } from "typeorm"

export class RemoveTestIdColumnFromQuestionsTable1660126487469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE questions DROP FOREIGN KEY questions_ibfk_1
        `)
        await queryRunner.query(`
            ALTER table questions DROP COLUMN test_id
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER table questions ADD COLUMN test_id INT UNSIGNED NOT NULL
        `)
        await queryRunner.query(`
            ALTER table questions ADD FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
        `)
    }

}
