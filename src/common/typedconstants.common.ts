export interface ISearchOptionMap {
  [key: string]: any;
}
export const searchOptionMap: ISearchOptionMap = {
  Overview: { id: 0, displayName: 'Overview' },
  ConservationPractices: { id: 1, displayName: 'Conservation Practices' },
  ProjectsAndInitiatives: {
    id: 2,
    displayName: 'Projects And Initiatives',
  },
};

export const ConservationPracticeSections: any = [
  {
    sectionId: 0,
    sectionName: "Resource Concerns Treated",
    anchorLink: "#ResourceConcernsTreated",
  },
  {
    sectionId: 1,
    sectionName: "Support for this Practice",
    anchorLink: "#SupportPractice",
  },  
  {
    sectionId: 2,
    sectionName: "Practice Specifications and Tools",
    anchorLink: "#PracticeSpecifications",
  },  
  {
    sectionId: 3,
    sectionName: "Impacts of Applying this Practice",
    anchorLink: "#ImpactsPractice",
  },  
  {
    sectionId: 4,
    sectionName: "Practice Projects & Initiatives",
    anchorLink: "#Projects&Initiatives",
  },
]

