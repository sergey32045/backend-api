import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamePositionTableIntoComplexityLevels1684938187131 implements MigrationInterface {
    name = 'RenamePositionTableIntoComplexityLevels1684938187131'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE positions RENAME TO complexity_levels
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE complexity_levels RENAME TO positions
        `);
    }

}
