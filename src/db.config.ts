import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'abcd1234',
  database: 'Login',
  entities: ['dist/**/entities/*.entity.js'],
  synchronize: true,
};

//
// export const DbConfig: TypeOrmModuleOptions = {
//   type: "postgres",
//   host: process.env.HOST,
//   port: parseInt(<string>process.env.PORT),
//   username: process.env.USER_NAME,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   entities:
//     ["dist/**/models/*.entities.js"],
//   synchronize: true
// };
