import {MigrationInterface, QueryRunner} from "typeorm";

export class UniqCategoryName1654155093664 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE test_categories ADD CONSTRAINT constr_categories_name UNIQUE (name)
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE test_categories DROP CONSTRAINT constr_categories_name;
        `)
    }

}
