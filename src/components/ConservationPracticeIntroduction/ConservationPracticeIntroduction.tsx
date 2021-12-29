import './conservation-practice-introduction.scss';
import { Link } from 'react-router-dom';
import image from './image/open-in-new.svg';
import TableauReport from '../TableauReport/TableauReport';
import TableauReportTwo from '../TableauReport/TableauReportTwo';

interface IIntroProps {
  introductionParagraph: string;
  title: string;
}

const ConservationPracticeIntroduction = ({
  introductionParagraph,
  title,
}: IIntroProps) => {
  // eslint-disable-next-line consistent-return
  const EQUIPRender = () => {
    if (title === 'Conservation Practice') {
      return (
        <>
          <div className='internal-box-two'>
            <TableauReportTwo pageName='TopPracticesEQUIPOpenData' />
            <div className='link'>
              <Link
                aria-label='environmental quality incentives program opens in new window'
                style={{
                  textDecoration: 'none',
                }}
                to={{
                  pathname:
                    'https://www.nrcs.usda.gov/wps/portal/nrcs/main/national/programs/financial/eqip/',
                }}
                target='_blank'
              >
                Explore more practice data
                <img alt='link opens new window' src={image} />
              </Link>
            </div>
          </div>
        </>
      );
    }
  };
  return (
    <div data-testid='introduction-content' className='conservation-practice'>
      <div className='conservation-practice-header'>
        <h2>{title}</h2>
        <p>{introductionParagraph}</p>
      </div>

      <div className='explore-box'>
        <div className='internal-box'>
          <TableauReport pageName={title} />
          <div className='link'>
            <Link
              aria-label='environmental quality incentives program opens in new window'
              style={{
                textDecoration: 'none',
              }}
              to={{
                pathname:
                  'https://www.nrcs.usda.gov/Internet/NRCS_RCA/reports/data_viewer_home.html',
              }}
              target='_blank'
            >
              Explore more practice data
              <img alt='link opens new window' src={image} />
            </Link>
          </div>
        </div>
        {EQUIPRender()}
      </div>
    </div>
  );
};

export default ConservationPracticeIntroduction;
