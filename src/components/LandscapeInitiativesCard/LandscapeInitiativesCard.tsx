import './landscape-initiatives-card.scss';

interface text {
  description: string;
}

interface ILandscapeData {
  title: string;
  description: Array<text>;
}

const LandscapeInitiativesCard = ({ title, description }: ILandscapeData) => {
  return (
    <div className='landscape-card' data-testid='card'>
      <div className='top-title'>
        <div className='related-initiatives-name' data-testid='title'>
          <h4>{title}</h4>
        </div>
      </div>
      <div className='related-initiatives-desc' data-testid='description'>
        {description.map((paragraph: text) => {
          return <p>{paragraph}</p>;
        })}
      </div>
    </div>
  );
};

export default LandscapeInitiativesCard;
