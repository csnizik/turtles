import './project-type.scss';

const ProjectTypeSection = ({ projectType }: any) => {
  const renderProjectDetails = () => {
    // Conservation Grants
    if (projectType.id === 1) {
      return (
        <div className='project-type-details'>
          <p className='margin-top-3'>{projectType.paragraphDescription}</p>
          <p>
            Visit the{' '}
            <a
              aria-label='Conservation Innovation Grants link opens a new tab'
              href='https://usda.gov'
              target='_blank'
              rel='noreferrer'
            >
              CIG website
            </a>{' '}
            for more information. Use
            <a
              aria-label='Conservation Innovation Grants link opens a new tab'
              href='/search'
              target='_blank'
              rel='noreferrer'
            >
              &nbsp;advanced filters to search projects.
            </a>
          </p>
        </div>
      );
    }
    if (projectType.id === 2) {
      return (
        <div className='landscape-intiatives margin-top-2'>
          <div className='landscape-img-placeholder'>
            <h3 className='padding-3'>Placeholder for webmap or image</h3>
          </div>
          <p>Go to ...</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className='project-type-section'>
      <h3>{projectType.title}</h3>
      {renderProjectDetails()}
    </div>
  );
};

export default ProjectTypeSection;
