import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { handleLogout } from '../../functions/usersFunctions.ts';
import { Link } from 'react-router-dom';
import { capitalizeFirstLetter, handleLanguage } from '../../functions/globalFunc.ts';
import { useTranslation } from 'react-i18next';

interface NavbarType {
  setDisplayRegisterForm: Dispatch<SetStateAction<boolean>>;
  setDisplayLoginForm: Dispatch<SetStateAction<boolean>>;
  setIsUserLoggedIn: Dispatch<SetStateAction<boolean>>;
  isUserLoggedIn: boolean;
  setPopupOpen: Dispatch<SetStateAction<boolean>>;
  loggedUserUsername: string;
  setLoggedUserUsername: Dispatch<SetStateAction<string>>;
  setLoggedUserEmail: Dispatch<SetStateAction<string>>;
  acceptedCookies: boolean;
}
const Navbar = ({
  setDisplayRegisterForm,
  setDisplayLoginForm,
  setIsUserLoggedIn,
  isUserLoggedIn,
  setPopupOpen,
  loggedUserUsername,
  setLoggedUserUsername,
  setLoggedUserEmail,
  acceptedCookies,
}: NavbarType) => {
  const [displayBtns, setDisplayBtns] = useState(false);
  const [defaultLanguage, setDefaultLanguage] = useState<string>(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');
    return storedLanguage ? storedLanguage : 'sr';
  });
  const { t } = useTranslation();
  useEffect(() => {
    handleLanguage(defaultLanguage)
  }, [])
  
  useEffect(() => {
    if (isUserLoggedIn) {
      setDisplayBtns(true);
    } else {
      setDisplayBtns(false);
    }
  }, [isUserLoggedIn]);
  const isLoggedStyle = loggedUserUsername ? 'userLogged' : 'userNotLogged';
  const isCookieAccepted = acceptedCookies
    ? 'userLoggedBtnStyle'
    : 'userNotLoggedBtnStyle';
  return (
    <div className={`navbar ${isLoggedStyle}`}>
      {isUserLoggedIn && (
        <div className="username">
          <span>{capitalizeFirstLetter(t('user'))}: </span> {loggedUserUsername}
        </div>
      )}
      {!displayBtns && (
        <div className="unregistered_user_btn">
          <button
            disabled={!acceptedCookies}
            onClick={() => {
              setDisplayRegisterForm(true);
              setDisplayLoginForm(false);
            }}
            className={`registerBtn ${isCookieAccepted}`}
          >
            {capitalizeFirstLetter(t('register'))}
          </button>
          <button
            disabled={!acceptedCookies}
            onClick={() => {
              setDisplayLoginForm(true);
              setDisplayRegisterForm(false);
            }}
            className={`loginBtn ${isCookieAccepted}`}
          >
            {capitalizeFirstLetter(t('login'))}
          </button>
        </div>
      )}
      {displayBtns && (
        <div className="registered_user_btn">
          <Link className="tableLink" to="table_of_users">
          {capitalizeFirstLetter(t('users'))}
          </Link>
          <button
            className="logoutBtn"
            onClick={() => {
              handleLogout(
                setDisplayBtns,
                setIsUserLoggedIn,
                setPopupOpen,
                setLoggedUserUsername,
                setLoggedUserEmail,
                t
              );
            }}
          >
            {capitalizeFirstLetter(t('logout'))}
          </button>
        </div>
      )}
      <select
        className="absolute languageSelect"
        onChange={(e) => handleLanguage(e.target.value)}
        defaultValue={defaultLanguage}
      >
        <option value="sr">Српски</option>
        <option value="en">English</option>
      </select>
    </div>
  );
};

export default Navbar;
