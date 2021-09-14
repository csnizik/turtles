import Header from '../Header';
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
      <div className='obligations margin-3'>
        <Header
          headerText='Obligations and Practices Implemented from 2014 - 2020'
          parentClassNames='margin-3 padding-top-4'
          priority='4'
        />
        <hr />
        <div className='obligation-graph margin-3' />
      </div>
    );
  };

  const renderAcresImplemented = () => {
    return (
      <div className='arces-implemented margin-3'>
        <Header
          headerText='Acres Implemented from 2014 - 2020'
          parentClassNames='margin-3 padding-top-4'
          priority='4'
        />
        <hr />
        <div className='acres-graph margin-3' />
      </div>
    );
  };

  if (!isSuccess) return null;

  return (
    <div className='padding-bottom-6'>
      <Header
        headerText={getHeaderText()}
        parentClassNames='margin-3 padding-top-4'
        paragraphText={intro}
        priority='1'
      />
      <div className='extent-content'>
        {renderObligations()}
        {renderAcresImplemented()}
      </div>
    </div>
  );
};

export default ImplementationExtent;
