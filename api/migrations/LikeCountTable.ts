import { MigrationInterface, QueryRunner } from "typeorm"

export class LikeCountTable1655709777530 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS likes (
                id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                source_type VARCHAR(10) NOT NULL,
                username VARCHAR(150) DEFAULT NULL,
                user_id INT UNSIGNED DEFAULT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX likes_source_type_index (source_type)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS likes
        `)
    }

}
