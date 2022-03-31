import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';
import {
  useGetAssociatedPracticeQuery,
  useGetConfigurationSettingsQuery,
  useGetFotgFolderUrlQuery,
} from '../../Redux/services/api';
import './specs.scss';
import { IAssociatedPracticeList } from '../../common/types';
import { useAppSelector } from '../../Redux/hooks/hooks';
import outerLinkImage from './image/newLinkIcon.svg';
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

  const fotgLink = useGetConfigurationSettingsQuery(
    'fotg_practice_deeplink_webservice'
  );
  const fotgLinkData = fotgLink.data || [];
  const fotgWebServiceLink: any = fotgLinkData[0]?.configurationValue || '';

  const fotgInfo = {
    practiceCode: data?.practiceCode,
    stateCode: selectedStateCode,
    fotgLink: fotgWebServiceLink,
  };

  //this method adjusts the state code to be what the FOTG endpoint expects to see for the
  //listed territories. Currently it is hardcoded not best practice.
  const calculateAdjustedStateCode = () => {
    //Maryland, and DC 
    if(selectedStateCode === "11" || selectedStateCode === "24"){
      fotgInfo.stateCode = "MW";
    }
    //Carribean Region Territories
    if(selectedStateCode === "72" || selectedStateCode === "78"){
      fotgInfo.stateCode = "CR";
    }
    //Pacific Basin territories: HI, AS, FM, GU, MH, MP, PW 
    if(selectedStateCode === "60" || selectedStateCode === "64" || 
    selectedStateCode === "66" || selectedStateCode === "68" ||
    selectedStateCode === "69" || selectedStateCode === "70" || 
    selectedStateCode === "74"){
      fotgInfo.stateCode = "15";
    }
  }
  
  //this line calls the previous method to ensure the correct state code is applied
  //before the FOTG endpoint is called
  calculateAdjustedStateCode();

  const fotgFolderLink = useGetFotgFolderUrlQuery(
    fotgLink.isSuccess ? fotgInfo : skipToken
  );
  const fotgFolderURL = fotgFolderLink?.data?.folder_url;

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
            aria-label='NRCS National Conservation Practice Guidance opens in a new browser tab'
          >
            NRCS National Conservation Practice Guidance
            <img
              alt='NRCS National Conservation Practice Guidance opens in a new browser tab'
              src={outerLinkImage}
            />
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
          <a
            href={ fotgFolderLink.isSuccess && fotgFolderURL !=null ? fotgFolderURL: practiceStandardGuideLink.viewStateConservationPracticeLink +
                selectedStateAbbr}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`${
              fromPdfReport
                ? practiceStandardGuideLink.pdfReportPromptText
                : practiceStandardGuideLink.webpagePromptText
            } opens in a new browser tab`}
          >
            {fromPdfReport
              ? practiceStandardGuideLink.pdfReportPromptText
              : practiceStandardGuideLink.webpagePromptText}
            <img
              alt={`${
                fromPdfReport
                  ? practiceStandardGuideLink.pdfReportPromptText
                  : practiceStandardGuideLink.webpagePromptText
              } opens in a new browser tab`}
              src={outerLinkImage}
            />
          </a>
        </div>
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
                  aria-label={`${practice.practiceName} practiceCode ${practice.practiceCode} opens a new browser tab`}
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
