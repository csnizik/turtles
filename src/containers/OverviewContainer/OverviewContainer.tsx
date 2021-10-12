import { useTranslation } from 'react-i18next';
import TopFiveContainer from './TopFiveContainer';
import './overview-container.scss';

const OverviewContainer = () => {
  const { t } = useTranslation();

  const overviewBoxes: any = [
    {
      id: 0,
      title: 'U.S. Top 5 Resource Concerns',
      description: t('overview.description'),
    },
    {
      id: 1,
      title: 'U.S. Top 5 Conservation Practices',
      description: t('overview.description'),
    },
    {
      id: 2,
      title: 'Outcomes of NRCS Applied Practices',
      description: t('overview.outcomes'),
    },
  ];

  return (
    <>
      <section className='overview-page' data-testid='overview-container'>
        <div className='overview-box' />

        <p className='lead margin-top-3 margin-bottom-6'>
          {t('overview.introductory-paragraph')}
        </p>
      </section>
      {overviewBoxes.map((box: any) => {
        return (
          <TopFiveContainer
            key={box.id}
            id={box.id}
            title={box.title}
            description={box.description}
          />
        );
      })}
    </>
  );
};

export default OverviewContainer;
