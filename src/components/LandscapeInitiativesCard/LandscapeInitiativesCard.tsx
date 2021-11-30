import './landscape-initiatives-card.scss';

const LandscapeInitiativesCard = () => {
  return (
    <div className='card' data-testid='card'>
      <div className='top-container'>
        <div className='related-initiatives-name'>
          <h4>Golden-Winged Warbler</h4>
        </div>
      </div>
      <div className='related-initiatives-desc'>
        <p>
          {/* Hardcoded data until endpoint is made */}
          From 2012 to 2016, WLFW enabled producers to conserve or create more
          than 13,000 acres of early successional habitat through the
          implementation of science-based habitat guidelines developed
          especially for the golden-winged warbler. By the end of 2021, the
          agency aims to help landowners manage for an additional 15,000 acres
          of habitat.
        </p>
      </div>
    </div>
  );
};

export default LandscapeInitiativesCard;
