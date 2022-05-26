import {MigrationInterface, QueryRunner} from "typeorm";

export class Users1652881965492 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(300) NOT NULL,
                password VARCHAR(100) NOT NULL,
                email VARCHAR(200) NOT NULL,
                is_active BOOLEAN DEFAULT true,
                is_email_confirmed BOOLEAN DEFAULT false,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS users
        `);
    }

}
