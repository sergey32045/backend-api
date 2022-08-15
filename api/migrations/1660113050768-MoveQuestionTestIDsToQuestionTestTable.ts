import {MigrationInterface, QueryRunner} from "typeorm"
import {Question} from "../src/tests/models/question.entity";

export class MoveQuestionTestIDsToQuestionTestTable1660113050768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const questions = await queryRunner.manager.createQueryBuilder(Question, 'questions')
                .where('test_id IS NOT NULL')
                .getMany()

        for (const question of questions) {
            if (question.hasOwnProperty('test_id')) {
                await queryRunner.manager.createQueryBuilder()
                    .insert()
                    .into('question_test')
                    .values([
                        // {test_id: <any>question.test_id as any, question_id: question.id},
                    ])
                    .execute()
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
