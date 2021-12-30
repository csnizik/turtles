import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import SearchByConservationPractice from './SearchByConservationPractice';
import { createTestStore } from '../../Redux/store';

afterEach(() => {
  cleanup();
});

describe('Verify SearchByConservationPractice is rendered correctly', () => {
  const store = createTestStore();

  test('Verify SearchByConservationPractice component', async () => {
    // Create a redux store
    const { findByText } = render(
      <Provider store={store}>
        <SearchByConservationPractice
          selectedResourceCategory={null}
          setSecondState={jest.fn()}
          selectedPractice={null}
          setSelectedPractice={jest.fn()}
          setSearchInput={jest.fn()}
          setSearchInfo={jest.fn()}
          resourceId={null}
          selectedSubPractice={{ id: null }}
          setSelectedSubPractice={jest.fn()}
        />
      </Provider>
    );
    await findByText('All practices (default)');
  });
});
