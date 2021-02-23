require('dotenv').config()

export const appConfig = {
    typeOrm: {
        connection: process.env.TYPEORM_CONNECTION,
        host: process.env.TYPEORM_HOST,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        port: process.env.TYPEORM_PORT,
        synchronize: process.env.TYPEORM_SYNCHRONIZE,
        logging: process.env.TYPEORM_LOGGING,
    }
};