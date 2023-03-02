import { MOCK_CONTAINER } from '../vars/app.vars';
import containerFake from './app-fake.container';
import container from './app.container';

export default function AppContainer() {
  if (MOCK_CONTAINER) {
    console.log('AppContainer Fake');
    containerFake.make();
    return;
  }

  console.log('AppContainer');
  container.make();
}
