import 'reflect-metadata';
import { MOCK_CONTAINER } from '~/infra/vars/app.vars';
import containerFake from './app-fake.container';
import container from './app.container';

export default function AppContainer() {
  if (MOCK_CONTAINER) {
    console.log('AppContainer Fake');
    containerFake.make();
    return;
  }

  container.make();
}
