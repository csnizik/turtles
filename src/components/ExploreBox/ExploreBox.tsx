import { useHistory } from 'react-router-dom';
import CustomButton from '../CustomButton';

const ExploreBox = ({ heading, button, description, ...otherProps }: any) => {
  const history: any = useHistory();
  const handleExploreSearch = () => {
    history.push('location');
  };
  return (
    <div className='box'>
      <h4>{heading}</h4>
      <CustomButton className='button' onClick={handleExploreSearch}>
        {button}
      </CustomButton>
      <p>{description}</p>
    </div>
  );
};

export default ExploreBox;
