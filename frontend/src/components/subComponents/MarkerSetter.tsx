import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const ClickedMarkerSetter = ({indexOfClickedMarker, pointsArray}) => {
    const map = useMap();
    useEffect(() => {
      if (typeof indexOfClickedMarker === 'number' && pointsArray[indexOfClickedMarker]) {
        const { lat, long } = pointsArray[indexOfClickedMarker];
        map.setView([lat, long]);
      }
    }, [indexOfClickedMarker, map, pointsArray]);
  
    return null;
  };