import Header from '../Header';
import './projects-initiatives.scss';

interface IProjectsAndInitiativesProps {
  data: any;
  isSuccess: boolean;
}

const intro: string =
  'NRCS projects and initiatives on the ground assess the impacts of conservation practices, build scientific understanding of those impacts and the processes underlying them, explore the potential of innovative conservation activities, and coordinate planning efforts at larger scales to address resource concerns from a watershed or landscape perspective.';

const ProjectsAndInitiatives = ({
  data,
  isSuccess,
}: IProjectsAndInitiativesProps) => {
  const getHeaderText = () => {
    const practiceName = (data && data?.practiceName) || '';
    if (practiceName) {
      return `${practiceName} Projects & Initiatives`;
    }
    return practiceName;
  };

  if (!isSuccess) return null;
  return (
    <div className='projects-container padding-top-4 padding-bottom-4'>
      <Header
        headerText={getHeaderText()}
        parentClassNames='margin-3 padding-top-4'
        paragraphText={intro}
        priority='1'
      />
      <div className='projects-content margin-3' />
    </div>
  );
};

export default ProjectsAndInitiatives;
