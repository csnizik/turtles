import './conservation-practice-introduction.scss';
import { Link } from 'react-router-dom';
import image from './image/open-in-new.svg';

const ConservationPractice = () => {
  const str =
    'Through the Farm Bill, NRCS is able to provide assistance to agricultural producers who want to voluntarily make changes to their land or production operations to improve conditions related to soil, water, air, plants, wildlife and other natural resources. These conservation activities, or "practices", improve the health of ecosystems while also boosting the land\'s resiliency and production.\n\nTechnical assistance and financial assistance is available. Technical assistance is free to producers, and involves a team of agency experts working with producers to develop a customized conservation plan and system of conservation practices. Financial assistance helps producers pay for the adoption of those practices and is available through multiple Farm Bill programs, such as the Environmental Quality Incentives Program (EQIP) and the Conservation Stewardship Program (CSP). NRCS assistance varies by state, practices and program, but generally covers 50 to 70 percent of the cost.';
  return (
    <div className='conservation-practice'>
      <div className='conservation-practice-header'>
        <h2> Conservation Practice </h2>
        <p>{str}</p>
      </div>

      <div className='explore-box'>
        <div className='internal-box' />
        <div className='link'>
          <Link
             style={{
              textDecoration: 'none'
             }}
            to={{
              pathname:
                'https://www.nrcs.usda.gov/wps/portal/nrcs/main/national/programs/financial/eqip/',
            }}
            target='_blank'
          >
            Explore more practice data
            <img alt='Explore' src={image} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConservationPractice;
