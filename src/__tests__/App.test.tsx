import React from 'react';
import axios from 'axios';
import { mockedGrants, mockedMainContent, mockedGrantSummary } from '../mocks.js'
import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Fetch Grants', () => {
  it('fetches grants successfully', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedGrants));
    expect(mockedGrants.length).toBeGreaterThan(0);
  });
});

describe('Incrementing grant ids', () => {
  mockedGrants.forEach((grant, index) => {
    it('Grant ids should be populated', () => {
      expect(grant.id).toBeGreaterThanOrEqual(index);
    });
  })
})

describe('Fetch Grant Summary', () => {
  it('fetches grant summary successfully', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedGrantSummary));
    expect(mockedGrantSummary.awards).toBeGreaterThan(1);
    expect(mockedGrantSummary.matching).toBeGreaterThan(1);
  });
});

describe('Fetch Main Content', () => {
  it('fetches main content successfully', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedMainContent));
    expect(mockedMainContent.id).toBe(1);
    expect(mockedMainContent.reportBody).toMatch(/<div/);
    expect(mockedMainContent.reportBody).toMatch(/Conservation/);
  });
});
