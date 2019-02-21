import * as messaging from "messaging";

messaging.peerSocket.onopen = function() {
  console.log("Companion ready to receive messages.");
};

messaging.peerSocket.onmessage = function(evt) {
  console.log(JSON.stringify(evt.data));
};
