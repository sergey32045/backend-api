import { MigrationInterface, QueryRunner } from "typeorm"

export class AddIndexTestSessionsTable1683925693816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE test_sessions MODIFY COLUMN user_id INT UNSIGNED NOT NULL;
        `)

        await queryRunner.query(`
            ALTER TABLE test_sessions ADD CONSTRAINT test_session_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE test_sessions ADD INDEX sessions_user_id_index (user_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE test_sessions MODIFY COLUMN user_id INT UNSIGNED DEFAULT NULL;
        `)

        await queryRunner.query(`
            ALTER TABLE test_sessions DROP FOREIGN KEY test_session_user_id;
        `)

        await queryRunner.query(`
            ALTER TABLE test_sessions DROP INDEX sessions_user_id_index;
        `)
    }

}