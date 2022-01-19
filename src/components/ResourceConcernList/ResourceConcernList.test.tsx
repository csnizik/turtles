import { cleanup, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTestStore } from '../../Redux/store';
import ResourceConcernList from './ResourceConcernList';

afterEach(() => {
  cleanup();
});
const store = createTestStore();
describe('Verify ResourceConcernList is rendered correctly', () => {
  test('Verify project component', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <ResourceConcernList />
      </Provider>
    );
    await findByText('Human');
  });
});
