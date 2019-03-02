import * as messaging from "messaging";

messaging.peerSocket.onerror = err =>
  console.log("Connection error: " + err.code + " - " + err.message);

const onOpen = callback => (messaging.peerSocket.onopen = callback);

const onMessage = callback =>
  (messaging.peerSocket.onmessage = ({ data }) => callback(data));

const send = data => {
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    messaging.peerSocket.send(data);
  }
};

const vocab = [
  "APP_READY",
  "COMPANION_READY",
  "ENTRY_CREATE",
  "ENTRY_CREATE_SUCCESS",
  "ENTRY_CREATE_ERROR",
].reduce((obj, val) => ({ [val]: val, ...obj }), {});

export default {
  send,
  onOpen,
  onMessage,
  ...vocab,
};
