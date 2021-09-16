import './specs.scss';

interface ISpecAndToolsProps {
  data: any;
  isSuccess: boolean;
}

const intro: string =
  'NRCS technical standards guide proper implementation of recommended practices.  Each practice also has a payment schedule that determines how much financial assistance is available for beginning or installing it. The following links provide details about practice standards and payment schedules specific to your region.';
const promptText:  string = 
  'You can find national conservation practice standards, overviews, conservation practice effects and network effects diagrams on the NRCS website.'

const SpecificationsAndTools = ({ data, isSuccess }: ISpecAndToolsProps) => {
  const getHeaderText = () => {
    const practiceName = (data && data?.practiceName) || '';
    if (practiceName) {
      return `${practiceName} Specifications and Tools`;
    }
    return practiceName;
  };

  const renderNationalSpecs = () => {
    return (
      <div className='national-specs'>
        <h4>National Specifications</h4>
        <h5>{promptText}</h5>
        <div className='link'>
          <a
              href='https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/technical/cp/ncps/?cid=nrcs143_026849'
              target='_blank' rel='noopener noreferrer'
              aria-label='Current NRCS National Conservation Practices link'
              // eslint-disable-next-line global-require
              >NRCS National Conservation Practices<img alt='All Conservation at Work videos' src={require('./image/newLinkIcon.svg').default}/>
          </a>
        </div>
      </div>
    );
  };

  if (!isSuccess) return null;

  return (
    <div className='st-parent'>
      <h2>{getHeaderText()}</h2>
      <h4>{intro}</h4>
      {renderNationalSpecs()}
    </div>
  );
};

export default SpecificationsAndTools;
