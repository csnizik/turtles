import { useHistory } from 'react-router-dom';

import CustomButton from '../../components/CustomButton/CustomButton';

const Home = () => {
  const history: any = useHistory();
  const handleCustomSearch = () => {
    history.push('search');
  };

  return (
    <div className='home-page'>
      <CustomButton additionalClassName='margin-2' onClick={handleCustomSearch}>
        Custom Search
      </CustomButton>
    </div>
  );
};

export default Home;
