import './landscape-initiatives-card.scss';

interface ILandscapeData {
  title: string;
  link: string;
  description: Array<string>;
}

const LandscapeInitiativesCard = ({
  title,
  description,
  link,
}: ILandscapeData) => {
  return (
    <div className='landscape-card' data-testid='subInitiativesCard'>
      <div className='landscape-title'>
        <div
          className='related-initiatives-name'
          data-testid='subInitiativesTitle'
        >
          <a
            aria-label='Link to NRCS website for landscape sub-initiatives'
            href={link}
            target='_blank'
            rel='noreferrer'
          >
            {title}
          </a>
        </div>
      </div>
      <div
        className='related-initiatives-desc'
        data-testid='subInitiativesDescription'
      >
        {description.map((paragraph: any, id: number) => {
          /* eslint-disable */
          return <p key={id}>{paragraph}</p>;
        })}
      </div>
    </div>
  );
};

export default LandscapeInitiativesCard;
