import * as messaging from "messaging";

messaging.peerSocket.onopen = () => console.log("Ready to send messages.");
messaging.peerSocket.onerror = err =>
  console.log("Connection error: " + err.code + " - " + err.message);

const onMessage = callback =>
  (messaging.peerSocket.onmessage = ({ data }) => callback(data));

const send = data => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
};

export default {
  send,
  onMessage,
};
