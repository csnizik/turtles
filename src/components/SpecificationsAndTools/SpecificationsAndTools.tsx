import Header from '../Header';
import './specs.scss';

interface ISpecAndToolsProps {
  data: any;
  isSuccess: boolean;
}

const intro: string =
  'NRCS technical standards guide proper implementation of recommended practices.  Each practice also has a payment schedule that determines how much financial assistance is available for beginning or installing it. The following links provide details about practice standards and payment schedules specific to your region.';

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
      <div className='national-specs margin-3'>
        <Header
          headerText='National Specifications'
          parentClassNames='margin-3 padding-top-4'
          paragraphText='You can find national conservation practice standards, overviews, conservation practice effects and network effects diagrams on the NRCS website.'
          priority='4'
        />
        <a
          className='lead grid-offset-7'
          aria-label='Current NRCS National Conservation Practices link'
          href='https://www.nrcs.usda.gov/wps/portal/nrcs/detailfull/national/technical/cp/ncps/?cid=nrcs143_026849'
        >
          NRCS National Conservation Practices
        </a>
      </div>
    );
  };

  if (!isSuccess) return null;

  return (
    <div className='specs-and-tools padding-top-4 padding-bottom-8'>
      <Header
        headerText={getHeaderText()}
        parentClassNames='margin-3 padding-top-4'
        paragraphText={intro}
        priority='1'
      />
      {renderNationalSpecs()}
    </div>
  );
};

export default SpecificationsAndTools;
