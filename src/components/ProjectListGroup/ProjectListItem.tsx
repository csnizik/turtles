import { useHistory, useParams } from 'react-router-dom';

const ProjectListItem = ({
  id,
  title,
  owner,
  statesInvolved,
  year,
  description,
  link,
}: any) => {
  const history: any = useHistory();
  const { stateCode }: any = useParams();
  const handleClick = () => {
    history.push(`/${stateCode}/ProjectsAndInitiatives/2/${id}`);
  };

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
  if (statesInvolved) {
    return (
      <li key={id} className='list-group-item'>
        <p>
          <a href={link} target='_blank' rel='noreferrer'>
            {title}
          </a>
        </p>
        {owner && renderProjectDetails(owner, statesInvolved, year)}
        <p>{description}</p>
      </li>
    );
  }
  return (
    <li key={id} className='list-group-item'>
      <p>
        <button onClick={handleClick} type='button'>
          {title}
        </button>
      </p>
      {owner && renderProjectDetails(owner, statesInvolved, year)}
      <p>{description}</p>
    </li>
  );
};

export default ProjectListItem;
