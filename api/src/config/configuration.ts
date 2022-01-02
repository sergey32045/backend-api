export default () => ({
  database: {
    host: 'db',
    db: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
  },
});
