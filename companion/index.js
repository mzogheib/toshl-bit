import { geolocation } from "geolocation";
import Toshl from "./toshl";
import Messenger from "../common/messenger";
import Utils from "../common/utils";

console.log("Companion ready.");
const handleMessengerOpen = () =>
  Messenger.send({ key: Messenger.COMPANION_READY });
const entrySuccess = () =>
  Messenger.send({ key: Messenger.ENTRY_CREATE_SUCCESS });
const entryError = () => Messenger.send({ key: Messenger.ENTRY_CREATE_ERROR });

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

// Handle location errors better. Should still continue even without location.
const getLocationAndCreateEntry = data =>
  geolocation.getCurrentPosition(
    ({ coords }) => {
      Toshl.entries
        .create(makeEntry({ coords, data }))
        .then(entrySuccess)
        .catch(entryError);
    },
    error => console.error(error)
  );

const messageMap = {
  [Messenger.ENTRY_CREATE]: getLocationAndCreateEntry,
};

const handleMessage = ({ key, data }) => {
  const func = messageMap[key];
  console.log(key, data);
  if (func) {
    func(data);
  } else {
    console.error("Unknown message received.");
  }
};

Messenger.onOpen(handleMessengerOpen);
Messenger.onMessage(handleMessage);
