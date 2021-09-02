import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import CustomButton from '../CustomButton';
import './quick-search-bar.scss';

const QuickSearchBar = () => {
  const { t } = useTranslation();
  const history: any = useHistory();

  const handleCustomSearch = () => {
    history.push('search');
  };

  return (
    <div className='grid-row'>
      <div className='grid-col-6'>
        <p className='margin-left-4 margin-top-3'>{t('home-page.intro')}</p>
      </div>
      <div className='grid-col-4 grid-offset-1 tablet:grid-col-4 tablet:grid-offset-2'>
        <CustomButton
          additionalClassName='margin-top-2 margin-right-4'
          onClick={handleCustomSearch}
        >
          {t('search-page.quick-search')}
        </CustomButton>
      </div>
    </div>
  );
};

export default QuickSearchBar;
