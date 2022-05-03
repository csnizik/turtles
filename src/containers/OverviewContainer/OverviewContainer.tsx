import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TopFiveContainer from './TopFiveContainer';
import TopPracticesEQUIPOpenData from '../../components/TableauReport/TopPracticesEQUIPOpenData';
import './overview-container.scss';

interface IOverviewContainerProps {
  stateNameDisplay: string;
}

const OverviewContainer = ({ stateNameDisplay }: IOverviewContainerProps) => {
  const { t } = useTranslation();
  const [isTpEquipTableauEmpty, setIsTpEquipTableauEmpty] = useState(false);

  // eslint-disable-next-line consistent-return
  const EQUIPRender = () => {
    if (isTpEquipTableauEmpty) return null;
    return (
      <>
        <div className='internal-box-two'>
          <TopPracticesEQUIPOpenData
            setIsTableauEmpty={setIsTpEquipTableauEmpty}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <section className='overview-page' data-testid='overview-container'>
        <div className='overview-box' />

        <p className='lead margin-top-3 margin-bottom-6'>
          {t('overview.introductory-paragraph')}
        </p>
      </section>
      <TopFiveContainer
        id={0}
        title={`${stateNameDisplay} Top 5 Resource Concerns`}
        description='Description of this section...'
      />
      <div className='top-five-container'>
        <h2>{`${stateNameDisplay} Top 5 Conservation Practices`}</h2>
        <p className='lead margin-top-3 margin-bottom-3'>
          These are the top practices by dollars.
        </p>
        <div className='top-five-box margin-bottom-7'> {EQUIPRender()} </div>
      </div>
    </>
  );
};

export default OverviewContainer;
