import fieldOfficeGuide from './image/field-office-technical-guide.png';
import outerLinkImage from './image/newLinkIcon.svg';
import {
  practiceStandardGuideText,
  practiceStandardGuideLink,
} from '../../common/typedconstants.common';

const PracticeStandardGuide = ({ handleClick, practiceLink }: any) => {
  return (
    <div
      className='practice-standard-steps'
      data-testid='practice-standard-steps'
    >
      <h4>{practiceStandardGuideText.title}</h4>
      <h4>
        {practiceStandardGuideText.firstStep}
        <a
          href={practiceLink}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`${practiceStandardGuideLink.stateConservationPracticeText} opens in a new browser tab`}
        >
          {practiceStandardGuideLink.stateConservationPracticeText}
          <img
            alt={`${practiceStandardGuideLink.stateConservationPracticeText} opens in a new browser tab`}
            src={outerLinkImage}
          />
        </a>
      </h4>
      <h4>{practiceStandardGuideText.secondStep}</h4>
      <h4>{practiceStandardGuideText.thirdStep}</h4>

      <img
        className='guide-icons'
        alt='Field Office Guide'
        src={fieldOfficeGuide}
      />

      <h4>{practiceStandardGuideText.fourthStep}</h4>
      <h4>{practiceStandardGuideText.fifthStep}</h4>
      <a
        href={practiceLink}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`${practiceStandardGuideLink.viewStateConservationPracticeText} opens in a new browser tab`}
      >
        {practiceStandardGuideLink.viewStateConservationPracticeText}
        <img
          alt={`${practiceStandardGuideLink.stateConservationPracticeText} opens in a new browser tab`}
          src={outerLinkImage}
        />
      </a>
      <button
        type='button'
        onClick={() => handleClick()}
        className='close-instruction-button'
      >
        Close Instructions
      </button>
    </div>
  );
};

export default PracticeStandardGuide;
