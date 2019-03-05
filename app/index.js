import document from "document";
import { vibration } from "haptics";
import Messenger from "../common/messenger";
import expenses from "./expenses";

console.log("App ready.");

const screens = [
  { name: "loading", element: document.getElementById("loading") },
  { name: "expenses", element: document.getElementById("expenses") },
];

const showScreen = (screenName, screens) =>
  screens.forEach(({ name, element }) => {
    const newDisplay = name === screenName ? "inline" : "none";
    element.style.display = newDisplay;
  });

showScreen("loading", screens);

const onCompanionReady = () => showScreen("expenses", screens);
const onEntryCreateSuccess = () => {
  showScreen("expenses", screens);
  vibration.start("confirmation-max");
};
const onEntryCreateError = () => {
  showScreen("expenses", screens);
  vibration.start("nudge-max");
};

const messageMap = {
  [Messenger.COMPANION_READY]: onCompanionReady,
  [Messenger.ENTRY_CREATE_SUCCESS]: onEntryCreateSuccess,
  [Messenger.ENTRY_CREATE_ERROR]: onEntryCreateError,
};

const list = document.getElementById("my-list");
const items = list.getElementsByClassName("list-item");

const handleMessage = ({ key, data }) => {
  const func = messageMap[key];
  if (func) {
    func(data);
  } else {
    console.error("Unknown message received.");
  }
};
Messenger.onMessage(handleMessage);

items.forEach((item, index) => {
  const expense = expenses[index];
  item.getElementById("list-item__text-upper").text = expense.textUpper;
  item.getElementById("list-item__text-lower").text = expense.textLower;

  const touch = item.getElementById("list-item__touch");
  touch.onclick = () => {
    showScreen("loading", screens);
    Messenger.send({ key: Messenger.ENTRY_CREATE, data: expense.data });
  };
});
