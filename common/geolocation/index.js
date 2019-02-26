import { geolocation } from "geolocation";

const getCurrentPosition = () =>
  new Promise((resolve, reject) =>
    geolocation.getCurrentPosition(resolve, reject)
  );

export default {
  getCurrentPosition,
};
