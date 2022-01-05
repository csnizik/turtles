import './tab-title.scss';

const TabTitle = ({ stateName, currentTab }: any) => {
  return (
    <header data-testid='tab-title'>
      <div className='tab-title-container'>
        <h1 className='tab-title-name'>
          {stateName || 'U.S.'} {currentTab}
        </h1>
      </div>
    </header>
  );
};

export default TabTitle;
