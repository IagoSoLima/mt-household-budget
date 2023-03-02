import * as dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;

export const APP_PORT = process.env.APP_PORT;
export const APP_CONTAINER_NAME = process.env.APP_CONTAINER_NAME;

export const POSTGRES_DB = process.env.POSTGRES_DB ?? '';
export const POSTGRES_USER = process.env.POSTGRES_USER ?? '';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD ?? '';
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;
export const POSTGRES_HOST = process.env.POSTGRES_HOST ?? '';

export const DATABASE_URL = process.env.DATABASE_URL;

export const IS_PROD = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';
export const IS_DEV = !IS_TEST && !IS_PROD;

export const MOCK_CONTAINER =
  JSON.parse(process.env.MOCK_CONTAINER ?? 'false') && (IS_TEST || IS_DEV);
