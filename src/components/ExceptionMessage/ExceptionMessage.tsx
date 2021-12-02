import './exception-message.scss';

interface IExceptionOptions {
  message1: string;
  message2: string;
}

const ExceptionMessage = ({ message1, message2 }: IExceptionOptions) => {
  return (
    <div className='exception-msg-container'>
      <div className='exception-messages'>
        <div className='circle-msg'>
          <i
            id='exception-circle'
            className='fas fa-info-circle'
            aria-hidden='true'
          />
          <div className='exception-msg1'>{message1}</div>
        </div>

        <div className='exception-msg2'>{message2}</div>
      </div>
    </div>
  );
};

export default ExceptionMessage;
