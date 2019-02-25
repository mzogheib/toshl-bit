import { geolocation } from "geolocation";
import Toshl from "./toshl";
import Messenger from "../common/messenger";
import Utils from "../common/utils";

console.log("Companion ready.");

const makeEntry = ({ coords, data }) => {
  const { latitude, longitude } = coords;
  const { date, time } = Utils.getTime();
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

Messenger.onMessage(handleMessage);

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
