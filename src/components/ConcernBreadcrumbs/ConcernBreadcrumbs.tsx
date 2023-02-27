import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IResourceConcernList } from '../../common/types';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import { useGetResourceConcernQuery } from '../../Redux/services/api';
import {
  setResourceConcernCategory,
  setSpecificResourceConcern,
} from '../../Redux/Slice/resourceConcernSlice';
import './concern-breadcrumbs.scss';

const ConcernBreadcrumbs = ({
  currentView,
  setResourceConcernViewType,
  currentResourceConcern,
  currentResourceConcernCategory,
  handleCreateReport,
}: any) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { stateCode }: any = useParams();

     const handleNavigateBreadcrumb = (breadcrumbId: number) => {
    const defaultResourceConcernViews = {
      allResourceConcerns: false,
      resourceConcernCategories: false,
      individualResourceConcern: false,
    };
    switch (breadcrumbId) {
      // Selected 'Resource Concerns'
      case 0: {
        dispatch(setResourceConcernCategory(-1));
        dispatch(setSpecificResourceConcern(-1));
        setResourceConcernViewType({ ...defaultResourceConcernViews, allResourceConcerns: true });
        history?.push(`/${stateCode}/ResourceConcerns`);
        break;
      }
      // Selected a resourceConcern category
      case 1: {
        setResourceConcernViewType({
          ...defaultResourceConcernViews,
          resourceConcernCategories: true,
        });
        history?.push(
          `/${stateCode}/ResourceConcerns/${currentResourceConcernCategory.resourceConcernId}`
        );
        break;
      }
      // Selected an individual / specfic resourceConcern (Eg. 'Cover Crow')
      case 2: {
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleKeyPressed = (breadcrumbId: number, event: any) => {
    if (event.keyCode === 9 || event.key === 'Tab') return;
    handleNavigateBreadcrumb(breadcrumbId);
  };

  return (
    <nav
      className='usa-breadcrumb margin-top-1 margin-left-3 crumbs-container'
      aria-label='Breadcrumbs'
      data-testid='ConcernBreadcrumbs'
    >
      <ol className='usa-breadcrumb__list'>
        <li // eslint-disable-line
          className='usa-breadcrumb__list-item'
          aria-label='Resource Concern Overview breadcrumb'
          onClick={() => handleNavigateBreadcrumb(0)}
          onKeyUp={(e) => handleKeyPressed(0, e)}
        >
          {currentResourceConcernCategory ? (
            <button
              type='button'
              className='usa-breadcrumb__link btn btn-link'
              aria-label='Navigate back to the list of Resource Concern categories'
            >
              <span>Resource Concerns</span>
            </button>
          ) : (
            <span>Resource Concerns</span>
          )}
        </li>

        {currentView?.individualResourceConcern &&
        currentResourceConcern &&
        currentResourceConcern ? (
          <>
            <li // eslint-disable-line
              className='usa-breadcrumb__list-item'
              aria-label='Resource Concern Category Breadcrumb'
              onClick={() => handleNavigateBreadcrumb(1)}
              onKeyUp={(e) => handleKeyPressed(0, e)}
            >
              <button
                type='button'
                className='usa-breadcrumb__link btn btn-link'
              >
                <span>{currentResourceConcernCategory?.resourceConcernName}</span>
              </button>
            </li>
            <li className='usa-breadcrumb__list-item'>
              <span>{currentResourceConcern.resourceConcernName}</span>
              <div className='resourceConcern-title-w-button'>
                <h2 className='resourceConcern-title'>
                  {currentResourceConcern.resourceConcernName}
                </h2>
                {/* The Following Div will be uncommentd when the custom report model works for RC Concerns */}
                {/* <div className='create-report-button'>
                  <button onClick={handleCreateReport} type='button'>
                    Create a Custom Report
                  </button>
                </div> */}
              </div>
            </li>
          </>
        ) : (
          <li // eslint-disable-line
            className='usa-breadcrumb__list-item'
            aria-label='Resource Concern Category Breadcrumb'
            onClick={() => handleNavigateBreadcrumb(1)}
            onKeyUp={(e) => handleKeyPressed(0, e)}
          >
            <span>{currentResourceConcernCategory?.resourceConcernName}</span>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default ConcernBreadcrumbs;
function async() {
  throw new Error('Function not implemented.');
}

