import 'reflect-metadata';

import AppContainer from '~/infra/container/index.container';
import bootstrap from '~/infra/http/server/express/index.http';

AppContainer();
bootstrap();
