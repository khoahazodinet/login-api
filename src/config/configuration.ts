export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: `${process.env.DATABASE_PASSWORD}`,
    sync: process.env.DATABASE_SYNC === 'true',
    ssl: process.env.DATABASE_SSL === 'true',
  },
  JWT: process.env.JWT_SECRET,
});