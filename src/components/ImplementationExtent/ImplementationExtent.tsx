import DummyTableauImage from '../ResourceConcernTreated/DummyTableauImage';
import { useAppSelector } from '../../Redux/hooks/hooks';
import { useGetPaymentScheduleLinksQuery } from '../../Redux/services/api';
import Spinner from '../Spinner/Spinner';
import './implementation-extent.scss';
import image from './image/newLinkIcon.svg';
import ExceptionMessage from '../ExceptionMessage';

interface IImplementationExtentProps {
  data: any;
  isSuccess: boolean;
}

const intro: string =
  'NRCS provides financial and technical support for practices through a number of programs and initiatives that promote agricultural production and environmental quality as compatible national goals.';

const ImplementationExtent = ({
  data,
  isSuccess,
}: IImplementationExtentProps) => {
  const stateInfo = useAppSelector((state: any) => state?.stateSlice);

  const practiceName = (data && data.practiceName) || '';
  const exceptionTitle = `${stateInfo?.stateNameDisplay} has not adopted ${practiceName}`;
  const exceptionMessage = 'The charts below reflect obligations and acres implemented in the entire United States.';
  
  const results = useGetPaymentScheduleLinksQuery(stateInfo?.stateCode);
  const data2 = results.data || [];
  const error2 = results.error;
  const isLoading2 = results.isLoading;
  const isSuccess2 = results.isSuccess;
  const isError2 = results.isError;
  const scheduleLink: any = data2[0]?.paymentLink || '';

  const getHeaderText = () => {
    if (practiceName) {
      return `Support for ${practiceName} in ${stateInfo?.stateNameDisplay}`;
    }
    return practiceName;
  };

  const renderObligations = () => {
    return (
      <div className='obligations'>
        <h3>Obligations and Practices Implemented from 2014 - 2020</h3>
        <hr />
        <div className='graph-container'>
          <div className='obligation-graph'>
            <DummyTableauImage />
          </div>
        </div>
      </div>
    );
  };

  const renderAcresImplemented = () => {
    return (
      <div className='arces-implemented'>
        <h3>Acres Implemented from 2014 - 2020</h3>
        <hr />
        <div className='graph-container'>
          <div className='acres-graph'>
            <DummyTableauImage />
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentScheduleLink = () => {
    const selectedLocation =
      stateInfo.stateCode === '00'
        ? '2021 State Payment Schedules | NRCS'
        : `${stateInfo?.stateNameDisplay} Payment Schedules | NRCS`;
    return (
      <div className='payment-schedule'>
        <h3 id='payment-title'>Payment Schedules</h3>
        <p>
          NRCS provides financial assistance for selected conservation
          practices. The availability and amount of financial assistance can
          vary between states.
        </p>
        <div className='link'>
          <a
            href={scheduleLink}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`${stateInfo?.stateNameDisplay} Payment Schedules link opens a new browser tab`}
          >
            {selectedLocation}
            <img alt='' src={image} />
          </a>
        </div>
      </div>
    );
  };

  if (!isSuccess) return null;

  return (
    <div className='ie-parent' id='SupportPractice'>
      <h2>{getHeaderText()}</h2>
      <h4>{intro}</h4>
      <div className='exception-message-section'>
        <ExceptionMessage
          exceptionTitle={exceptionTitle}
          exceptionMessage={exceptionMessage}
        />
      </div>
      <div className='extent-content'>
        {renderObligations()}
        {renderAcresImplemented()}
        <>
          {isLoading2 && <Spinner />}
          {isError2 && error2}
          {isSuccess2 && data2.length > 0 && renderPaymentScheduleLink()}
        </>
      </div>
    </div>
  );
};

export default ImplementationExtent;
