import { useTranslation } from 'react-i18next';
import Accordion from '../../components/ResultAccordion';
import './results.scss';
import FilterBy from '../../components/Filter/FilterBy';

const ResultsContainer = () => {
  const { t } = useTranslation();

  return (
    <div className='results-page'>
      <div className='search-title'>
        <h1>{t('search-results-page.header')}</h1>
        <hr />
      </div>
      <FilterBy />
      <Accordion />
    </div>
  );
};

export default ResultsContainer;
