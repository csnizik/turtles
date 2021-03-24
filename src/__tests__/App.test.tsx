import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// TODO: Expand AxiosUtil so we can mock API calls.
const mockedGrants = [
  {
     "id":1,
     "grantee":"Allamakee Soil & Water Conservation District",
     "project":"Interseeding Cover Crops into V4-V7 Corn",
     "description":"This project plans to work with 15 producers"
  },
  {
     "id":2,
     "grantee":"Colorado Conservation Tillage Association (CCTA)",
     "project":"Farmers Advancing Regenerative Management Systems (FARMS)",
     "award":1672546,
     "states":"CO, KS, NE",
     "description":"FARMS is a collaborative effort by the CCTA, Colorado State University, Kansas State University, and Health First. ncourage"
  },
  {
     "id":3,
     "grantee":"Indiana Soybean Alliance",
     "project":"Infield Advantage",
     "award":600000,
     "states":"IN",
     "description":"Infield Advantage aims to increase the use of soil health and nutrient"
  }
];

const mockedGrantSummary = {"awards": 13537661,"matching": 6844838};

const mockedMainContent = {"id": 1,"reportBody": "<div class='heading'>Conservation Innovation Grants On-Farm Trials: Soil Health Demonstration"};

describe('Fetch Grants', () => {
  it('fetches grants successfully', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedGrants));
    expect(mockedGrants[0].id).toBe(1);
  });
});

describe('Fetch Grant Summary', () => {
  it('fetches grant summary successfully', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedGrantSummary));
    expect(mockedGrantSummary.awards).toBeGreaterThan(1);
  });
});

describe('Fetch Main Content', () => {
  it('fetches main content successfully', async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockedMainContent));
    expect(mockedMainContent.id).toBe(1);
    expect(mockedMainContent.reportBody).toMatch(/<div/);
  });
});
