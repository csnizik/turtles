export interface ISearchOptionMap {
  [key: string]: any;
}
export const searchOptionMap: ISearchOptionMap = {
  Location: { id: 0, displayName: 'Overview' },
  ConservationPractices: { id: 1, displayName: 'Conservation Practices' },
  ProjectsAndInitiatives: { id: 2, displayName: 'Projects And Initiatives' },
};

export const ConservationPractice: any = [
  {
    id: 0,
    practiceCategory: 'Cropland Soil Quality',
    practice: 'Access Control',
  },
  {
    id: 1,
    practiceCategory: 'Grazing Land Conservation',
    practice: 'Brush Management',
  },
  {
    id: 2,
    practiceCategory: 'Water Quality',
    practice: 'Composting Facility',
  },
  {
    id: 3,
    practiceCategory: 'Forest Land Conservation',
    practice: 'Conservation Cover',
  },
  {
    id: 4,
    practiceCategory: 'Wetlands',
    practice: 'Cover Crop',
  },
  {
    id: 5,
    practiceCategory: 'Irrigition Efficiency',
    practice: 'Critical Area Planting',
  },
  {
    id: 6,
    practiceCategory: 'Fish and Wildlife Habitat',
    practice: 'Diversion',
  },
];

