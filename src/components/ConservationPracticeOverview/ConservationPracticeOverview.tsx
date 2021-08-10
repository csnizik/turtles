import './conservation-practice-overview.scss';
import { ConservationPracticeStandard } from '../../common/typedconstants.common';

const ConservationPracticeOverview = () => {
  return (
    <div className='document-box'>
      <ul className='list-document'>
        {ConservationPracticeStandard.map((practice: any) => {
          return (
            <div key={practice.id} className='full-component'>
              <div className='overview'>
                <h4>{`${practice.practiceName} ${practice.id}`}</h4>
                <p>{practice.practiceOverview}</p>
                <h4>Practice Information</h4>
                {practice.practiceInformation.map((info: any) => {
                  return <p>{info}</p>;
                })}
              </div>
              <img alt='Practice' src={practice.image} />
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default ConservationPracticeOverview;
