import { createConnection as typeOrmCreateConnection, ConnectionOptions } from 'typeorm';
import { appConfig } from './appConfig';
import { Item } from './entity/Item';
import { ExternalItemSnapshot } from './entity/ExternalItemSnapshot';

export const createConnection = async () =>
  typeOrmCreateConnection({
    type: 'postgres',
    host: appConfig.database.host,
    port: appConfig.database.port,
    username: appConfig.database.username,
    password: appConfig.database.password,
    database: appConfig.database.database,
    entities: [ExternalItemSnapshot, Item],
    synchronize: false,
    logging: appConfig.database.logging ?? 'all',
  });
