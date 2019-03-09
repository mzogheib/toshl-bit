import document from "document";

const spinner = document.getElementById("loading__spinner");
spinner.state = "enabled";

export default {
  name: "loading",
};
