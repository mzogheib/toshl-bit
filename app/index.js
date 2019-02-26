import document from "document";
import { vibration } from "haptics";
import Messenger from "../common/messenger";
import expenses from "./expenses";

console.log("App ready.");

const messageMap = {
  [Messenger.COMPANION_READY]: () =>
    console.log("App is free to send messages to Companion"),
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

items.forEach((element, index) => {
  let touch = element.getElementById("touch-me");
  const expense = expenses[index];
  touch.onclick = () =>
    Messenger.send({ key: Messenger.ENTRY_CREATE, data: expense });
});
