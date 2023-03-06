import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;

export const APP_PORT = process.env.APP_PORT;
export const APP_CONTAINER_NAME = process.env.APP_CONTAINER_NAME;
export const APP_HOST_URL = process.env.APP_HOST_URL ?? 'http://localhost';

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

export const PUPPETEER_EXECUTABLE_PATH = process.env.PUPPETEER_EXECUTABLE_PATH;
export const VIA_CEP_API_URL = process.env.VIA_CEP_API_URL;

export const DEFAULT_PER_PAGE = null;

export const TEMPLATE_FOLDER = path.resolve(
  __dirname,
  '..',
  'providers',
  'template',
  'view'
);
export const TMP_FOLDER = path.resolve(__dirname, '..', '..', '..', 'tmp');
export const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'uploads');
