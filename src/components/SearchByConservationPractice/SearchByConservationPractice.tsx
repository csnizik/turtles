import { useState, useEffect } from 'react';
import { ConservationPractice } from '../../common/typedconstants.common';
import './conservation-practice.scss';

interface IConservationPractice {
  practice: Array<any>;
  disabled: boolean;
}

const intialState = {
  practice: [],
  disabled: true,
};

const SearchByConservationPractice = () => {
  const [practiceState, setPracticeState] =
    useState<IConservationPractice>(intialState);

  useEffect(() => {
    setPracticeState({ practice: ConservationPractice, disabled: false });
  }, []);

  return (
    <div className='box-wrapper'>
      <div className='search-by-location-section'>
        <label
          className='usa-label location-search-header'
          htmlFor='locationValue'
        >
          Conservation Practice
        </label>
        <div className='desktop:grid-col-8'>
          <p>Select practice category</p>
          <select
            className='usa-select'
            id='practiceCategoryValue'
            name='practiceCategorySelect'
            placeholder='- Select practice category -'
          >
            <option value=''>All practices (default)</option>
            {ConservationPractice.length
              ? ConservationPractice.map((item: any) => {
                  console.log(item);
                  return (
                    <option
                      key={item.practiceCategory}
                      value={item.practiceCategory}
                    >
                      {item.practiceCategory}
                    </option>
                  );
                })
              : null}
          </select>
        </div>

        <div className='desktop:grid-col-8'>
          <p>Select a practice (optional)</p>
          <select
            className='usa-select'
            id='practiceValue'
            name='practiceSelect'
            placeholder='- Select practice -'
            disabled
          >
            <option value=''>- Select practice</option>
            {ConservationPractice.length
              ? ConservationPractice.map((item: IConservationPractice) => {
                  return (
                    <option key={item.practice} value={item.practice}>
                      {item.practice}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchByConservationPractice;
