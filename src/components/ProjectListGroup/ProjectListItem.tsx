const ProjectListItem = ({
  id,
  title,
  owner,
  statesInvolved,
  year,
  description,
}: any) => {
  const renderProjectDetails = (
    projectOwner: string,
    states: any,
    projectYear: string
  ) => {
    const getStates = states.length > 1 ? states.join(', ') : states[0];

    return (
      <div className='outer-box'>
        <div className='project-details'>
          <span>{projectOwner}</span>
          <span>{getStates}</span>
          <span>{projectYear}</span>
        </div>
      </div>
    );
  };

  return (
    <li key={id} className='list-group-item'>
      <p>{title}</p>
      {owner && renderProjectDetails(owner, statesInvolved, year)}
      <p>{description}</p>
    </li>
  );
};

export default ProjectListItem;
