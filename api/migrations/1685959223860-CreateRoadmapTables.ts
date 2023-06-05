import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRoadmapTables1685959223860 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS roadmap_category (
                id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                status VARCHAR(255) NOT NULL,
                CHECK (status = "inactive" OR status = "active" OR status = "completed"),
                last_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )`);
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS roadmap_category_progress (
                user_id INT UNSIGNED NOT NULL,
                category_id INT UNSIGNED NOT NULL,
                is_passed TINYINT(1) NOT NULL DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (category_id) REFERENCES roadmap_category(id)
            )`);
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS roadmap_category_tree (
                parent_id INT UNSIGNED NOT NULL,
                child_id INT UNSIGNED NOT NULL,
                FOREIGN KEY (parent_id) REFERENCES roadmap_category(id),
                FOREIGN KEY (child_id) REFERENCES roadmap_category(id)
            )`);
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS roadmap_category_roles (
                level_id  INT UNSIGNED NOT NULL,
                category_id INT UNSIGNED NOT NULL,
                FOREIGN KEY (level_id) REFERENCES complexity_levels(id),
                FOREIGN KEY (category_id) REFERENCES roadmap_category(id)
            )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS roadmap_category
        `);
    await queryRunner.query(`
            DROP TABLE IF EXISTS roadmap_category_progress
        `);
    await queryRunner.query(`
            DROP TABLE IF EXISTS roadmap_category_tree
        `);
    await queryRunner.query(`
            DROP TABLE IF EXISTS roadmap_category_roles
        `);
  }
}
