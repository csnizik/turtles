export const mockedResourcesResponse = [
  {
    resourceConcernId: 1,
    resourceConcernName: 'Soil',
    resourceConcernDescription: 'Soil',
    highlighted: true,
  },
  {
    resourceConcernId: 2,
    resourceConcernName: 'Water',
    resourceConcernDescription: 'Water',
    highlighted: true,
  },
  {
    resourceConcernId: 3,
    resourceConcernName: 'Air',
    resourceConcernDescription: 'Air',
    highlighted: true,
  },
];

export const mockedNationalOverviewResponse = {
  practiceId: 2,
  practiceImage: 'Alley-Cropping.jpg',
  practiceOverview:
    'Alley cropping is an agroforestry practice where agricultural or horticultural crops are grown in the alleyways between widely spaced rows of woody plants. By combining annual and perennial crops that yield varied products and profits at different times, a landowner can more effectively use available space, time, and resources.',
  practiceInfo:
    'Alley cropping can be used to  achieve objectives such as reducing surface water runoff and soil erosion, altering water table depths, reducing offsite movement of nutrients, modifying the microclimate for improved crop production, providing habitat for wildlife and beneficial insects, and increasing net carbon storage. Alley cropping can also diversify a farm enterprise by adding tree/shrub products or non-traditional or value-added crops such as sunflowers or medicinial herbs. Some common examples of alley cropping plantings include wheat, corn, soybeans, or hay planted between rows of black walnut or pecan trees. ',
  practiceCode: '311',
  practiceName: 'Alley Cropping',
};

export const mockedStateResponse = [
  {
    stateCode: '01',
    stateAbbreviation: 'AL',
    stateNameDisplay: 'Alabama',
  },
];

export const mockedCountyResponse = [
  {
    stateCountyCode: '08000',
    stateCode: '08',
    stateAbbr: 'CO',
    stateName: 'Colorado',
    countyCode: '000',
    countyDisplay: 'All Counties, Colorado',
  },
];

export const mockedSwapaCategoryResponse = [
  {
    resourceConcernId: 156,
    resourceConcernName: 'Nutrients transported to groundwater',
    resourceConcernDescription: null,
    highlighted: false,
  },
];

export const mockedPaymentScheduleResponse = [
  {
    paymentLink:
      'https://www.nrcs.usda.gov/wps/portal/nrcs/detail/national/programs/financial/?cid=nrcseprd1328229',
  },
];

export const mockedAssociatedPracticeResponse = [
  {
    practiceId: 131,
    practiceName: 'Tree/Shrub Establishment',
    practiceCode: '612',
    practiceDefinition:
      'Establishing woody plants by planting seedlings or cuttings, by direct seeding, and/or through natural regeneration.',
    practiceCategoryId: 6,
  },
  {
    practiceId: 308,
    practiceName: 'Woody Residue Treatment',
    practiceCode: '384',
    practiceDefinition:
      'The treatment of residual woody material that is created due to management activities or natural disturbances.',
    practiceCategoryId: 6,
  },
];

export const mockedPracticeVideoResponse = [
  {
    videoId: 3,
    videoName: 'Alley Cropping',
    videoDescription: 'Video showing alley cropping practice at work',
    videoLink: 'https://www.farmers.gov/conservation/conservation-at-work/all',
  },
];
