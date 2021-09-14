import ResourceConcernTreated from './ResourceConcernTreated';
import { cleanup, render, screen } from '../../common/test-utils/test_utils';

afterEach(() => {
  cleanup();
});

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});