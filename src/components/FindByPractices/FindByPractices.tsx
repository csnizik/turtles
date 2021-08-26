import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import CustomButton from '../CustomButton';
import { ConservationPractice } from '../../common/typedconstants.common';
import { IConservationPracticeDropdown } from '../../common/types';
import './find-by-practice.scss';

const homePagePracticeImage: string =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5B-LQ-QdFXKeJgU9W0wxxffcnPg3FS8ox4Q&usqp=CAU';

const intialState = {
  practice: [],
  disabled: true,
};

const FindByPractices = () => {
  const { t } = useTranslation();
  const [practiceState, setPracticeState] =
    useState<IConservationPracticeDropdown>(intialState);
  const [secondState, setSecondState] =
    useState<IConservationPracticeDropdown>(intialState);
  const [selectedPractice, setSelectedPractice] = useState(-1);

  const handleFindPractices = () => {
    // TODO: Figure out where 'Find Practices' redirects to...
  };

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
    <section className='grid-row find-practice-container'>
      <div className='tablet:grid-col-7 content-row'>
        <h2 className='h2-style'>{t('find-by-practice.heading')}</h2>
        <p className='p-style'>{t('find-by-practice.intro')}</p>
        <div className='practice-label-grid'>
          <label className='usa-label' htmlFor='categoryOptions'>
            {t('search-by-conservation-practice.first-label-name')}
          </label>
          <label className='usa-label' htmlFor='practiceOptions'>
            {t('search-by-conservation-practice.second-label-name')}
          </label>
        </div>
        <div className='practice-select-grid'>
          <select
            className='usa-select'
            id='categoryOptions'
            name='categorySelect'
            value={selectedPractice}
            onChange={handleChange}
          >
            <option value={-1}>All practices (default)</option>
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
          <select
            className='usa-select'
            id='practiceOptions'
            name='practiceSelect'
            disabled={secondState.disabled || selectedPractice < 0}
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
        <CustomButton onClick={handleFindPractices}>
          {t('find-by-practice.find-practices')}
        </CustomButton>
      </div>
      <div className='tablet:grid-col-4 tablet:grid-offset-1 practice-image'>
        <img src={homePagePracticeImage} alt='Soil' />
      </div>
    </section>
  );
};

export default FindByPractices;
