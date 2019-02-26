import Geolocation from "../common/geolocation";
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

// If location cannot be found, resolve an empty object so that an entry
// can be created regardless
const attemptLocation = () =>
  new Promise(resolve =>
    Geolocation.getCurrentPosition()
      .then(resolve)
      .catch(() => resolve({ coords: {} }))
  );

const getLocationAndCreateEntry = data =>
  attemptLocation()
    .then(({ coords }) => ({ coords, data }))
    .then(makeEntry)
    .then(Toshl.entries.create)
    .then(entrySuccess)
    .catch(entryError);

const messageMap = {
  [Messenger.ENTRY_CREATE]: getLocationAndCreateEntry,
};

const handleMessage = ({ key, data }) => {
  const func = messageMap[key];
  if (func) {
    func(data);
  } else {
    console.error("Unknown message received.");
  }
};

Messenger.onOpen(handleMessengerOpen);
Messenger.onMessage(handleMessage);
