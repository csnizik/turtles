import { useTranslation } from 'react-i18next';
import Accordion from '../../components/ResultAccordion';
import Filters from '../../components/Filter/Filters';
import './results.scss';

const ResultsContainer = () => {
  const { t } = useTranslation();

  return (
    <div className='results-page'>
      <div className='search-title'>
        <h1>{t('search-results-page.header')}</h1>
        <hr />
      </div>
      <Filters />
      <Accordion />
    </div>
  );
};

export default ResultsContainer;
