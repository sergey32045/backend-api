export default () => ({
  database: {
    host: process.env.DB_HOST,
    db: process.env.DB_DATABASE,
    port: +process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
  },
  google: {
    clientId:
      '993913996884-hau8g218r48025f0g7b4ufkqif9nndkn.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'https://localhost/api/auth/google/redirect',
  },
  email: {
    sendGridApiKey: process.env.SENDGRID_API_KEY,
    emailFrom: process.env.EMAIL_FROM,
    clientHost: process.env.CLIENT_HOST,
  },
});
