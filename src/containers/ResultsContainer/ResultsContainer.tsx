import { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import './results.scss';
import PracticeRow from '../../components/PracticeRow';
import FilterBy from '../../components/Filter/FilterBy';

export const practiceList: any = [
  {
    id: 0,
    practiceName: 'Access Road',
    practiceDescription: 'An established route for equipment and vehicles.',
  },
  {
    id: 1,
    practiceName: 'Cropland Soil Quality',
    practiceDescription:
      'Healthy soil is critical to successful agriculture and is vital to produce the food and fiber we use every day. When soil issues arise, from soil organism habitat degradation to erosion to nutrient depletion, they can have long-term and costly impacts to soil health and production goals.',
  },
];

const ResultsContainer = () => {
  const { t } = useTranslation();
  const collapsablePractices: any =
    practiceList.map((practice: any) => {
      return {
        id: practice.id,
        practiceName: practice.practiceName,
        practiceDescription: practice.practiceDescription,
        isExpanded: false,
      };
    }) || [];
  const [practicesCollapsed, setPracticesCollapse]: any =
    useState(collapsablePractices);

  const [currentPracticeCategory, setCurrentPracticeCategory] = useState(-1);
  const [currentSpecifcPractice, setSpecifcPractice] = useState(-1);

  const handleCollapsePractice = (option: number) => {
    setCurrentPracticeCategory(option);
    const parentIndex: number = practicesCollapsed.findIndex(
      (item: any) => item.id === option
    );

    const updatedPractice: any = {
      ...practicesCollapsed[parentIndex],
      isExpanded: !practicesCollapsed[parentIndex].isExpanded,
    };
    const updatedList: any =
      practicesCollapsed.map((ele: any) => {
        if (ele.id === option) {
          return updatedPractice;
        }
        // Collapse all other filters.
        return { ...ele, isExpanded: false };
      }) || [];

    setPracticesCollapse(updatedList);
  };

  const handleSelectPracticeRow = (id: number) => {
    setSpecifcPractice(id);
  };

  const renderPracticeAccordion = () => {
    return (
      <div className='practice-accordion'>
        <h3>
          <strong>{t('search-results-page.conservation-practices')}</strong>
        </h3>
        <ul className='list-group'>
          {practicesCollapsed.map((ele: any, index: number) => {
            const listItemClassName = classNames(
              'list-group-item',
              'text-left',
              {
                selected: currentPracticeCategory === index,
              }
            );
            const listItemIconClassName = classNames('fas', {
              'fa-chevron-right': !practicesCollapsed[index].isExpanded,
              'fa-chevron-down': practicesCollapsed[index].isExpanded,
            });
            return (
              <div key={ele.id}>
                <li
                  data-testid={ele.practiceName}
                  key={ele.id}
                  role='presentation'
                  onClick={() => handleCollapsePractice(ele.id)}
                  className={listItemClassName}
                >
                  <i aria-hidden='true' className={listItemIconClassName} />
                  <span className='font-sans-lg margin-left-2'>{`${ele.practiceName}`}</span>
                </li>
                {practicesCollapsed.length &&
                practicesCollapsed[index].isExpanded ? (
                  <PracticeRow
                    handleRowSelect={handleSelectPracticeRow}
                    rowData={{
                      id: practicesCollapsed[index].index,
                      displayLabel:
                        practicesCollapsed[index].practiceDescription,
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </ul>
      </div>
    );
  };
  return (
    <div className='results-page'>
      <h1>{t('search-results-page.header')}</h1>
      <hr />
      <FilterBy />
      {renderPracticeAccordion()}
    </div>
  );
};

export default ResultsContainer;
