import { jest } from '@jest/globals'
import {createConnection, getConnection, Repository} from "typeorm";
import {Test as TestModel} from "./models/test.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {TestService} from "./test.service";
import {TestCategory} from "./models/test-category.entity";

export type MockType<T> = {
    [P in keyof T]?: jest.Mock<any, any>;
};


export const repositoryMockFactory = jest.fn(() => {
    return {
        find: jest.fn()
    }
});

describe('test.service', () => {
    let service: TestService;
    let repositoryMock: MockType<Repository<Test>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TestService,
                // Provide your mock instead of the actual repository
                {
                    provide: getRepositoryToken(TestModel),
                    useFactory: repositoryMockFactory,
                },
                {
                    provide: getRepositoryToken(TestCategory),
                    useFactory: jest.fn(() => {}),
                },
            ],
        }).compile();
        service = module.get<TestService>(TestService);
        repositoryMock = module.get(getRepositoryToken(TestModel));
    });

    it('should find a user', async () => {
        const categoryId = 1;
        const tests = [ { id: 1, test_category_id: categoryId } ];

        repositoryMock.find.mockResolvedValue(tests);

        expect(await service.findAll(categoryId)).toEqual(tests);
        // And make assertions on how often and with what params your mock's methods are called
        expect(repositoryMock.find).toHaveBeenCalledWith(expect.objectContaining({where: { test_category_id: categoryId }}));
    });
});