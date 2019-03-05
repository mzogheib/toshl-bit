import document from "document";
import loading from "./loading";
import expenses from "./expenses";

const screens = [
  { name: loading.name, element: document.getElementById(loading.name) },
  { name: expenses.name, element: document.getElementById(expenses.name) },
];
const show = screenName =>
  screens.forEach(({ name, element }) => {
    const newDisplay = name === screenName ? "inline" : "none";
    element.style.display = newDisplay;
  });

export default {
  show,
  loading,
  expenses,
};
