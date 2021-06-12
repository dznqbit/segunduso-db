import { ConnectionOptions, DatabaseType, LoggerOptions } from 'typeorm';
require('dotenv').config();

type AppConfig = {
  secondUseHost: string;
  database: ConnectionOptions;
};

export const appConfig = {
  secondUseHost: process.env.SECOND_USE_HOST ?? 'https://www.seconduse.com',
  database: {
    connection: process.env.DB_CONNECTION as DatabaseType,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    logging: process.env.DB_LOGGING as LoggerOptions,
  },
};
