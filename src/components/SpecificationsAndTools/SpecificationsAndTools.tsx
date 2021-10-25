import { useTranslation } from 'react-i18next';
import { useGetAssociatedPracticeQuery } from '../../Redux/services/api';
import './specs.scss';
import { IAssociatedPracticeList } from '../../common/types';
import { useAppSelector } from '../../Redux/hooks/hooks';

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

  const practiceCategory = useAppSelector(
    (state) => state?.practiceSlice?.selectedPracticeCategory
  );

  const updatePracticeCategory = practiceCategory.toString();

  const clickHandler = (value) => {
    window.localStorage.setItem('PracticeId', value);
    window.localStorage.setItem('StateId', selectedStateCode);
    window.localStorage.setItem('PracticeCategoryId', updatePracticeCategory);
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
          <div>
            <ul className='practices-row'>
              {content.data?.map((practice: IAssociatedPracticeList) => {
                return (
                  <>
                    <div className='grid-col-6'>
                      <li key={practice.practiceId}>
                        <a
                          href='/ConservationPractices'
                          onClick={() => clickHandler(practice.practiceId)}
                          target='_blank'
                          aria-label={`${practice.practiceName} link opens a new tab`}
                        >
                          {practice.practiceName}
                        </a>
                        &ensp;({practice.practiceCode})
                      </li>
                    </div>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
  };

  if (!isSuccess) return null;

  return (
    <section
      className='st-parent'
      data-testid='practice-spec'
      id='PracticeSpecifications'
    >
      <h2>{getHeaderText()}</h2>
      <h4>{intro}</h4>
      {renderNationalSpecs()}
    </section>
  );
};

export default SpecificationsAndTools;
