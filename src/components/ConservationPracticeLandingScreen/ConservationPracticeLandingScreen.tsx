import { useEffect, useState } from 'react';
import { getRequest } from '../../common/util/AxiosUtil';
import { setPracticeCategory } from '../../Redux/Slice/practiceSlice';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import ConservationPracticeIntroduction from '../ConservationPracticeIntroduction';
import ConservationPracticesCategories from '../ConservationPracticesCategories';
import './conservation-landing-screen.scss';

const ConservationPracticeLandingScreen = ({ setPracticeViewType }: any) => {
  const [categories, setCategories] = useState([]);

  const dispatch = useAppDispatch();

  const selectPractice = (practiceCategoryId) => {
    dispatch(setPracticeCategory(practiceCategoryId));
    setPracticeViewType({
      allPractices: false,
      practiceCategories: true,
      individualPractice: false,
    });
  };

  const getPractices = async () => {
    try {
      const response: any = await getRequest('/practice/categories');
      setCategories(response.data.length > 0 ? response.data : []);
    } catch (error) {
      // throw new Error('practice categories Request Error');
    }
  };

  useEffect(() => {
    getPractices();
  }, []);

  return (
    <div>
      <ConservationPracticeIntroduction />
      <div className='landing-screen-categories'>
        <ConservationPracticesCategories
          selectPractice={selectPractice}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default ConservationPracticeLandingScreen;
