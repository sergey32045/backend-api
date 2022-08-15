import {Question} from "./src/tests/models/question.entity";

require('dotenv').config()
import { DataSource } from "typeorm";
import {Label} from "./src/tests/models/label.entity";
import {Answer} from "./src/tests/models/answer.entity";
import {Test} from "./src/tests/models/test.entity";
import {Session, SessionAnswer, SessionQuestion} from "./src/test-session/models/session.entity";
import {TestCategory} from "./src/tests/models/test-category.entity";

const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: true,
    synchronize: false,
    name: 'default',
    migrations: ['migrations/*{.ts,.js}'],
    entities: [
        Question, Test, Answer, Label, Session, SessionAnswer, SessionQuestion, TestCategory
    ]
});

(async () => {
    await connectionSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!")
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        });
})()

export { connectionSource }