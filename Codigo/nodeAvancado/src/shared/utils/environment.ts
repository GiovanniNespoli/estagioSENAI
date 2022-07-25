import * as dotenv from 'dotenv';

dotenv.config();
const path = `${__dirname}/../../../env`;

dotenv.config({path});

export const { APP_API_URL } = process.env;
export const { STORAGE_DRIVER } = process.env;
export const { REDIS_HOST } = process.env;
export const { REDIS_PORT } = process.env;
export const { REDIS_PASS } = process.env;