import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [practiceState, setPracticeState] =
    useState<IConservationPractice>(intialState);
  const [secondState, setSecondState] =
    useState<IConservationPractice>(intialState);
  const [selectedPractice, setSelectedPractice] = useState(-1);

  useEffect(() => {
    setPracticeState({ ...practiceState, practice: ConservationPractice });
    setSecondState({ ...secondState, practice: ConservationPractice });
  }, [selectedPractice]);

  const handleChange = (e) => {
    const practiceVal = e.target.value;
    if (practiceVal !== '') {
      setSelectedPractice(practiceVal);
      if (selectedPractice >= 0 && practiceVal !== selectedPractice) {
        setSecondState({ ...intialState, disabled: false });
      } else {
        setSecondState({ practice: ConservationPractice, disabled: false });
      }
    } else {
      setSecondState({ ...intialState });
    }
  };

  return (
    <div className='practice-box-wrapper'>
      <div className='search-by-practice-section'>
        <label
          className='usa-label practice-label'
          htmlFor='practiceCategoryValue'
        >
          {t('search-by-conservation-practice.heading')}
        </label>
        <div className='desktop:grid-col-8'>
          <p>{t('search-by-conservation-practice.first-label-name')}</p>
          <select
            className='usa-select'
            id='practiceCategoryValue'
            name='practiceCategorySelect'
            onChange={handleChange}
          >
            <option value=''>All practices (default)</option>
            {practiceState.practice.length
              ? practiceState.practice.map((practice: any) => {
                  return (
                    <option key={practice.practiceCategory} value={practice.id}>
                      {practice.practiceCategory}
                    </option>
                  );
                })
              : null}
          </select>
        </div>

        <div className='desktop:grid-col-8'>
          <p>{t('search-by-conservation-practice.second-label-name')}</p>
          <select
            className='usa-select'
            id='specificPracticeValue'
            name='specificPracticeSelect'
            disabled={secondState.disabled}
          >
            <option value=''>- Select practice -</option>
            {secondState.practice.length
              ? secondState.practice.map((item: any) => {
                  return (
                    <option key={item.practiceCategory} value={item.practice}>
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
