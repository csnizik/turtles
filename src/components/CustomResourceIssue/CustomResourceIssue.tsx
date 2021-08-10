import './custom-resource-issue.scss';

const CustomResourceIssue = ({ heading }: any) => {
  
  return (
    <div className='custom-resource-box'>
      <p className='custom-resource-text'>{heading}</p>
    </div>
  );
};

export default CustomResourceIssue;
