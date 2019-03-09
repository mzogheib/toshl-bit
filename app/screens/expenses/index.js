import document from "document";
import expenses from "./data";

const screen = document.getElementById("expenses");
const list = screen.getElementById("expenses__list");
const items = list.getElementsByClassName("expenses__item");
let handleTouch = data => console.log(data);
const onTouch = callback => (handleTouch = callback);

items.forEach((item, index) => {
  const expense = expenses[index];
  item.getElementById("expenses__item-text-upper").text = expense.textUpper;
  item.getElementById("expenses__item-text-lower").text = expense.textLower;
  item.getElementById("expenses__item-touch").onclick = () =>
    handleTouch(expense.data);
});

export default {
  name: "expenses",
  onTouch,
};
