import React, {useRef, useState } from "react";
import { Popup, useMap, useMapEvent } from "react-leaflet";
import NewMarkerPopup from "./NewMarkerPopup.tsx";
import { capitalizeFirstLetter } from "../../functions/globalFunc.ts";
import { useTranslation } from "react-i18next";

const AddNewMarker = ({
  pointsArray,
  setIndexOfClickedMarker,
  setPointsArray,
  popupOpen,
  setPopupOpen,
  loggedUserEmail,
  setLoggedUserEmail,
  setDisplayLoginForm,
  isUserLoggedIn,
  loggedUserUsername,
  acceptedCookies
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const ratingRef = useRef<HTMLInputElement>(null);
  const [closed, setClosed]=useState(true)
  const {t}=useTranslation()
  const newMarkerDataRef = useRef<{
    lat: number | null;
    long: number | null;
    title: string;
    desc: string;
    rating: number;
  }>({
    lat: null,
    long: null,
    title: "",
    desc: "",
    rating: 5, 
  });
const map = useMap()
useMapEvent("click", (e) => {
  if(acceptedCookies){
    if(isUserLoggedIn){
      const { lat, lng } = e.latlng;
      newMarkerDataRef.current = {
        ...newMarkerDataRef.current,
        lat,
        long: lng,
      };
      if(closed){
        setPopupOpen(true);
        setClosed(false);
      }
    }else{
     alert(capitalizeFirstLetter(t('please_log_in_or_register_msg')))
     setDisplayLoginForm(true);
    }
  }
   
    
  
  });

  useMapEvent("popupclose", () => {
    setClosed(true);
  });
  return popupOpen ? (
    <Popup
      position={[newMarkerDataRef?.current?.lat, newMarkerDataRef?.current?.long]}
    >
      <NewMarkerPopup
        newMarkerDataRef={newMarkerDataRef}
        pointsArray={pointsArray}
        setIndexOfClickedMarker={setIndexOfClickedMarker}
        setPointsArray={setPointsArray}
        setPopupOpen={setPopupOpen}
        titleRef={titleRef}
        descriptionRef={descriptionRef}
        ratingRef={ratingRef}
        loggedUserEmail={loggedUserEmail}
        setLoggedUserEmail={setLoggedUserEmail}
        loggedUserUsername={loggedUserUsername}
      />
    </Popup>
  ) : null
};

export default React.memo(AddNewMarker);
