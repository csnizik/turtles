import { useEffect, useState } from 'react';
import TagManager from 'react-gtm-module';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import CustomButton from '../CustomButton';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import { IPractice, IPracticeCategory } from '../../common/types';
import './find-by-practice.scss';
import {
  useGetPracticeCategoryQuery,
  useGetPracticeQuery,
} from '../../Redux/services/api';
import {
  setPracticeCategory,
  setSpecificPractice,
} from '../../Redux/Slice/practiceSlice';

import { baseURL } from '../../common/util/AxiosUtil';

const homePagePracticeImage: string =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5B-LQ-QdFXKeJgU9W0wxxffcnPg3FS8ox4Q&usqp=CAU';

const FindByPractices = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [selectedPractice, setSelectedPractice] = useState(-1);
  const [selectedSubPractice, setSelectedSubPractice] = useState(-1);
  const [hiddenSelectedPractice, setHiddenSelectedPractice] = useState(-1);

  const handleFindPractices = () => {
    dispatch(setPracticeCategory(+hiddenSelectedPractice));
    dispatch(setSpecificPractice(+selectedSubPractice));
    if (+hiddenSelectedPractice !== -1 && +selectedSubPractice === -1) {
      history.push(`00/ConservationPractices/${+hiddenSelectedPractice}`);
    } else if (+hiddenSelectedPractice !== -1 && +selectedSubPractice !== -1) {
      history.push(
        `00/ConservationPractices/${+hiddenSelectedPractice}/${+selectedSubPractice}`
      );
    } else {
      history.push('00/ConservationPractices');
    }
    //Google Analytics code for PracticeSearch(hiddenSelectedPractice, selectedSubPractice)
    window.dataLayer.push({ js: new Date() });
    window.dataLayer.push({
      event: 'PracticeSearch',
      EventProps: {
        SearchPractice: hiddenSelectedPractice,
        SearchState: selectedSubPractice,
      },
    });
  };

  const GTMArg = { gtmId: process.env.REACT_APP_Google_Tag || '' };
  TagManager.initialize(GTMArg);

  const practiceCategory = useGetPracticeCategoryQuery();
  const subPractice = useGetPracticeQuery(selectedPractice);

  const handleCategoryChange = (e) => {
    const practiceVal = e.target.value;
    if (practiceVal !== '') {
      setSelectedPractice(practiceVal);
      setHiddenSelectedPractice(practiceVal);
    }
    setSelectedSubPractice(-1);
    dispatch(setSpecificPractice(-1));
  };
  const findP = (id: number) => {
    axios
      .post(`${baseURL}practiceSearch`, {
        practice_id: id,
        state_county_code: '00000',
      })
      .then((response) =>
        setHiddenSelectedPractice(response?.data?.[0]?.practiceCategoryId)
      );
  };
  useEffect(() => {
    setSelectedPractice(-1);
    setSelectedSubPractice(-1);
    dispatch(setPracticeCategory(-1));
    dispatch(setSpecificPractice(-1));
  }, []);

  const handlePracticeChange = (e) => {
    const practiceSubVal = e.target.value;
    setSelectedSubPractice(practiceSubVal);
    if (selectedPractice < 0) {
      findP(practiceSubVal);
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
            data-testid='categoryOptions'
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
            data-testid='practiceOptions'
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
    </section>
  );
};

export default FindByPractices;
