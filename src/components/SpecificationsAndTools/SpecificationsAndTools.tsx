import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useGetAssociatedPracticeQuery } from '../../Redux/services/api';
import './specs.scss';
import { IAssociatedPracticeList } from '../../common/types';
import { useAppSelector } from '../../Redux/hooks/hooks';
import image from './image/newLinkIcon.svg';

interface ISpecAndToolsProps {
  data: any;
  isSuccess: boolean;
  selectedStateCode: string;
  selectedPracticeId: number;
}

const intro: string =
  'NRCS technical standards guide proper implementation of recommended practices.  Each practice also has a payment schedule that determines how much financial assistance is available for beginning or installing it. The following links provide details about practice standards and payment schedules specific to your region.';
const nationalPromptText: string =
  'You can find national conservation practice standards, overviews, conservation practice effects and network effects diagrams on the NRCS website.';
const statePromptText: string =
  'You can access this state’s conservation practice standards on the NRCS Field Office Technical Guide.';

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
  const selectedStateName = useAppSelector(
    (state) => state?.stateSlice?.stateNameDisplay
  );

  const content = useGetAssociatedPracticeQuery(userSelectedFilter);

  const getHeaderText = () => {
    const practiceName = (data && data?.practiceName) || '';
    if (practiceName) {
      return `${practiceName} Specifications and Tools`;
    }
    return practiceName;
  };

  const renderDetailedPracticeStandardGuide = () => {
    return (
      <div>
        <h4>Accessing Colorado Practice Standards on the NRCS Website </h4>
        <h4>1. Goto the NRCS Colorado Conservation Practices Website</h4>
        <h4>2. Select “Colorado” from the state dropdown if it is not already selected</h4>
        {/* image */}

        <h4>3. On the toolbar below the state selector ensure that “Document Tree” is selected</h4>
        <h4>4. Click “Section 4 - Practice Standards and Supporting Documents”</h4>
        {/* image */}

        <h4>5. Scroll down the list and select “Cover Crop” this will load the documents related to your practice standard</h4>
        {/* image */}
      </div>
    );
  }

  const renderNationalSpecs = () => {
    return (
      <div className='state-specific-container' data-testid='state-specifications'>
        <h4>National Specifications</h4>
        <h5>{nationalPromptText}</h5>
        <div className='link'>
          <a
            href='https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/technical/cp/ncps/?cid=nrcs143_026849'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Current NRCS National Conservation Practices link'
          >
            NRCS National Conservation Practices
            <img alt='All Conservation at Work videos' src={image} />
          </a>
        </div>
      </div>
    );
  };

  const renderStateSpecs = () => {
    return (
      <div className='state-specific-container' data-testid='state-specifications'>
        <h4>{selectedStateName} Specifications</h4>
        <h5>{statePromptText}</h5>
        <div className='link'>
          <button className='practice-standard-button'>
            Instructions for Acessing this State’s Practice Standards
          </button>
          <a
            href='https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/technical/cp/ncps/?cid=nrcs143_026849'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Current NRCS National Conservation Practices link'
          >
            Go Straight to this State’s Field Office Technical Guide
            <img alt='All Conservation at Work videos' src={image} />
          </a>
        </div>
        {renderDetailedPracticeStandardGuide()}
      </div>
    );
  }

  const renderAssociatedPractice = () => {
    return (
      <div className='associated-prac' data-testid='associated-practice'>
        <h4>{t('associated-practices.title')}</h4>
        <p>{t('associated-practices.description')}</p>
        <ul className='practices-row'>
          {content.data?.map((practice: IAssociatedPracticeList) => {
            return (
              <Fragment key={practice.practiceId}>
                <div className='grid-col-6'>
                  <li>
                    <Link
                      to={{
                        pathname: `/ConservationPractices`,
                        state: { detail: practice.practiceId },
                        search: `PracticeCategory=${practiceCategory}?Practice=${practice.practiceId}?State=${selectedStateCode}`,
                      }}
                      target='_blank'
                      aria-label={`${practice.practiceName} link opens a new tab`}
                    >
                      {practice.practiceName}
                    </Link>
                    &ensp;({practice.practiceCode})
                  </li>
                </div>
              </Fragment>
            );
          })}
        </ul>
      </div>
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
      {selectedStateName==='U.S.' ? renderNationalSpecs() : renderStateSpecs()}
      {renderAssociatedPractice()}
    </section>
  );
};

export default SpecificationsAndTools;
