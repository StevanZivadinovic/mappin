import React from "react";
import {
  handleInputChange,
  handleSubmit,
} from "../../functions/markerFunctions.ts";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "../../functions/globalFunc.ts";
const NewMarkerPopup = ({
  newMarkerDataRef,
  pointsArray,
  setIndexOfClickedMarker,
  setPointsArray,
  setPopupOpen,
  titleRef,
  descriptionRef,
  ratingRef,
  loggedUserEmail,
  setLoggedUserEmail,
  loggedUserUsername,
}) => {
  const {t}=useTranslation()
  return (
    <form
      onSubmit={(e) =>
        handleSubmit(
          e,
          newMarkerDataRef,
          pointsArray,
          setIndexOfClickedMarker,
          setPointsArray,
          setPopupOpen,
          loggedUserEmail,
          setLoggedUserEmail,
          loggedUserUsername,
        )
      }
      key="form"
      className="newMarkerForm"
    >
      <label htmlFor="title">{capitalizeFirstLetter(t('title'))}:</label>
      <input
        ref={titleRef}
        placeholder={capitalizeFirstLetter(t('add_title'))}
        type="text"
        id="title"
        defaultValue={newMarkerDataRef.current.title}
        onChange={(e) => {
          handleInputChange(e, titleRef, newMarkerDataRef, 'title');
        }}
      />
      <label htmlFor="desc">{capitalizeFirstLetter(t('description'))}:</label>
      <textarea
        ref={descriptionRef}
        placeholder={capitalizeFirstLetter(t('add_description'))}
        id="desc"
        defaultValue={newMarkerDataRef.current.desc}
        onChange={(e) => {
          handleInputChange(e, descriptionRef, newMarkerDataRef,'desc');
        }}
      />
      <label htmlFor="rating">{capitalizeFirstLetter(t('rating'))}:</label>
      <input
        ref={ratingRef}
        type="number"
        id="rating"
        max={5}
        defaultValue={newMarkerDataRef.current.rating.toString()} 
        onChange={(e) => {
          handleInputChange(e, ratingRef, newMarkerDataRef,'rating');
        }}
      />
      <button type="submit">{capitalizeFirstLetter(t('submit_point'))}</button>
    </form>
  );
};

export default NewMarkerPopup;
