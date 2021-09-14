import Header from '../Header';
import './application-impacts.scss';

interface IApplicationImpactProps {
  isSuccess: boolean;
  data: any;
}

const intro: string =
  'NRCS engages in ongoing efforts to assess the impacts of conservation practices applied and to develop tools that can be used by planners and landowners to make more informed planning and management decisions. The information gathered about actual or estimated impacts of practices and programs on the ground helps improve the effectiveness of conservation program design and delivery.';

const ApplicationImpacts = ({ data, isSuccess }: IApplicationImpactProps) => {
  const getHeaderText = () => {
    const practiceName = (data && data?.practiceName) || '';
    if (practiceName) {
      return `Impacts of Applying ${practiceName} in the U.S.`;
    }
    return practiceName;
  };

  if (!isSuccess) return null;

  return (
    <div className='padding-top-4 padding-bottom-4'>
      <Header
        headerText={getHeaderText()}
        parentClassNames='margin-3'
        paragraphText={intro}
        priority='1'
      />
      <div className='impacts-content margin-3' />
    </div>
  );
};

export default ApplicationImpacts;
