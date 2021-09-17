import './implementation-extent.scss';

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
  const getHeaderText = () => {
    const practiceName = (data && data.practiceName) || '';
    if (practiceName) {
      return `Support for ${practiceName} in the U.S`;
    }
    return practiceName;
  };

  const renderObligations = () => {
    return (
      <div className='obligations'>
        <h3>Obligations and Practices Implemented from 2014 - 2020</h3>
        <hr/>
        <div className='graph-container'>
          <div className='obligation-graph' />
        </div>
      </div>
    );
  };

  const renderAcresImplemented = () => {
    return (
      <div className='arces-implemented'>
        <h3>Acres Implemented from 2014 - 2020</h3>
        <hr/>
        <div className='graph-container'>
          <div className='acres-graph' />
        </div>
      </div>
    );
  };

  if (!isSuccess) return null;

  return (
    <div className='ie-parent'>
      <h2>{getHeaderText()}</h2>
      <h4>{intro}</h4>
      <div className='extent-content'>
        {renderObligations()}
        {renderAcresImplemented()}
      </div>
    </div>
  );
};

export default ImplementationExtent;
