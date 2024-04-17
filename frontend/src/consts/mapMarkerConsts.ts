import L from "leaflet";
export const defaultIcon = new L.Icon({
    iconUrl: "/img/point_black.png",
    iconSize: [35, 35],
    iconAnchor: [15, 35],
    popupAnchor: [0, -35],
  });

  export const clickedIcon = new L.Icon({
    iconUrl: "/img/point_orange.png",
    iconSize: [35, 35],
    iconAnchor: [15, 35],
    popupAnchor: [0, -35],
  });

  export const loggedInUserPoints = new L.Icon({
    iconUrl: "/img/point_purple.png",
    iconSize: [35, 35],
    iconAnchor: [15, 35],
    popupAnchor: [0, -35],
  });

