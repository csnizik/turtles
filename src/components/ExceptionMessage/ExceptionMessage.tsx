import './exception-message.scss';

interface IExceptionOptions {
  exceptionTitle: string;
  exceptionMessage: string;
}

const ExceptionMessage = ({ exceptionTitle, exceptionMessage }: IExceptionOptions) => {
  return (
    <div className='exception-content-container'>
      <i
        id='exception-circle'
        className='fas fa-info-circle'
        aria-hidden='true'
      />
      <div className='exception-msg-container'>
        <p className='exception-msg1'>{exceptionTitle}</p>
        <p className='exception-msg2'>{exceptionMessage}</p>
      </div>
    </div>
  );
};

export default ExceptionMessage;
