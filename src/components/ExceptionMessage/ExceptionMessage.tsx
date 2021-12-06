import './exception-message.scss';

interface IExceptionOptions {
  exceptionTitle: string;
  exceptionMessage: string;
}

const ExceptionMessage = ({ exceptionTitle, exceptionMessage }: IExceptionOptions) => {
  return (
    <div className='exception-content-container' data-testid='exception-content-container'>
      <i
        id='exception-circle'
        className='fas fa-info-circle'
        aria-hidden='true'
      />
      <div className='exception-msg-container'>
        <p className='exception-msg1' data-testid='exception-content-title'>{exceptionTitle}</p>
        <p className='exception-msg2' data-testid='exception-content-description'>{exceptionMessage}</p>
      </div>
    </div>
  );
};

export default ExceptionMessage;
