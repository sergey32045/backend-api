require('dotenv').config();

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrations: ['migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: './migrations',
  },
  migrationsRun: true,
  logging: true,
  entities: ['src/**/*.entity{.ts,.js}'],
};
