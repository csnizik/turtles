import classNames from 'classnames';
import { useState } from 'react';
import { useGetRelatedResourceConcernCategoryQuery } from '../../Redux/services/api';
import DetailedDescription from './DetailedDescription';
import Spinner from '../Spinner/Spinner';
import './resource-concern-treated.scss';


const ResourceConcernTreated = ( {selectedStateCode,selectedPracticeId} : any ) => {
  const initialFilter = {
    stateCode: selectedStateCode.stateCode,
    practiceId: selectedPracticeId
  };
 
  const [tab, setTab] = useState(null);

  const { data, error, isLoading, isSuccess, isError } = useGetRelatedResourceConcernCategoryQuery(initialFilter);

  const toggleExpandCategory = (categoryId: any) => {
    if (tab === categoryId) {
      setTab(null);
      return;
    }
    
    setTab(categoryId);
  };

  const renderAccordionSection = (rcCa : any) => {
    const rc = rcCa;

    if(rc.result.length<1) return null;
    return (
      <div className='accordion-section'>
        {rc.result.map((rcCategory: any) => {
          const categoryId = rcCategory.rcCategoryId;
          const chevronClassName = classNames('fas', {
            'fas fa-chevron-right': tab !== categoryId,
            'fas fa-chevron-down': tab === categoryId,
          });
          return (

            <div className='accordion-container' key={categoryId} data-testid='rc-accordion'>
              <li key={categoryId}>
                <i
                  className={chevronClassName}
                  onClick={() => toggleExpandCategory(categoryId)}
                  role='presentation'
                />
                <div className='accordion-data'>
                  <h4>{rcCategory.rcCategoryName}
                    <span className='num-rc-count'>{`(${rcCategory.resourceConcerns.length} resource concerns)`}</span>
                  </h4>
                </div>
              </li>
              {tab === categoryId && (
                <DetailedDescription resourceConcerns={rcCategory.resourceConcerns}/>
              )}
            </div>

          );
        })
        }
      </div>
    );
  }

  return (
    <>
      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
      <section className='rc-treated-box'>
        <h2>Resource Concerns Treated</h2>
        <p data-testid='rc-description'>
          NRCS conservation activities are carried out according to a conservation plan 
          developed with the producer that identifies the appropriate conservation practice or 
          practices to address the resource concerns affecting their farm, ranch, or forest. 
          The resource concerns addressed by this practice are listed below.
        </p>
        {renderAccordionSection(data)}
      </section>
      )}
    </>
  );
};

export default ResourceConcernTreated;
