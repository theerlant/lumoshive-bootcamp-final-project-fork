import { useSyncExternalStore } from "react";

export const useMediaQuery = (width = 1024) => {
  const query = `(max-width: ${width}px)`;

  const subscribe = (callback) => {
    const matchMedia = window.matchMedia(query);
    matchMedia.addEventListener("change", callback);
    return () => matchMedia.removeEventListener("change", callback);
  };

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
