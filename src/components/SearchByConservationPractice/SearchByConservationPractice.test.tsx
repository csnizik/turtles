import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import SearchByConservationPractice from './SearchByConservationPractice';
import { createTestStore } from '../../Redux/store';
import { setSearch, setSearchInfo } from '../../Redux/Slice/practiceSlice';

afterEach(() => {
  cleanup();
});

describe('Verify SearchByConservationPractice is rendered correctly', () => {
  const store = createTestStore();

  test('Verify SearchByConservationPractice dropdowns and practice selection functionality', async () => {
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

    expect(
      screen.getByText('search-by-conservation-practice.first-label-name')
    ).toBeInTheDocument();
    expect(
      screen.getByText('search-by-conservation-practice.second-label-name')
    ).toBeInTheDocument();

    await findByText('All practices (default)');
    fireEvent.click(screen.getByText('All practices (default)'));
    expect(screen.getByText('All practices (default)'));
    fireEvent.change(screen.getByTestId('categoryOptions'), {
      target: { value: '' },
    });
    expect(screen.getByTestId('categoryOptions')).toHaveValue('');

    await findByText('Cropland Soil Quality');
    fireEvent.click(screen.getByText('Cropland Soil Quality'));
    expect(screen.getByText('Cropland Soil Quality'));
    fireEvent.change(screen.getByTestId('categoryOptions'), {
      target: { value: '2' },
    });
    expect(screen.getByTestId('categoryOptions')).toHaveValue('2');

    await findByText('- Select practice -');
    fireEvent.click(screen.getByText('- Select practice -'));
    expect(screen.getByText('- Select practice -'));
    fireEvent.change(screen.getByTestId('practiceOptions'), {
      target: { value: '' },
    });
    expect(screen.getByTestId('practiceOptions')).toHaveValue('');

    await findByText('Conservation Cover');
    fireEvent.click(screen.getByText('Conservation Cover'));
    expect(screen.getByText('Conservation Cover'));
    fireEvent.change(screen.getByTestId('practiceOptions'), {
      target: { value: '11' },
    });
    expect(screen.getByTestId('practiceOptions')).toHaveValue('11');
  });
});

describe('Verify SearchByConservationPractice is rendered correctly', () => {
  const searchInput = {
    resource_concern_category_id: null,
    resource_concern_id: null,
    practice_category_id: -1,
    practice_id: -1,
    state_county_code: '08000',
    land_use_list: null,
    practices: null,
  };
  const store = createTestStore();
  store.dispatch(setSearch(searchInput));

  test('Verify SearchByConservationPractice dropdowns and practice selection default functionality', async () => {
    const { findByText } = render(
      <Provider store={store}>
        <SearchByConservationPractice
          selectedResourceCategory={null}
          setSecondState={jest.fn()}
          selectedPractice={-1}
          setSelectedPractice={jest.fn()}
          setSearchInput={jest.fn()}
          setSearchInfo={jest.fn()}
          resourceId={null}
          selectedSubPractice={{ id: -1 }}
          setSelectedSubPractice={jest.fn()}
        />
      </Provider>
    );

    expect(
      screen.getByText('search-by-conservation-practice.first-label-name')
    ).toBeInTheDocument();
    expect(
      screen.getByText('search-by-conservation-practice.second-label-name')
    ).toBeInTheDocument();

    await findByText('All practices (default)');
    expect(screen.getByText('All practices (default)'));
    expect(screen.getByTestId('categoryOptions')).toHaveValue('');

    await findByText('- Select practice -');
    expect(screen.getByText('- Select practice -'));
    expect(screen.getByTestId('practiceOptions')).toHaveValue('');
  });
});
