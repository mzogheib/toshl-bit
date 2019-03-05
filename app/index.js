import { vibration } from "haptics";
import Messenger from "../common/messenger";
import screens from "./screens";

console.log("App ready.");
screens.show("loading");

const onCompanionReady = () => screens.show("expenses");
const onEntryCreateSuccess = () => {
  screens.show("expenses");
  vibration.start("confirmation-max");
};
const onEntryCreateError = () => {
  screens.show("expenses");
  vibration.start("nudge-max");
};

const messageMap = {
  [Messenger.COMPANION_READY]: onCompanionReady,
  [Messenger.ENTRY_CREATE_SUCCESS]: onEntryCreateSuccess,
  [Messenger.ENTRY_CREATE_ERROR]: onEntryCreateError,
};

const handleMessage = ({ key, data }) => {
  const func = messageMap[key];
  if (func) {
    func(data);
  } else {
    console.error("Unknown message received.");
  }
};
Messenger.onMessage(handleMessage);

const createExpense = data => {
  screens.show("loading");
  Messenger.send({ key: Messenger.ENTRY_CREATE, data });
};
// TODO: could this be separated further? i.e. treat `screens` like a router so it shouldn't
// know about onTouch
screens.expenses.onTouch(createExpense);
