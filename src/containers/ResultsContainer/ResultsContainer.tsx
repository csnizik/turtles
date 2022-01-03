import { useTranslation } from 'react-i18next';
import Accordion from '../../components/ResultAccordion';
import ProjectListGroup from '../../components/ProjectListGroup';
import Filters from '../../components/Filter';
import './results.scss';

const ResultsContainer = () => {
  const { t } = useTranslation();

  return (
    <div className='results-page' data-testid='results-container'>
      <div className='search-title'>
        <h1>{t('search-results-page.header')}</h1>
        <hr />
      </div>
      <Filters />
      <Accordion />
      <div className='top-title'>
        <h4 className='title'>
          {t('search-results-page.project-initiatives')}
        </h4>
      </div>
      <ProjectListGroup isMapDisplayed={false} />
    </div>
  );
};

export default ResultsContainer;
