import document from "document";
import expenses from "./data";

const screen = document.getElementById("expenses");
const list = screen.getElementById("expenses__list");
const items = list.getElementsByClassName("expenses__item");
let handleTouch = data => console.log(data);
const onTouch = callback => (handleTouch = callback);

items.forEach((item, index) => {
  const expense = expenses[index];
  const background = item.getElementById("expenses__item-background");
  const touch = item.getElementById("expenses__item-touch");
  item.getElementById("expenses__item-text-upper").text = expense.textUpper;
  item.getElementById("expenses__item-text-lower").text = expense.textLower;
  touch.onclick = () => {
    background.style.fill = "fb-slate-press";
    setTimeout(() => {
      handleTouch(expense.data);
      background.style.fill = "fb-black";
    }, 125);
  };
});

export default {
  name: "expenses",
  onTouch,
};
