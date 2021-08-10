export const searchOptionMap: any = {
  locationTab: { id: 0, displayName: 'Location' },
  resourceConcernTab: { id: 1, displayName: 'Resource Concerns' },
  conservationPracticesTab: { id: 2, displayName: 'Conservation Practices' },
  projectsTab: { id: 3, displayName: 'Projects & Initiatives' },
};

export const exploreBoxData: any = [
  // {
  //     id: 1,
  //     boxHeading: 'Explore Resource Concerns',
  //     boxDescription: 'Resource Concerns definition lorum ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula diam et diam tempor fringilla.',
  //     boxButton: 'Resource Concerns',
  // },
  {
    id: 2,
    boxHeading: 'Explore Conservation Practices',
    boxDescription:
      'Conservation Practices definition lorum ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula diam et diam tempor fringilla.',
    boxButton: 'Conservation Practices',
  },
  {
    id: 3,
    boxHeading: 'Explore Projects & Initiatives',
    boxDescription:
      'NRCS sponsored Projects & Initatives definition lorum ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula diam et diam tempor fringilla.',
    boxButton: 'Projects & Initiatives',
  },
];

export const ConservationPractice: any = [
  {
    id: 0,
    practiceCategory: "Cropland Soil Quality",
    practice: "Access Control",
  },
  {
    id: 1,
    practiceCategory: "Grazing Land Conservation",
    practice: "Brush Management",
  },
  {
    id: 2,
    practiceCategory: "Water Quality",
    practice: "Composting Facility",
  },
  {
    id: 3,
    practiceCategory: "Forest Land Conservation",
    practice: "Conservation Cover",
  },
  {
    id: 4,
    practiceCategory: "Wetlands",
    practice: "Cover Crop",
  },
  {
    id: 5,
    practiceCategory: "Irrigition Efficiency",
    practice: "Critical Area Planting",
  },
  {
    id: 6,
    practiceCategory: "Fish and Wildlife Habitat",
    practice: "Diversion",
  },
]

export const ConservationPracticeStandard: any = [
  {
    id: '(Code 362)',
    practiceName: 'Diversion',
    practiceOverview:
      'A diversion is an earthen channel that is installed across a slope with a supporting ridge on the downhill side.',
    practiceInformation: [
      'The primary purpose of a diversion is to direct excess water in a new direction for use or safe disposal. Uses include interception of concentrated water that is flowing down long slopes; collection of water for storage; diversion of water away from gullies, farmsteads, or animal waste systems; and supplementing water management on conservation cropping systems.',
    ],
    image:
      'data:image/jpeg;base64,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',
  },
];
