import { appConfig } from './appConfig';
import { Client } from 'pg';

const testDatabaseConnection = () => {
  const client = new Client({
    user: appConfig.database.username,
    host: appConfig.database.host,
    database: appConfig.database.database,
    password: appConfig.database.password,
    port: appConfig.database.port,
  });

  client.connect();
  client.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    client.end();
  });
};
