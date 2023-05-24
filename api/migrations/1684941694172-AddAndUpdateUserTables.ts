import { MigrationInterface, QueryRunner } from "typeorm"

export class AddAndUpdateUserTables1684941694172 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS user_profiles (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                user_id  INT UNSIGNED NOT NULL,
                CONSTRAINT constr_user_profiles_users_fk
                    FOREIGN KEY (user_id)
                    REFERENCES users(id)
                    ON DELETE CASCADE,
                full_name VARCHAR(300) NOT NULL,
                current_position_id  INT UNSIGNED ,
                target_position_id  INT UNSIGNED ,
                language_id  INT UNSIGNED ,
                CONSTRAINT constr_current_position_positions_fk
                    FOREIGN KEY (current_position_id)
                    REFERENCES positions(id),
                CONSTRAINT constr_target_position_positions_fk
                    FOREIGN KEY (target_position_id)
                    REFERENCES positions(id),
                CONSTRAINT constr_language_languages_fk
                    FOREIGN KEY (language_id)
                    REFERENCES languages(id)
            )`
        );
        await queryRunner.query(`
            ALTER table users DROP COLUMN full_name
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS user_profiles
        `);
        await queryRunner.query(`
            ALTER table users ADD COLUMN full_name VARCHAR(300) NOT NULL
        `)
    }

}
