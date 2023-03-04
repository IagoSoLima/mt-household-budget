import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { APP_HOST_URL, APP_PORT, UPLOADS_FOLDER } from '~/infra/vars/app.vars';
import routes from './route/index.route';

export default function bootstrap() {
  const app: Express = express();
  const port = APP_PORT;

  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  app.use('/api', routes);
  app.use('/files', express.static(UPLOADS_FOLDER));

  app.listen(port, () => {
    console.log(
      `Api listening at ${APP_HOST_URL}:${port} 🙌 with express`,
      'Main'
    );
  });
}
