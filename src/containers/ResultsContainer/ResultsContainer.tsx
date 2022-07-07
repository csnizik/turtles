import Accordion from '../../components/ResultAccordion';
import ProjectListGroup from '../../components/ProjectListGroup';
import Filters from '../../components/Filter';
import './results.scss';
import { useAppSelector } from '../../Redux/hooks/hooks';

const ResultsContainer = () => {
  const uiText: any = useAppSelector(
    (state) => (state?.staticTextSlice?.staticData as any)?.data
  );

  return (
    <main>
      <div className='results-page' data-testid='results-container'>
        <div className='search-title'>
          <h1>{uiText?.QuickSearchResultsTitle?.configurationValue}</h1>
          <hr />
        </div>
        <Filters />
        <Accordion />
        <div className='top-title'>
          <h2 className='title'>
            {uiText?.QuickSearchResultsHeading2?.configurationValue}
          </h2>
        </div>
        <ProjectListGroup isMapDisplayed={false} noListDots={true} />
      </div>
    </main>
  );
};

export default ResultsContainer;
