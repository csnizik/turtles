import { Link } from 'react-router-dom';
import CustomButton from '../CustomButton';
import './explore-box.scss';

interface IExploreBox extends React.HTMLAttributes<Element> {
  heading: string;
  button: string;
  description: string;
}

const ExploreBox = ({ heading, button, description }: IExploreBox) => {
  const value = () => {
    return button.split(' ').join('');
  };

  return (
    <div className='box'>
      <h4>{heading}</h4>
      <Link to={() => value()}>
        <CustomButton className='button'>{button}</CustomButton>
      </Link>
      <p>{description}</p>
    </div>
  );
};

export default ExploreBox;
