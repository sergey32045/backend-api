import { MigrationInterface, QueryRunner } from "typeorm"

export class AddTitleColumnQuestionsTable1657711978235 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER table questions ADD COLUMN title TEXT
        `)
        await queryRunner.query(`
            ALTER table test_categories ADD COLUMN description TEXT
        `)
        await queryRunner.query(`
            CREATE INDEX index_session_question_session_id ON session_question (session_id)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER table questions DROP COLUMN title
        `)
        await queryRunner.query(`
            ALTER table test_categories DROP COLUMN description
        `)
        await queryRunner.query(`
            DROP INDEX index_session_question_session_id ON session_question
        `)
    }

}
