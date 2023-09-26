import { useEffect } from 'react';
import { useAppDispatch } from '../../Redux/hooks/hooks';
import './next-steps.scss';
import { useGetConfigurationSettingsStaticTextQuery } from '../../Redux/services/api';
import { setStaticText } from '../../Redux/Slice/staticTextSlice';
import { NextStepsData} from '../../common/typedconstants.common';

const NextSteps = () => {
  const dispatch = useAppDispatch();
  const uiText = useGetConfigurationSettingsStaticTextQuery(null, {
    pollingInterval: 900000,
  });

  useEffect(() => {
    if (uiText && uiText?.data != null) {
      dispatch(setStaticText(uiText));
    }
  }, [uiText]);

  return (
    <div className='next-step-container' data-testid='Next-Steps'>
        <h1 >
        {NextStepsData.title}
        </h1>
        <h3> {NextStepsData.subtitle} </h3>
         <p>{NextStepsData.nextStepsParghraph}</p> 
         <div className='link'>
              <a href={uiText.data.ServiceCenterlocator.configurationValue}
                  target='_blank'
                  rel='noopener noreferrer'
              > {NextStepsData.linklable} 
              <img  src={'../../../../images/arrow-up-right.svg'} alt="img" />
              </a>
         </div>
    </div>
   );
  } 

export default NextSteps; 
