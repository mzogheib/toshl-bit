import document from "document";
import { vibration } from "haptics";
import Messenger from "../common/messenger";
import expenses from "./expenses";

console.log("App ready.");
const splashScreen = document.getElementById("splash");
const expensesScreen = document.getElementById("expenses");
splashScreen.style.display = "inline";
expensesScreen.style.display = "none";

const messageMap = {
  [Messenger.COMPANION_READY]: () => {
    splashScreen.style.display = "none";
    expensesScreen.style.display = "inline";
  },
  [Messenger.ENTRY_CREATE_SUCCESS]: () => vibration.start("confirmation-max"),
  [Messenger.ENTRY_CREATE_ERROR]: () => vibration.start("nudge-max"),
};

const list = document.getElementById("my-list");
const items = list.getElementsByClassName("tile-list-item");

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
  item.getElementById("text-upper").text = expense.textUpper;
  item.getElementById("text-lower").text = expense.textLower;

  const touch = item.getElementById("touch-me");
  touch.onclick = () =>
    Messenger.send({ key: Messenger.ENTRY_CREATE, data: expense.data });
});
