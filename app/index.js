import document from "document";
import * as messaging from "messaging";

messaging.peerSocket.onopen = function() {
  console.log("App ready to send messages.");
};

messaging.peerSocket.onerror = function(err) {
  console.log("Connection error: " + err.code + " - " + err.message);
};

function sendMessage(data) {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
}

let list = document.getElementById("my-list");
let items = list.getElementsByClassName("tile-list-item");

items.forEach((element, index) => {
  let touch = element.getElementById("touch-me");
  touch.onclick = evt => {
    sendMessage(index);
  };
});
