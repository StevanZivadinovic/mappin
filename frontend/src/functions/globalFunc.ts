import { changeLanguage } from "i18next";
import { setLanguageOnBackend } from "./languageFunc.ts";

export function getTimePassedSinceCreation(creationTime) {
  const currentTime = new Date();

  const timeDifference = currentTime.getTime() - creationTime.getTime();
  const secondsPassed = Math.floor(timeDifference / 1000);

  if (secondsPassed < 10) {
    return " just now";
  } else if (secondsPassed < 60) {
    return secondsPassed + " seconds ago";
  } else if (secondsPassed < 3600) {
    const minutesPassed = Math.floor(secondsPassed / 60);
    return (
      minutesPassed + (minutesPassed === 1 ? " minute ago" : " minutes ago")
    );
  } else if (secondsPassed < 86400) {
    const hoursPassed = Math.floor(secondsPassed / 3600);
    return hoursPassed + (hoursPassed === 1 ? " hour ago" : " hours ago");
  } else {
    const daysPassed = Math.floor(secondsPassed / 86400);
    return daysPassed + (daysPassed === 1 ? " day ago" : " days ago");
  }
}

export function setCookie(
  cname: string,
  cvalue: string | number,
  exdays: number
) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeAllLetters = (str: string): string => {
  if (!str) return str;
  return str.toUpperCase();
};

export const capitalizeEveryFirstLetter = (str: string): string => {
  if (!str) return str;
  const words = str.split(/\s+/);
  const capitalizedWords = words.map((word) => capitalizeFirstLetter(word));
  return capitalizedWords.join(" ");
};

export const handleLanguage = (language:string)=>{
  changeLanguage(language)
  localStorage.setItem('i18nextLng',language)
  setLanguageOnBackend(language)
}
