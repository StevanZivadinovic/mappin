import React, { useEffect, useRef, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { handleInputChange } from "../functions/markerFunctions.ts";
import { handleSubmitRegister } from "../functions/usersFunctions.ts";
import { capitalizeFirstLetter } from "../functions/globalFunc.ts";
import { useTranslation } from "react-i18next";

const RegisterForm = ({
  displayRegisterForm,
  setDisplayRegisterForm,
  setLoggedUserEmail,
  setDisplayLoginForm,
  isUserLoggedIn, 
  setIsUserLoggedIn,
  setLoggedUserUsername
}) => {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [errRegistered, setErrRegistered] = useState({
    display: false,
    msg: { email: '', username: '', password: '', bigError:'' },
  });
  const {t}=useTranslation()

  const newUser = useRef({
    username: '',
    email: '',
    password: '',
  });
  useEffect(() => {
    let timeout;
    if (isUserLoggedIn) {
      timeout = setTimeout(() => {
        setDisplayRegisterForm(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isUserLoggedIn]);
  return (
    <>
      {displayRegisterForm && (
        <div className="registerFormContainer">
          <form
            action=""
            className="registerForm"
            onSubmit={(e) => {
              handleSubmitRegister(
                e,
                newUser,
                setErrRegistered,
                setIsUserLoggedIn,
                setLoggedUserEmail,
                setLoggedUserUsername
              );
            }}
          >
            <div
              className="cancelBtn"
              onClick={() => {
                setDisplayRegisterForm(false);
              }}
            >
              <CancelIcon />
            </div>
            <div className="logo">
              <img src="/img/point_orange.png" alt="logo image" />
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
                  handleInputChange(e, usernameRef, newUser, "username");
                }}

              />
              {errRegistered?.display && (
                <p className="errMsgRegister">
                  <strong>{errRegistered?.msg?.username}</strong>
                </p>
              )}
            </div>
            <div className="email">
              <input
                required
                ref={emailRef}
                type="email"
                name="email"
                placeholder={capitalizeFirstLetter(t('type_your_email'))}
                onChange={(e) => {
                  handleInputChange(e, emailRef, newUser, "email");
                }}
              />
              {errRegistered?.display && (
                <p className="errMsgRegister">
                  <strong>{errRegistered?.msg?.email}</strong>
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
                  handleInputChange(e, passwordRef, newUser, "password");
                }}
              />
              {errRegistered?.display && (
                <p className="errMsgRegister">
                  <strong>{errRegistered?.msg?.password}</strong>
                </p>
              )}
            </div>
            <button className="submitRegisterButton">{capitalizeFirstLetter(t('register'))}</button>
            <p className="linkToLogin">
            {capitalizeFirstLetter(t('already_have_account'))}{" "}
              <span
                onClick={() => {
                  setDisplayLoginForm(true);
                  setDisplayRegisterForm(false);
                }}
              >
                {capitalizeFirstLetter(t('login'))}
              </span>{" "}
            </p>
            {errRegistered?.display && (
                <p className="errMsgRegisterBigError">
                  <strong>{errRegistered?.msg?.bigError}</strong>
                </p>
              )}
            {isUserLoggedIn && (
              <p className="successMsgRegister">
                <strong>{capitalizeFirstLetter(t('new_user_registered'))}</strong>
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
