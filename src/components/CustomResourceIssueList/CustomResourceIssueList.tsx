import CustomResourceIssue from '../CustomResourceIssue';
import './custom-resource-issue-list.scss';

// TODO: make component responsive
interface ICustomResourceBoxData {
  id: number;
  resourceName: string;
}

const CustomResourceIssueList = () => {

   const mockData = [
        {
            handleSelectResourceConcern: () => { },
            id: 1,
            resourceName: 'Soil Health',
        },
        {
            handleSelectResourceConcern: () => { },
            id: 2,
            resourceName: 'Nutrient Management',
        },
        {
            handleSelectResourceConcern: () => { },
            id: 3,
            resourceName: 'Source Water Protection',
        },
 ]
  
  return (
    <div className='custom-resource-container'>
        <p className='container-header'>Common Resource Issues</p>
        <p className='container-text'>Some well known resource issues</p>
    {mockData.map((item: ICustomResourceBoxData) => {
      return (<div key={item.id} className='child-box'>
        <CustomResourceIssue
          heading={item.resourceName}
        />
      </div>)
    })}
  </div>
  )
};

export default CustomResourceIssueList;
