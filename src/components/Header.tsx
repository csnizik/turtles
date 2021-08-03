import "../stylesheets/header.scss";

const Header = () => {
  const renderHeaderSection = () => (
    <header>
      <div className="usda-header row-flex-start">
        <img src="images/usda_logo_color.png" alt="USDA LOGO" />
        <div className="government-banner">
          <h4 className="page-title" data-testid="page-title">
            Natural Resources Conservation Service
          </h4>
          <p>U.S DEPARTMENT OF AGRICULTURE</p>
        </div>
      </div>
    </header>
  );

  return <div className="header-container">{renderHeaderSection()}</div>;
};

export default Header;
