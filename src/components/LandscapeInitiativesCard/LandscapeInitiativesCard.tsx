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
          {title}
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
      <p className='link-text'>
        <a
          aria-label='Link to NRCS website for landscape sub-initiatives'
          href={link}
          target='_blank'
          rel='noreferrer'
        >
          {`Go to the ${title} detail page `}
        </a>
        <i className='fa fa-external-link' aria-hidden='true' />
      </p>
    </div>
  );
};

export default LandscapeInitiativesCard;
