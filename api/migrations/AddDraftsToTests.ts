import { MigrationInterface, QueryRunner } from "typeorm"

export class RemoveTestIdColumnFromQuestionsTable1660126487469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.query(`
            ALTER TABLE tests ADD COLUMN is_published BOOLEAN NOT NULL DEFAULT false
        `)
        await queryRunner.query(`
            ALTER TABLE tests ADD COLUMN has_drafts BOOLEAN NOT NULL DEFAULT false
        `)
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE tests DROP COLUMN is_published
        `)
        await queryRunner.query(`
            ALTER TABLE tests DROP COLUMN has_drafts
        `)
    }

}
