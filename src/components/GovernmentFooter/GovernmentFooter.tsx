import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks/hooks';
import './gov-footer.scss';

import { useGetConfigurationSettingsStaticTextQuery } from '../../Redux/services/api';
import { setStaticText } from '../../Redux/Slice/staticTextSlice';

const GovernmentFooter = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  // const uiText = useGetConfigurationSettingsStaticTextQuery(null, {
  //   pollingInterval: 900000,
  // });

  // eslint-disable-next-line
  // useEffect(() => {
  //   if (uiText && uiText?.data != null) {
  //     dispatch(setStaticText(uiText));
  //   }
  // }, [uiText]);

  const uiText = useAppSelector(
    (state) => (state?.staticTextSlice?.staticData as any)?.data
  );

  const renderNRCSFooterSection: Function = () => (
    <div data-testid='gov-banner-footer' className='usa-banner-footer'>
      <div className='usda-footer row-flex-start'>
        <a href='/'>
          <img src='../../../../images/usda_logo_color.png' alt='USDA LOGO' />
        </a>
        <div className='government-footer'>
          <a href='/'>
            <h4 className='page-title footer-sizing' data-testid='page-title'>
              {t('header.nrcs')}
            </h4>
          </a>
          <a href='/'>
            <p>{t('header.usda')}</p>
          </a>
        </div>
      </div>

      <div className='contact-link'>
        <a href={uiText?.footerSupportLink?.configurationValue}>
          <p>{uiText?.footerSupportContact?.configurationValue}</p>
        </a>
        <p className='support-text'>
          {uiText?.footerSupport?.configurationValue}
        </p>
      </div>
    </div>
  );

  return <footer>{renderNRCSFooterSection()}</footer>;
};

export default GovernmentFooter;
