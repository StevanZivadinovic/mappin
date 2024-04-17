import "./../src/style/mapStyle.scss";
import "./style/main.scss";
import './../src/style/table_of_users.scss'
import "leaflet/dist/leaflet.css";
import Map from "./components/Map.tsx";
import React, { useEffect, useState } from "react";
import TableOFUsers from "./components/TableOFUsers.tsx";
import { Route, Routes, useLocation, redirect, Navigate } from "react-router-dom";
import { getAllPins } from "./functions/markerFunctions.ts";
import { getLoggedUserFunc } from "./functions/usersFunctions.ts";
import CookieNotification from "./components/CookieNotification.tsx";
function App() {
  const [points, setPoints] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedUserUsername, setLoggedUserUsername] = useState("");
  const [initialLoggedUserEmail, setInitialLoggedUserEmail] = useState("");
  const [pointDeleted, setPointDeleted]=useState('');
  const [acceptedCookies, setAcceptedCookies] = useState(false);
  let location = useLocation();

  useEffect(() => {
    getAllPins(setPoints)
    getLoggedUserFunc(setIsUserLoggedIn,setLoggedUserUsername,setInitialLoggedUserEmail, setAcceptedCookies)
  }, [location.pathname,pointDeleted]);
  return (
    <div className="App">
       <CookieNotification
       acceptedCookies={acceptedCookies}
       setAcceptedCookies={setAcceptedCookies}
       />
      <Routes>
        <Route
          path="/"
          element={
            <Map
              points={points}
              isUserLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
              loggedUserUsername={loggedUserUsername ? loggedUserUsername : ""}
              initialLoggedUserEmail={
                initialLoggedUserEmail ? initialLoggedUserEmail : ""
              }
              setLoggedUserUsername={setLoggedUserUsername}
              pointDeleted={pointDeleted}
              setPointDeleted={setPointDeleted}
              acceptedCookies={acceptedCookies}

            />
          }
        />
       <Route
          path="/table_of_users"
          element={isUserLoggedIn ? <TableOFUsers /> : <Navigate to="/" />}
        />
        <Route path="*" element={<>Does not exist!</>} />
      
      </Routes>
    </div>
  );
}

export default App;
