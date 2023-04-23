require('dotenv').config()
import { DataSource } from "typeorm";

import {
    Answer,
    Test,
    Label,
    TestCategory,
    Attachment,
    Position,
    Question
} from "./src/tests/models";
import {Session, SessionAnswer, SessionQuestion} from "./src/test-session/models/session.entity";

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
        Question, Test, Answer, Label, Session,
        SessionAnswer, SessionQuestion, TestCategory, Attachment, Label, Position
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