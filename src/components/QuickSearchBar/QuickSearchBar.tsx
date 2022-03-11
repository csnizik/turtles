import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import TagManager from 'react-gtm-module';
import CustomButton from '../CustomButton';
import './quick-search-bar.scss';

const QuickSearchBar = () => {
  const { t } = useTranslation();
  const history: any = useHistory();

  const handleCustomSearch = () => {
    history.push('search');
  };

  const GTMArg = { gtmId: process.env.REACT_APP_Google_Tag ||"" }; 
  TagManager.initialize(GTMArg);

  return (
    <div className='grid-row quick-search-bar'>
      <div className='grid-col-6 tablet:grid-col-8'>
        <p className='margin-left-3 margin-top-3'>{t('home-page.intro')}</p>
      </div>
      <div className='grid-col-4 grid-offset-1 tablet:grid-col-2 tablet:grid-offset-2'>
        <CustomButton
          additionalClassName='margin-top-4 margin-right-4'
          onClick={handleCustomSearch}
        >
          {t('search-page.quick-search')}
        </CustomButton>
      </div>

    </div>
  );
};

export default QuickSearchBar;
