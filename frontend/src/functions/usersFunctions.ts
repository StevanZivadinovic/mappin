import { capitalizeFirstLetter } from "./globalFunc.ts";

export const handleSubmitRegister = (
  e,
  newUser,
  setErrRegistered,
  setSuccessRegistered,
  setLoggedUserEmail,
  setLoggedUserUsername
) => {
  e.preventDefault();
  const { username, email, password } = newUser.current;
  const newUserObject = {
    username,
    email,
    password,
  };

  fetch("/api/users/register_new_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserObject),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data.user) {
        setSuccessRegistered(data.loggedIn);
        setErrRegistered({ display: false, msg: "" });
        setLoggedUserEmail(data.userData.email);
        setLoggedUserUsername(data.userData.username)
        alert("User is registered!");
      } else {
        setErrRegistered({ display: true, msg: data });
      }
    })
    .catch((errMessages) => {
      setErrRegistered({ dispay: true, msg: errMessages });
    });
};

export const handleLogout = (setDisplayBtns, setIsUserLoggedIn, setPopupOpen,setLoggedUserUsername, setLoggedUserEmail,t) => {
  if (window.confirm(capitalizeFirstLetter(t('logout_msg')))) {
    fetch("/api/users/logout")
      .then((data) => {
        return data.json()
      })
      .then((data)=>{
        setDisplayBtns(false);
        setPopupOpen(false);
        setIsUserLoggedIn(false);
        setLoggedUserUsername(data.user)
        setLoggedUserEmail('')
        alert("User is logged out!");
      })
      .catch((err) => {
        console.log(err, "eror");
      });
  }
};

export const handleSubmitLogin = (
  e,
  loggedUser,
  setErrLoggin,
  setIsUserLoggedIn,
  setLoggedUserEmail,
  setPopupOpen,
  setLoggedUserUsername
) => {
  e.preventDefault();
  const { username, password } = loggedUser.current;

  const loggedUserObject = {
    username,
    password,
  };
  fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loggedUserObject),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json();
      }
      return res.json();
    })
    .then((data) => {
      if (!data.user) {
        setErrLoggin({ display: true, msg: data });
      } else {
        setErrLoggin({ display: false, msg: "" });
        setIsUserLoggedIn(data.loggedIn);
        setLoggedUserEmail(data.userData.email);
        setPopupOpen(false);
        setLoggedUserUsername(data.userData.username)
      }
    })
    .catch((err) => {
      console.log(err);
    });
};


export const getLoggedUserFunc=(setIsUserLoggedIn,setLoggedUserUsername,setInitialLoggedUserEmail, setAcceptedCookies)=>{
  fetch("/api/users/")
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    if (data.user !== null) {
      setIsUserLoggedIn(data.loggedIn);
      setLoggedUserUsername(data.user.username);
      setInitialLoggedUserEmail(data.user.email);
      setAcceptedCookies(data.loggedIn)
    }
  })
  .catch((err) => {
    console.log(err);
  });
}
