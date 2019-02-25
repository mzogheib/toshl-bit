import { geolocation } from "geolocation";
import Toshl from "./toshl";
import Messenger from "../common/messenger";

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
  return entry;
};

const entrySuccess = () => Messenger.send({ status: "SUCCESS" });
const entryError = () => Messenger.send({ status: "ERROR" });

const onMessage = data => handleMessage(data);
Messenger.setOnMessage(onMessage);

// Handle location errors better. Should still continue even without location.
const handleMessage = data => {
  geolocation.getCurrentPosition(
    ({ coords }) => {
      Toshl.entries
        .create(makeEntry({ coords, data }))
        .then(entrySuccess)
        .catch(entryError);
    },
    error => {
      console.error(error);
    }
  );
};
