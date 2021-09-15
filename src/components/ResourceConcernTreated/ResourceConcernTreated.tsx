import classNames from 'classnames';
import {  useEffect, useState } from 'react';
import { useGetRelatedResourceConcernCategoryQuery } from '../../Redux/services/api';
import DetailedDescription from './DetailedDescription';
import Spinner from '../Spinner/Spinner';
import './resource-concern-treated.scss';

const ResourceConcernTreated = ( {selectedStateCode,selectedPracticeId} : any ) => {
  const initialFilter = {
    stateCode: '',
    practiceId: 0,
    result: []
  };

  const [filter, setFilter] = useState(initialFilter);
  const [tab, setTab] = useState(null);

  useEffect(() => {
    setFilter({ stateCode: selectedStateCode, practiceId: selectedPracticeId, result: [] });
  }, []);

  const { data, error, isLoading, isSuccess, isError } = useGetRelatedResourceConcernCategoryQuery(filter);

  const toggleExpandCategory = (categoryId: any) => {
    if (tab === categoryId) {
      setTab(null);
      return;
    }
    
    setTab(categoryId);
  };

  return (
    <>

      {isLoading && <Spinner />}
      {isError && error}
      {isSuccess && data && (
      <section className='document-box'>
        <h2>Resource Concerns Treated</h2>
        <p data-testid='rc-description'>
          NRCS conservation activities are carried out according to a conservation plan 
          developed with the producer that identifies the appropriate conservation practice or 
          practices to address the resource concerns affecting their farm, ranch, or forest. 
          The resource concerns addressed by this practice are listed below.
        </p>
        
        <div className='accordion-section'>
          {data.result.map((rcCategory: any) => {
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
                      <span className='num-rc-count'>{` (${rcCategory.resourceConcerns.length} resource concerns)`}</span>
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
      </section>
      )}
    </>
  );
};

export default ResourceConcernTreated;
