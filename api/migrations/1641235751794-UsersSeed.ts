import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../src/users/user.entity';
import { name, internet } from 'faker';

export class UsersSeed1641235751794 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const i of [1, 2, 3]) {
      const email = i == 1 ? 'test@email.com' : internet.email();
      await queryRunner.manager.save(
        queryRunner.manager.create<User>(User, {
          firstName: name.firstName(),
          lastName: name.lastName(),
          password: '123456',
          isActive: true,
          email,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user`);
  }
}
