import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import CustomButton from '../CustomButton';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import {
  IPractice,
  IPracticeCategory,
  IPracticeDropdown,
} from '../../common/types';
import './find-by-practice.scss';
import {
  useGetPracticeCategoryQuery,
  useGetPracticeQuery,
} from '../../Redux/services/api';
import {
  setPracticeCategory,
  setSpecificPractice,
} from '../../Redux/Slice/practiceSlice';

const homePagePracticeImage: string =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5B-LQ-QdFXKeJgU9W0wxxffcnPg3FS8ox4Q&usqp=CAU';

const intialState = {
  disabled: true,
};

const FindByPractices = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [secondState, setSecondState] =
    useState<IPracticeDropdown>(intialState);
  const [selectedPractice, setSelectedPractice] = useState(-1);
  const [selectedSubPractice, setSelectedSubPractice] = useState(-1);

  const handleFindPractices = () => {
    history.push('/ConservationPractices');
  };

  const practiceCategory = useGetPracticeCategoryQuery();
  const subPractice = useGetPracticeQuery(selectedPractice);

  const handleCategoryChange = (e) => {
    const practiceVal = e.target.value;
    if (practiceVal !== '') {
      setSelectedPractice(practiceVal);
      if (selectedPractice >= 0 && practiceVal !== selectedPractice) {
        setSecondState({ ...intialState, disabled: false });
        dispatch(setSpecificPractice(-1));
      } else {
        setSecondState({ disabled: false });
      }
    } else {
      setSecondState({ ...intialState });
    }
    dispatch(setPracticeCategory(+practiceVal));
  };

  const handlePracticeChange = (e) => {
    const practiceSubVal = e.target.value;
    setSelectedSubPractice(practiceSubVal);
    dispatch(setSpecificPractice(+practiceSubVal));
  };

  return (
    <div className='grid-row find-practice-container'>
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
            onChange={handleCategoryChange}
          >
            <option value={-1}>All practices (default)</option>
            {practiceCategory.isSuccess && practiceCategory.data
              ? practiceCategory.data.map((practice: IPracticeCategory) => {
                  return (
                    <option
                      key={practice.practiceCategoryId}
                      value={practice.practiceCategoryId}
                    >
                      {practice.practiceCategoryName}
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
            value={selectedSubPractice}
            onChange={handlePracticeChange}
          >
            <option value={-1}>- Select practice -</option>
            {subPractice.isSuccess && subPractice.data
              ? subPractice.data.map((item: IPractice) => {
                  return (
                    <option key={item.practiceId} value={item.practiceId}>
                      {item.practiceName}
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
    </div>
  );
};

export default FindByPractices;
