import { MigrationInterface, QueryRunner } from "typeorm"

export class CorrectAnswersAndTestType1654330385819 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER table questions ADD COLUMN is_multiselect BOOLEAN DEFAULT false
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER table questions DROP COLUMN is_multiselect
        `)
    }

}
