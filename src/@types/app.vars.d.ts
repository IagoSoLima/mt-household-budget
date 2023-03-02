declare module 'process' {
  declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: string;

        APP_PORT: number;
        APP_CONTAINER_NAME: string;
        DATABASE_CONTAINER_NAME: string;

        POSTGRES_DB: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_PORT: number;
        POSTGRES_HOST: string;

        DATABASE_URL: string;

        MOCK_CONTAINER: 'true' | 'false';
      }
    }
  }
}
