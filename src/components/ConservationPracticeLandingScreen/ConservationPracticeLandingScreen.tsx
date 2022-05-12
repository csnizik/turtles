import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getRequest } from '../../common/util/AxiosUtil';
import { setPracticeCategory } from '../../Redux/Slice/practiceSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import ConservationPracticeIntroduction from '../ConservationPracticeIntroduction';
import ConservationPracticesCategories from '../ConservationPracticesCategories';
import './conservation-landing-screen.scss';
//import { useSelector } from 'react-redux';

const intro: string =
  'Through the Farm Bill, NRCS is able to provide assistance to agricultural producers who want to voluntarily make changes to their land or production operations to improve conditions related to soil, water, air, plants, wildlife and other natural resources. These conservation activities, or "practices", improve the health of ecosystems while also boosting the land\'s resiliency and production.\n\nTechnical assistance and financial assistance is available. Technical assistance is free to producers, and involves a team of agency experts working with producers to develop a customized conservation plan and system of conservation practices. Financial assistance helps producers pay for the adoption of those practices and is available through multiple Farm Bill programs, such as the Environmental Quality Incentives Program (EQIP) and the Conservation Stewardship Program (CSP). NRCS assistance varies by state, practice, and program, but generally covers 50 to 70 percent of the cost. Rates may be higher for priority practices or to address the unique circumstances of producers in historically underserved groups.';

const ConservationPracticeLandingScreen = ({
  setPracticeViewType,
  stateCode,
}: any) => {
  const [categories, setCategories] = useState([]);
  const mountedRef = useRef(true);
  const { t } = useTranslation();
  const uiText = useAppSelector(
    (app: any) =>
      app?.api?.queries['getConfigurationSettingsStaticText(null)']?.data
  );
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
      let code: any = stateCode.toString();
      code = code.length === 1 ? `0${code}` : code;
      const response: any = (await getRequest(
        `/practice/category/${code}`
      )) || { data: [] };
      if (!mountedRef.current) return null;
      setCategories(response.data);
    } catch (error) {
      // throw new Error('practice categories Request Error');
    }
    return null;
  };

  useEffect(() => {
    getPractices();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return (
    <div data-testid='conserv-prac-land-screen'>
      <ConservationPracticeIntroduction
        introductionParagraph={uiText?.cp_paragraph_1?.configurationValue}
        introductionParagraph2={uiText?.cp_paragraph_2?.configurationValue}
        title='Conservation Practices'
      />
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
