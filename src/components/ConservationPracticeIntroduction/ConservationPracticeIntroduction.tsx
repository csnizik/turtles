import { useState } from 'react';
import { Link } from 'react-router-dom';
import ConservationPracticeCategory from '../TableauReport/ConservationPracticeCategory';
import RegionalConservationPractice from '../TableauReport/RegionalConservationPractice';
import TopPracticesEQUIPOpenData from '../TableauReport/TopPracticesEQUIPOpenData';
import './conservation-practice-introduction.scss';
import image from './image/open-in-new.svg';

interface IIntroProps {
  introductionParagraph: string;
  title: string;
}

const ConservationPracticeIntroduction = ({
  introductionParagraph,
  title,
}: IIntroProps) => {
  const [isRcTableauEmpty, setIsRcTableauEmpty] = useState(false);
  const [isCpCategoryTableauEmpty, setIsCpCategoryTableauEmpty] =
    useState(false);
  const [isTpEquipTableauEmpty, setIsTpEquipTableauEmpty] = useState(false);

  const setCpCategoryTableauStatus = (status: boolean) => {
    setIsCpCategoryTableauEmpty(status);
  };

  // eslint-disable-next-line consistent-return
  const EQUIPRender = () => {
    if (title === 'Conservation Practices') {
      if (isTpEquipTableauEmpty) return null;
      return (
        <>
          <div className='internal-box-two'>
            <TopPracticesEQUIPOpenData
              setIsTableauEmpty={setIsTpEquipTableauEmpty}
            />
            <div className='link'>
              <Link
                aria-label='environmental quality incentives program opens in new window'
                style={{
                  textDecoration: 'none',
                }}
                to={{
                  pathname:
                    'https://www.farmers.gov/data',
                }}
                target='_blank'
              >
                Explore more data on practice obligations at the Financial Assistance Dashboard
                <img alt='link opens new window' src={image} />
              </Link>
            </div>
          </div>
        </>
      );
    }
  };

  const RCARender = () => {
    if (title === 'Conservation Practices' && isRcTableauEmpty) return null;
    return (
      <div className='internal-box'>
        {(title === 'Conservation Practices' && (
          <RegionalConservationPractice
            setIsTableauEmpty={setIsRcTableauEmpty}
          />
        )) || (
          <ConservationPracticeCategory
            pageName={title}
            setIsTableauEmpty={setCpCategoryTableauStatus}
          />
        )}
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
            Explore more data on acres receiving conservation at the RCA Data Viewer
            <img alt='link opens new window' src={image} />
          </Link>
        </div>
      </div>
    );
  };

  const TableauGraphs = () => {
    return (
      <div className='explore-box'>
        {RCARender()}
        {EQUIPRender()}
      </div>
    );
  };

  return (
    <div data-testid='introduction-content' className='conservation-practice'>
      <div className='conservation-practice-header'>
        <h2>{title}</h2>
        <p>{introductionParagraph}</p>
      </div>

      {(title === 'Conservation Practices' &&
        isRcTableauEmpty &&
        isTpEquipTableauEmpty) ||
      (title !== 'Conservation Practices' && isCpCategoryTableauEmpty)
        ? null
        : TableauGraphs()}
    </div>
  );
};

export default ConservationPracticeIntroduction;
