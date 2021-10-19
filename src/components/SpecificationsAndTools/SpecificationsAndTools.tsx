import { useTranslation } from 'react-i18next';
import { useGetAssociatedPracticeQuery } from '../../Redux/services/api';
import './specs.scss';
import { IAssociatedPracticeList } from '../../common/types';

interface ISpecAndToolsProps {
  data: any;
  isSuccess: boolean;
  selectedStateCode: string;
  selectedPracticeId: number;
}

const intro: string =
  'NRCS technical standards guide proper implementation of recommended practices.  Each practice also has a payment schedule that determines how much financial assistance is available for beginning or installing it. The following links provide details about practice standards and payment schedules specific to your region.';
const promptText: string =
  'You can find national conservation practice standards, overviews, conservation practice effects and network effects diagrams on the NRCS website.';

const SpecificationsAndTools = ({
  data,
  isSuccess,
  selectedStateCode,
  selectedPracticeId,
}: ISpecAndToolsProps) => {
  const userSelectedFilter = {
    stateCode: selectedStateCode,
    practiceId: selectedPracticeId,
  };

  const { t } = useTranslation();

  const clickHandler = (value) => {
    window.localStorage.setItem('Practice', value);
  };

  const content = useGetAssociatedPracticeQuery(userSelectedFilter);

  const getHeaderText = () => {
    const practiceName = (data && data?.practiceName) || '';
    if (practiceName) {
      return `${practiceName} Specifications and Tools`;
    }
    return practiceName;
  };

  const renderNationalSpecs = () => {
    return (
      <>
        <div className='national-specs'>
          <h4>National Specifications</h4>
          <h5>{promptText}</h5>
          <div className='link'>
            <a
              href='https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/technical/cp/ncps/?cid=nrcs143_026849'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Current NRCS National Conservation Practices link'
            >
              NRCS National Conservation Practices
              <img
                alt='All Conservation at Work videos'
                // eslint-disable-next-line global-require
                src={require('./image/newLinkIcon.svg').default}
              />
            </a>
          </div>
        </div>

        <div className='associated-prac'>
          <h4>{t('associated-practices.title')}</h4>
          <p>{t('associated-practices.description')}</p>
          <div className='row'>
            {content.data?.map((practice: any) => {
              return (
                <>
                  <div className='grid-col-6'>
                    <ul>
                      <li key={practice.practiceId}>
                        <a
                          href='/ConservationPractices'
                          onClick={() => clickHandler(practice.practiceId)}
                          target='_blank'
                        >
                          {practice.practiceName}
                        </a>
                        &ensp;({practice.practiceCode})
                      </li>
                    </ul>
                  </div>
                  {practice.data?.map((item: IAssociatedPracticeList) => {
                    return (
                      <div className='grid-col-6'>
                        <ul>
                          <li key={item.practiceId}>
                            <a
                              href='/ConservationPractices'
                              onClick={() => clickHandler(item.practiceId)}
                              target='_blank'
                            >
                              {item.practiceName}
                            </a>
                            &ensp;({item.practiceCode})
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  };

  if (!isSuccess) return null;

  return (
    <div className='st-parent' id='PracticeSpecifications'>
      <h2>{getHeaderText()}</h2>
      <h4>{intro}</h4>
      {renderNationalSpecs()}
    </div>
  );
};

export default SpecificationsAndTools;
