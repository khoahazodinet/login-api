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

// heroku

// export const DbConfig: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: 'ec2-23-23-141-171.compute-1.amazonaws.com',
//   port: 5432,
//   username: 'xnrkephmmdfzcf',
//   password: 'e930f7741eb7879f827a5682ce65d591ff00c50dda11286c7ecde1c107374b7d',
//   database: 'de27sgti00nel6',
//   entities: ['dist/**/entities/*.entity.js'],
//   synchronize: true,
// };

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
