import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetAssociatedPracticeQuery } from '../../Redux/services/api';
import './specs.scss';
import { IAssociatedPracticeList } from '../../common/types';
import { useAppSelector } from '../../Redux/hooks/hooks';
import outerLinkImage from './image/newLinkIcon.svg';
import PracticeStandardGuide from './PracticeStandardGuide';
import { practiceStandardGuideLink } from '../../common/typedconstants.common';

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
  const [expandTechGuide, setExpandTechGuide] = useState(false);

  const { name }: any = useParams();

  const selectedStateName = useAppSelector(
    (state) => state?.stateSlice?.stateNameDisplay
  );
  const selectedStateAbbr = useAppSelector(
    (state) => state?.stateSlice?.stateAbbreviation
  );
  const fromPdfReport = useAppSelector(
    (state) => state?.pdfGenSlice?.enablePdfGen
  );

  const content = useGetAssociatedPracticeQuery(userSelectedFilter);
  const practiceLink =
    selectedStateAbbr === 'U.S.' || selectedStateAbbr === undefined
      ? practiceStandardGuideLink.viewStateConservationPracticeLink
      : practiceStandardGuideLink.viewStateConservationPracticeLink +
        selectedStateAbbr;

  const getHeaderText = () => {
    const practiceName = (data && data?.practiceName) || '';
    if (practiceName) {
      return `${practiceName} Specifications and Tools`;
    }
    return practiceName;
  };
  const handleExpandTechGuide = () => {
    setExpandTechGuide(!expandTechGuide);
  };

  const renderNationalSpecs = () => {
    return (
      <div
        className='state-specific-container'
        data-testid='national-specifications'
      >
        <h3>National Specifications</h3>
        <p className='state-prompt-text'>{nationalPromptText}</p>
        <div className='link'>
          <a
            href='https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/technical/cp/ncps/?cid=nrcs143_026849'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='NRCS National Conservation Practice Guidance'
          >
            NRCS National Conservation Practice Guidance
            <img alt='All Conservation at Work videos' src={outerLinkImage} />
          </a>
        </div>
      </div>
    );
  };

  const renderStateSpecs = () => {
    return (
      <div
        className='state-specific-container'
        data-testid='state-specifications'
      >
        <h3>{selectedStateName} Specifications</h3>
        <p className='state-prompt-text'>{statePromptText}</p>
        <div className='link'>
          <button
            className={
              fromPdfReport ? 'hidden-content' : 'practice-standard-button'
            }
            type='button'
            onClick={() => handleExpandTechGuide()}
          >
            Instructions for Accessing this State’s Practice Standards
          </button>
          <a
            href={
              practiceStandardGuideLink.viewStateConservationPracticeLink +
              selectedStateAbbr
            }
            target='_blank'
            rel='noopener noreferrer'
            aria-label='Current NRCS State Conservation Practices link'
          >
            {fromPdfReport
              ? practiceStandardGuideLink.pdfReportPromptText
              : practiceStandardGuideLink.webpagePromptText}
            <img alt='All Conservation at Work videos' src={outerLinkImage} />
          </a>
        </div>
        {expandTechGuide && (
          <PracticeStandardGuide
            handleClick={handleExpandTechGuide}
            practiceLink={practiceLink}
          />
        )}
      </div>
    );
  };

  const renderAssociatedPractice = () => {
    return (
      <div className='associated-prac' data-testid='associated-practice'>
        <h3>{t('associated-practices.title')}</h3>
        <p>{t('associated-practices.description')}</p>
        <ul className='practices-row' data-testid='associated-practice-links'>
          {content.data?.map((practice: IAssociatedPracticeList) => {
            return (
              <li key={practice.practiceId} className='grid-col-6'>
                <Link
                  to={`/${selectedStateCode}/${name}/${practice.practiceCategoryId}/${practice.practiceId}`}
                  target='_blank'
                  aria-label={`${practice.practiceName} practiceCode ${practice.practiceCode} opens a new tab`}
                >
                  {practice.practiceName}
                </Link>
                &ensp;({practice.practiceCode})
              </li>
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
      <p>{intro}</p>
      {renderNationalSpecs()}
      {selectedStateName === 'U.S.' ? null : renderStateSpecs()}
      {content?.data?.length ? renderAssociatedPractice() : null}
    </section>
  );
};

export default SpecificationsAndTools;
