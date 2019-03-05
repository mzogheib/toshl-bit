import { vibration } from "haptics";
import Messenger from "../common/messenger";
import loadingScreen from "./screens/loading";
import expensesScreen from "./screens/expenses";

console.log("App ready.");
expensesScreen.hide();
loadingScreen.show();

const onCompanionReady = () => {
  loadingScreen.hide();
  expensesScreen.show();
};
const onEntryCreateSuccess = () => {
  loadingScreen.hide();
  expensesScreen.show();
  vibration.start("confirmation-max");
};
const onEntryCreateError = () => {
  loadingScreen.hide();
  expensesScreen.show();
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
  expensesScreen.hide();
  loadingScreen.show();
  Messenger.send({ key: Messenger.ENTRY_CREATE, data });
};
expensesScreen.onTouch(createExpense);
