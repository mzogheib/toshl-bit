import document from "document";

const screen = document.getElementById("expenses");

const show = () => (screen.style.display = "inline");
const hide = () => (screen.style.display = "none");

export default {
  show,
  hide,
};
