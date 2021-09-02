import './conservation-practice.scss';
import { Link } from 'react-router-dom';
import image from './image/open-in-new.svg';

const ConservationPractice = () => {
  return (
    <div className='conservation-practice'>
      <div className='conservation-practice-header'>
        <h2> Conservation Practice </h2>
        <p> dewfgegwgegegerhrhhhh </p>
      </div>

      <div className='explore-box'>
        <div className='internal-box' />
        <div className='link'>
          <Link
            to={{
              pathname:
                'https://www.nrcs.usda.gov/wps/portal/nrcs/main/national/programs/financial/eqip/',
            }}
            target='_blank'
          >
            Explore more practice data
          </Link>
          <img alt='Explore' src={image} />
        </div>
      </div>
    </div>
  );
};

export default ConservationPractice;
