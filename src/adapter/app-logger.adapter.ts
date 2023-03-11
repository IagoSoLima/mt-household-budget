import { AppLogger } from '~/infra/logger/app.logger';

const AppLoggerAdapter = {
  create() {
    return new AppLogger();
  }
};

export default AppLoggerAdapter;
