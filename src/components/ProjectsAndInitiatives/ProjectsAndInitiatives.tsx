import { useEffect } from 'react';
import DummyTableauImage from '../ResourceConcernTreated/DummyTableauImage';
import './projects-initiatives.scss';

interface IProjectsAndInitiativesProps {
  data: any;
  isSuccess: boolean;
  setProjectsInitiativesData: any | null;
}

const intro: string =
  'NRCS projects and initiatives on the ground assess the impacts of conservation practices, build scientific understanding of those impacts and the processes underlying them, explore the potential of innovative conservation activities, and coordinate planning efforts at larger scales to address resource concerns from a watershed or landscape perspective.';

const ProjectsAndInitiatives = ({
  data,
  isSuccess,
  setProjectsInitiativesData,
}: IProjectsAndInitiativesProps) => {
  const getHeaderText = () => {
    const practiceName = (data && data?.practiceName) || '';
    if (practiceName) {
      return `${practiceName} Projects & Initiatives`;
    }
    return practiceName;
  };
  const pracAndInitMockData = [
    {
      title: 'ConservationInnovationGrants',
      data: [
        {
          projectId: 71,
          projectTitle:
            'A New Technology for Threatened and Endangered Species Monitoring in the San Luis Valley of Colorado: Remote, Passive, Acoustic Monitoring for Southwestern Willow Flycatcher, Yellow-billed Cuckoo, and Northern Leopard Frogs',
          projectDescription:
            'Traditional bird or amphibian surveys typically require one or more observers in the field to document birds by sight or vocalization. A number of factors associated with different methods can result in negative impact to a species and poor monitoring results. With acoustic monitoring a species can be monitored for days or weeks with disturbance limited to brief visits to the site to set up and retrieve the recordings. The data are collected at all sites in the same way removing all observer bias or influences of inclement weather. The potential bias associated with data analysis is eliminated because recordings are scanned on a computer with the same recognizer. This technology has proven to be extremely effective for determination of presence or absence of specific wildlife species (bats and marine mammals) without the intrusion or influence of humans in the area. This project will utilize the technology of acoustic monitoring by developing, testing and refining recognizers to improve monitoring of threatened and endangered species in the San Luis Valley. Acoustic monitors will be deployed to detect breeding populations, focus Habitat improvement measures and measure success of treatments by the presence or absence of these species in locations that have baseline conditions documented through matching funds.',
          projectOwner: 'Wetland Dynamics, LLC',
          statesInvolved: ['CO'],
          awardeeYear: 2014,
        },
        {
          projectId: 71,
          projectTitle:
            'A New Technology for Threatened and Endangered Species Monitoring in the San Luis Valley of Colorado: Remote, Passive, Acoustic Monitoring for Southwestern Willow Flycatcher, Yellow-billed Cuckoo, and Northern Leopard Frogs',
          projectDescription:
            'Traditional bird or amphibian surveys typically require one or more observers in the field to document birds by sight or vocalization. A number of factors associated with different methods can result in negative impact to a species and poor monitoring results. With acoustic monitoring a species can be monitored for days or weeks with disturbance limited to brief visits to the site to set up and retrieve the recordings. The data are collected at all sites in the same way removing all observer bias or influences of inclement weather. The potential bias associated with data analysis is eliminated because recordings are scanned on a computer with the same recognizer. This technology has proven to be extremely effective for determination of presence or absence of specific wildlife species (bats and marine mammals) without the intrusion or influence of humans in the area. This project will utilize the technology of acoustic monitoring by developing, testing and refining recognizers to improve monitoring of threatened and endangered species in the San Luis Valley. Acoustic monitors will be deployed to detect breeding populations, focus Habitat improvement measures and measure success of treatments by the presence or absence of these species in locations that have baseline conditions documented through matching funds.',
          projectOwner: 'Wetland Dynamics, LLC',
          statesInvolved: ['CO'],
          awardeeYear: 2014,
        },
      ],
    },
    {
      title: 'Landscape Conservation Initiatives',
      data: [
        {
          initiativeId: 0,
          initiativeTitle: 'Great Lakes Restoration Initiative',
          initiativeDescription:
            'Great Lakes Restoration Initiative  lorum ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula diam et diam tempor fringilla. Additional contextual information lorum ipsum dolor sit amet, consectetur adipiscing elit. Aenean vehicula diam et diam tempor fringilla. Aenean vehicula diam et diam tempor fringilla. Aenean vehicula diam et diam tempor fringilla. Aenean vehicula diam et diam tempor.',
          initiativeOwner: '',
          statesInvolved: [],
          initiativeYear: '',
        },
        {
          initiativeId: 1,
          initiativeTitle: 'Rangelands Initiative Efforts',
          initiativeDescription:
            'This project aims to conserve native tree species within midwests range lands.',
          initiativeOwner: '',
          statesInvolved: [],
          initiativeYear: '',
        },
      ],
    },
  ];
  useEffect(() => {
    setProjectsInitiativesData(pracAndInitMockData);
  }, []);

  if (!isSuccess) return null;
  return (
    <div className='projects-initiative-parent'>
      <h2>{getHeaderText()}</h2>
      <h4>{intro}</h4>
      <div className='projects-initiative-content'>
        <DummyTableauImage />
      </div>
    </div>

  );
};

export default ProjectsAndInitiatives;
