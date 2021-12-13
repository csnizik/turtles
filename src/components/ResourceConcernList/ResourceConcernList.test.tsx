import { cleanup } from '@testing-library/react';
import ResourceConcernList from './ResourceConcernList';

afterEach(() => {
  cleanup();
});

describe('Verify ResourceConcernList is rendered correctly', () => {
  test('Verify project component', async () => {
    // Create a redux store
    const { findByText } = render(<ResourceConcernList />);
    await findByText(
      'A New Technology for Threatened and Endangered Species Monitoring in the San Luis Valley of Colorado: Remote, Passive, Acoustic Monitoring for Southwestern Willow Flycatcher, Yellow-billed Cuckoo, and Northern Leopard Frogs'
    );
  });
});
