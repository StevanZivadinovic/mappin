import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Star from './subComponents/Star.tsx';
import {
  deletePoint,
  markerIconSetFunction,
  setClickedMarkerFunc,
} from '../functions/markerFunctions.ts';
import { ClickedMarkerSetter } from './subComponents/MarkerSetter.tsx';
import AddNewMarker from './subComponents/AddNewMarker.tsx';
import RegisterForm from './Register.tsx';
import LoginForm from './Login.tsx';
import Navbar from './subComponents/Navbar.tsx';
import {
  capitalizeFirstLetter,
  getTimePassedSinceCreation,
} from '../functions/globalFunc.ts';
import { useTranslation } from 'react-i18next';

type Center = [number, number];
const Map = ({
  points,
  isUserLoggedIn,
  setIsUserLoggedIn,
  loggedUserUsername,
  initialLoggedUserEmail,
  setLoggedUserUsername,
  pointDeleted,
  setPointDeleted,
  acceptedCookies,
}) => {
  const [center] = useState<Center>([40.155, 22.404]);
  const [pointsArray, setPointsArray] = useState(points);
  const [indexOfClickedMarker, setIndexOfClickedMarker] = useState<number>(
    Number(localStorage.getItem('lastClickedMarker'))
  );
  const [popupOpen, setPopupOpen] = useState(false);
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const [loggedUserEmail, setLoggedUserEmail] = useState(
    initialLoggedUserEmail
  );
  const { t } = useTranslation();

  useEffect(() => {
    setLoggedUserEmail(initialLoggedUserEmail);
  }, [initialLoggedUserEmail]);

  useEffect(() => {
    setClickedMarkerFunc(
      indexOfClickedMarker,
      pointsArray,
      setPointsArray,
      setIndexOfClickedMarker,
      points
    );
  }, [points]);
  useEffect(() => {
    if (pointDeleted) {
      setPointsArray(pointsArray.filter((point) => point._id !== pointDeleted));
    }
  }, [pointDeleted]);
  return (
    <>
      <Navbar
        setDisplayRegisterForm={setDisplayRegisterForm}
        setDisplayLoginForm={setDisplayLoginForm}
        setIsUserLoggedIn={setIsUserLoggedIn}
        isUserLoggedIn={isUserLoggedIn}
        setPopupOpen={setPopupOpen}
        loggedUserUsername={loggedUserUsername}
        setLoggedUserUsername={setLoggedUserUsername}
        setLoggedUserEmail={setLoggedUserEmail}
        acceptedCookies={acceptedCookies}
      />
      <LoginForm
        displayLoginForm={displayLoginForm}
        setDisplayLoginForm={setDisplayLoginForm}
        setLoggedUserEmail={setLoggedUserEmail}
        setPopupOpen={setPopupOpen}
        setDisplayRegisterForm={setDisplayRegisterForm}
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        setLoggedUserUsername={setLoggedUserUsername}
      />
      <RegisterForm
        displayRegisterForm={displayRegisterForm}
        setDisplayRegisterForm={setDisplayRegisterForm}
        setLoggedUserEmail={setLoggedUserEmail}
        setDisplayLoginForm={setDisplayLoginForm}
        isUserLoggedIn={isUserLoggedIn}
        setIsUserLoggedIn={setIsUserLoggedIn}
        setLoggedUserUsername={setLoggedUserUsername}
      />
      <MapContainer
        className="mapStyle"
        center={center}
        zoom={5}
        scrollWheelZoom={true}
      >
        <ClickedMarkerSetter
          indexOfClickedMarker={indexOfClickedMarker}
          pointsArray={pointsArray}
        />
        <AddNewMarker
          pointsArray={pointsArray}
          setIndexOfClickedMarker={setIndexOfClickedMarker}
          setPointsArray={setPointsArray}
          popupOpen={popupOpen}
          setPopupOpen={setPopupOpen}
          loggedUserEmail={loggedUserEmail}
          setLoggedUserEmail={setLoggedUserEmail}
          setDisplayLoginForm={setDisplayLoginForm}
          isUserLoggedIn={isUserLoggedIn}
          loggedUserUsername={loggedUserUsername}
          acceptedCookies={acceptedCookies}
        />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {pointsArray.map((point, i) => (
          <div className="" key={i}>
            <Marker
              position={[point?.lat, point?.long]}
              icon={markerIconSetFunction(point, loggedUserUsername)}
              eventHandlers={{
                click: () => {
                  setClickedMarkerFunc(
                    i,
                    pointsArray,
                    setPointsArray,
                    setIndexOfClickedMarker,
                    points
                  );
                  localStorage.setItem('lastClickedMarker', String(i));
                  setPopupOpen(false);
                },
              }}
            >
              <Popup>
                <div className="card">
                  <label htmlFor="">{capitalizeFirstLetter(t('place'))}</label>
                  <h4 className="place">{point?.title}</h4>
                  <label htmlFor="">{capitalizeFirstLetter(t('rewiew'))}</label>
                  <p className="desc">{point?.desc}!</p>
                  <label>{capitalizeFirstLetter(t('rating'))}</label>
                  <div className="stars">
                    <Star numberOfStars={point?.rating} />
                  </div>
                  <label htmlFor="">{capitalizeFirstLetter(t('information'))}</label>
                  <span className="username">{t('user')}: {point?.username}</span>
                  <span className="date">
                    {getTimePassedSinceCreation(new Date(point.createdAt))}
                  </span>
                  {acceptedCookies && isUserLoggedIn && (
                    <button
                      onClick={(e) => {
                        deletePoint(e, point._id, setPointDeleted,t);
                      }}
                      className="btnDelete"
                    >
                      {capitalizeFirstLetter(t('delete'))}
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          </div>
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
