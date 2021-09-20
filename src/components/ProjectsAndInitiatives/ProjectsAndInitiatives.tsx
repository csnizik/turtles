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
    <div className='projects-initiative-parent' id='Projects&Initiatives'>
      <h2>{getHeaderText()}</h2>
      <h4>{intro}</h4>
      <div className='projects-initiative-content' />
    </div>
  );
};

export default ProjectsAndInitiatives;
