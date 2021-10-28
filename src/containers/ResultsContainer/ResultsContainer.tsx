import { useTranslation } from 'react-i18next';
import { usePostProjectSearchDataQuery } from '../../Redux/services/api';
import { useAppSelector } from '../../Redux/hooks/hooks';
import Accordion from '../../components/ResultAccordion';
import ProjectListGroup from '../../components/ProjectListGroup';
import Filters from '../../components/Filter';
import './results.scss';

const ResultsContainer = () => {
  const { t } = useTranslation();
  const searchInputData = useAppSelector(
    (state) => state.practiceSlice?.searchInput
  );

  const { data, error, isLoading, isSuccess, isError } =
    usePostProjectSearchDataQuery(searchInputData);

  return (
    <div className='results-page'>
      <div className='search-title'>
        <h1>{t('search-results-page.header')}</h1>
        <hr />
      </div>
      <Filters />
      <Accordion />
      <ProjectListGroup
        error={error}
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isMapDisplayed={false}
        projectsList={data}
      />
    </div>
  );
};

export default ResultsContainer;
