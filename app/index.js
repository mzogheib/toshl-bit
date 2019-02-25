import document from "document";
import { vibration } from "haptics";
import Messenger from "../common/messenger";

console.log("App ready.");

const VIBRATION_MAP = {
  SUCCESS: "confirmation-max",
  ERROR: "nudge-max",
};

const expenses = [
  {
    amount: -4,
    desc: "Soy latte",
    category: "48218584",
    tags: ["17310155"],
  },
  {
    amount: -15,
    desc: "Dinner",
    category: "48218584",
    tags: ["17310156"],
  },
  {
    amount: -8,
    desc: "Lunch",
    category: "48218584",
    tags: ["17310148"],
  },
  {
    amount: -8,
    desc: "Alcohol",
    category: "48218584",
    tags: ["17310157"],
  },
  {
    amount: -10,
    desc: "Groceries",
    category: "50841185",
    tags: ["17310147"],
  },
];

const list = document.getElementById("my-list");
const items = list.getElementsByClassName("tile-list-item");

const handleMessage = data => vibration.start(VIBRATION_MAP[data.status]);
Messenger.setOnMessage(handleMessage);

items.forEach((element, index) => {
  let touch = element.getElementById("touch-me");
  const expense = expenses[index];
  touch.onclick = () => Messenger.send(expense);
});
