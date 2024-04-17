import React from 'react';
import { useTranslation } from 'react-i18next';
import { capitalizeEveryFirstLetter } from '../functions/globalFunc.ts';

const CookieNotification = ({acceptedCookies, setAcceptedCookies}) => {
  
const {t}=useTranslation()
  const handleAcceptCookies = () => {
    setAcceptedCookies(true);
  };

  const handleManagePreferences = () => {
    console.log('Manage preferences clicked');
  };

  if (!acceptedCookies) {
    return (
      <div className="cookie-notification">
        <p>
          {t('cookie_first_part')}
        </p>
        <p>
          {t('cookie_second_part')}
        </p>
        <div className="cookie-notification-buttons">
          <button onClick={handleAcceptCookies}>{capitalizeEveryFirstLetter(t('accept_cookies'))}</button>
          <button onClick={handleManagePreferences}>{capitalizeEveryFirstLetter(t('manage_preferences'))}</button>
        </div>
      </div>
    );
  }

  return null; 
};

export default CookieNotification;
