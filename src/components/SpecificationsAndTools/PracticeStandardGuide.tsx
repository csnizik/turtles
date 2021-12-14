import fieldOfficeGuide from './image/field-office-technical-guide.png';
import supportingDocument from './image/practice-standard-supporting-documents.png';
import supportingDocumentDetail from './image/practice-standard-supporting-documents-expanded.png';
import outerLinkImage from './image/newLinkIcon.svg';
import { practiceStandardGuideText, practiceStandardGuideLink } from '../../common/typedconstants.common';
import { useAppSelector } from '../../Redux/hooks/hooks';

const PracticeStandardGuide = () => {

  const selectedStateAbbr = useAppSelector(
    (state) => state?.stateSlice?.stateAbbreviation
  );

  return (
    <div className='practice-standard-steps'>
      <h5>{practiceStandardGuideText.title}</h5>
      <h5>{practiceStandardGuideText.firstStep}
        <a
          href={practiceStandardGuideLink.stateConservationPracticeLink}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='NRCS State Conservation Practices Website Link'
        >
          {practiceStandardGuideLink.stateConservationPracticeText}
          <img alt='NRCS State Conservation Practices Website OuterLink Icon' src={outerLinkImage} />
        </a>
      </h5>
      <h5>{practiceStandardGuideText.secondStep}</h5>
      <img className='guide-icons' alt='Field Office Guide' src={fieldOfficeGuide} />
      <h5>{practiceStandardGuideText.thirdStep}</h5>
      <h5>{practiceStandardGuideText.fourthStep}</h5>
      <img className='guide-icons' alt='Supporting Document' src={supportingDocument} />

      <h5>{practiceStandardGuideText.fifthStep}</h5>
      <img className='guide-icons' alt='Supporting Document Detail' src={supportingDocumentDetail} />
      <a
        href={practiceStandardGuideLink.viewStateConservationPracticeLink+selectedStateAbbr}
        target='_blank'
        rel='noopener noreferrer'
        aria-label='NRCS State Conservation Practices Website Link'
      >
        {practiceStandardGuideLink.viewStateConservationPracticeText}
        <img alt='NRCS State Conservation Practices Website OuterLink Icon' src={outerLinkImage} />
      </a>
    </div>
  );
}

export default PracticeStandardGuide;