import * as messaging from "messaging";
import { geolocation } from "geolocation";
import Toshl from "./toshl";

console.log("Companion ready.");

// Source: http://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset
const getTime = () => {
  var tzoffset = new Date().getTimezoneOffset() * 60000;
  var localISOTime = new Date(Date.now() - tzoffset).toISOString().slice(0, -1);
  var date = localISOTime.substring(0, 10);
  var time = localISOTime.substring(11, 19);
  return { date, time };
};

const makeEntry = ({ coords, data }) => {
  const { latitude, longitude } = coords;
  const { date, time } = getTime();
  const desc = `${time}\n\n${data.desc}`;
  const entry = {
    ...data,
    location: { latitude, longitude },
    date,
    desc,
    account: "2596649",
    currency: { code: "AUD" },
  };
  return { entry };
};

const sendEntry = ({ entry }) => Toshl.entries.create(entry);

const entrySuccess = () => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({ status: "SUCCESS" });
  }
};

const entryError = () => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send({ status: "ERROR" });
  }
};

messaging.peerSocket.onopen = () => {
  console.log("Companion ready to receive messages.");
};

// Handle location errors better. Should still continue even without location.
messaging.peerSocket.onmessage = function({ data }) {
  geolocation.getCurrentPosition(
    ({ coords }) => {
      sendEntry(makeEntry({ coords, data }))
        .then(entrySuccess)
        .catch(entryError);
    },
    error => {
      console.error(error);
    }
  );
};
