import './landscape-initiatives-card.scss';

interface ILandscapeData {
  title: string;
  description: Array<string>;
}

const LandscapeInitiativesCard = ({ title, description }: ILandscapeData) => {
  return (
    <div className='landscape-card' data-testid='subInitiativesCard'>
      <div className='top-title'>
        <div
          className='related-initiatives-name'
          data-testid='subInitiativesTitle'
        >
          <h4>{title}</h4>
        </div>
      </div>
      <div
        className='related-initiatives-desc'
        data-testid='subInitiativesDescription'
      >
        {
          /*eslint react/no-array-index-key: 0 */
          description.map((paragraph: any, id: number) => {
            return <p key={id}>{paragraph}</p>;
          })
        }
      </div>
    </div>
  );
};

export default LandscapeInitiativesCard;
