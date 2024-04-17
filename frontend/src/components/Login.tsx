import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import CancelIcon from "@mui/icons-material/Cancel";
import { handleInputChange } from "../functions/markerFunctions.ts";
import { handleSubmitLogin } from "../functions/usersFunctions.ts";
import { capitalizeFirstLetter } from "../functions/globalFunc.ts";

const LoginForm = ({
  displayLoginForm,
  setDisplayLoginForm,
  setLoggedUserEmail,
  setPopupOpen,
  setDisplayRegisterForm,
  isUserLoggedIn,
  setIsUserLoggedIn,
  setLoggedUserUsername
  
}) => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [errLogin, setErrLoggin] = useState({
    display: false,
    msg: { email: "", username: "", password: "", bigError: "" },
  });
  const loggedUser = useRef({
    username: "",
    password: "",
  });
  const {t}=useTranslation()
  useEffect(() => {
    if (isUserLoggedIn) {
      setTimeout(() => {
        setDisplayLoginForm(false);
      }, 1000);
    }
  }, [isUserLoggedIn]);

  return (
    <>
      {displayLoginForm && (
        <div className="registerFormContainer">
          <form
            action=""
            className="registerForm"
            onSubmit={(e) => {
              handleSubmitLogin(
                e,
                loggedUser,
                setErrLoggin,
                setIsUserLoggedIn,
                setLoggedUserEmail,
                setPopupOpen,
                setLoggedUserUsername
              );
            }}
          >
            <div
              className="cancelBtn"
              onClick={() => {
                setDisplayLoginForm(false);
              }}
            >
              <CancelIcon />
            </div>
            <div className="logo">
              <img src="/img/point_orange.png" alt="logo" />
              <span>Travel Map</span>
            </div>
            <div className="username">
              <input
                required
                ref={usernameRef}
                type="text"
                name="username"
                placeholder={capitalizeFirstLetter(t('type_your_username'))}
                onChange={(e) => {
                  handleInputChange(e, usernameRef, loggedUser, "username");
                }}
              />
              {errLogin?.display && (
                <p className="errMsgRegister">
                  <strong>{errLogin?.msg?.username}</strong>
                </p>
              )}
            </div>
            <div className="password">
              <input
                required
                ref={passwordRef}
                type="password"
                name="password"
                placeholder={capitalizeFirstLetter(t('type_your_password'))}
                onChange={(e) => {
                  handleInputChange(e, passwordRef, loggedUser, "password");
                }}
              />
              {errLogin?.display && (
                <p className="errMsgRegister">
                  <strong>{errLogin?.msg?.password}</strong>
                </p>
              )}
            </div>
            <button className="submitRegisterButton">{capitalizeFirstLetter(t('login'))}</button>
            <p className="linkToSignin">
            {capitalizeFirstLetter(t('dont_have_account'))}{" "}
              <span
                onClick={() => {
                  setDisplayLoginForm(false);
                  setDisplayRegisterForm(true);
                }}
              >
                {capitalizeFirstLetter(t('sign_in'))}
              </span>{" "}
            </p>
            {errLogin?.display && (
              <p className="errMsgRegister">
                <strong>{errLogin?.msg?.bigError}</strong>
              </p>
            )}
            {isUserLoggedIn && (
              <p className="successMsgRegister">
                <strong>{capitalizeFirstLetter(t('you_are_logged_in_now'))}</strong>
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default LoginForm;
