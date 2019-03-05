import document from "document";

const screen = document.getElementById("loading");

const show = () => (screen.style.display = "inline");
const hide = () => (screen.style.display = "none");

export default {
  show,
  hide,
};
