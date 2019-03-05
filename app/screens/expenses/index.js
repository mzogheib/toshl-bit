import document from "document";
import expenses from "./data";

const screen = document.getElementById("expenses");
const show = () => (screen.style.display = "inline");
const hide = () => (screen.style.display = "none");

const list = screen.getElementById("my-list");
const items = list.getElementsByClassName("list-item");
let handleTouch = data => console.log(data);
const onTouch = callback => {
  handleTouch = callback;
};

items.forEach((item, index) => {
  const expense = expenses[index];
  item.getElementById("list-item__text-upper").text = expense.textUpper;
  item.getElementById("list-item__text-lower").text = expense.textLower;

  const touch = item.getElementById("list-item__touch");
  touch.onclick = () => handleTouch(expense.data);
});

export default {
  show,
  hide,
  onTouch,
};
