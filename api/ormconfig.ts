require('dotenv').config()
import { DataSource } from "typeorm";

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
});

connectionSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

export { connectionSource }