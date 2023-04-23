import { MigrationInterface, QueryRunner } from "typeorm"

export class AddCategoriesToLabels1681209256210 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
             ALTER TABLE labels ADD COLUMN category_id INT UNSIGNED;
        `);

        await queryRunner.query(`
             ALTER TABLE labels ADD CONSTRAINT fk_category_id FOREIGN KEY (category_id) REFERENCES test_categories(id);
        `);

        await queryRunner.query(`
             ALTER TABLE labels ADD INDEX labels_category_id_index (category_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE company.labels DROP constraint fk_category_id;
            ALTER TABLE company.labels DROP category_id;
        `);
    }

}
