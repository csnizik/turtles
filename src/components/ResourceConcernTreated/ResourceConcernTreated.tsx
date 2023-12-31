import classNames from 'classnames';
import { useState } from 'react';
import { useGetRelatedResourceConcernCategoryQuery } from '../../Redux/services/api';
import DetailedDescription from './DetailedDescription';
import Spinner from '../Spinner/Spinner';
import './resource-concern-treated.scss';
import { useAppSelector } from '../../Redux/hooks/hooks';

const ResourceConcernTreated = ({
  selectedStateCode,
  selectedPracticeId,
  rcRef,
}: any) => {
  const initialFilter = {
    stateCode: selectedStateCode,
    practiceId: selectedPracticeId,
  };

  const [tab, setTab] = useState(null);
  const { data, error, isLoading, isSuccess, isError } =
    useGetRelatedResourceConcernCategoryQuery(initialFilter);

  const fromPdfReport = useAppSelector(
    (state) => state?.pdfGenSlice?.enablePdfGen
  );

  const toggleExpandCategory = (categoryId: any) => {
    if (tab === categoryId) {
      setTab(null);
      return;
    }

    setTab(categoryId);
  };

  const renderAccordionSection = (rcCa: any) => {
    const rc = rcCa;

    if (!rc || !rc.result || rc.result.length < 1) return null;
    return (
      <div className='accordion-section' ref={rcRef}>
        {rc.result.map((rcCategory: any) => {
          const categoryId = rcCategory.rcCategoryId;
          const chevronClassName = fromPdfReport
            ? 'fas fa-chevron-down'
            : classNames('fas', {
                'fas fa-chevron-down': tab === categoryId,
                'fas fa-chevron-right': tab !== categoryId,
              });
          return (
            <div
              className='accordion-container'
              key={categoryId}
              data-testid='rc-accordion'
              onClick={() => toggleExpandCategory(categoryId)}
              role='presentation'
            >
              <p className='hidden-content'>{categoryId}</p>
              <li key={categoryId}>
                <i className={chevronClassName} />
                <button type='button' className='accordion-data'>
                  <h3>
                    {rcCategory.rcCategoryName}
                    <span className='num-rc-count'>{`(${rcCategory.resourceConcerns.length} resource concerns)`}</span>
                  </h3>
                </button>
              </li>
              {(tab === categoryId || fromPdfReport) && (
                <DetailedDescription
                  resourceConcerns={rcCategory.resourceConcerns}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const uiText: any = useAppSelector(
    (state) => (state?.staticTextSlice?.staticData as any)?.data
  ); 

  return (
    <>
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
        <section className='rc-treated-box' id='ResourceConcernsTreated'>
          <h2>{uiText?.cpDetailHeadingRC?.configurationValue}</h2>
          <p data-testid='rc-description'>
            {uiText?.cpDetailHeadingRCDescription?.configurationValue}
          </p>
          {renderAccordionSection(data)}
        </section>
      )}
    </>
  );
};

export default ResourceConcernTreated;
